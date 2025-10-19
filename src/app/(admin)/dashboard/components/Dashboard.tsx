import React from "react";
import Header from "./Header";
import {
  getAllProducts,
  getWeeklyProductData,
  lowStockProducts,
  productTotalAmount,
} from "@/features/products/products-action";
import { getAuthUser } from "@/features/auth/auth";
import {
  BadgeDollarSign,
  ShoppingBasket,
  TrendingDown,
  CircleDot,
} from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ProductChart, {
  weeklyProductsData,
} from "@/components/dashboard/ProductChart";
import RecentProductsCard from "@/components/dashboard/RecentProductCard";
import StockCard from "@/components/dashboard/StockCard";

const Dashboard = async () => {
  const user = await getAuthUser();

  const [{ products, totalProduct }, lowStocks, totalAmount] =
    await Promise.all([
      getAllProducts(),
      lowStockProducts(),
      productTotalAmount(),
    ]);

  const weeklyProductsData: weeklyProductsData[] = await getWeeklyProductData(
    products
  );

  const inStockCount =
    products && products?.filter((p) => p.quantity > 5).length;
  const outStockCount = products?.filter((p) => p.quantity == 0).length;

  //
  const inStockPercentage = Number(
    ((inStockCount / totalProduct) * 100).toFixed(2)
  );
  const lowStockPercentage = Number(
    ((lowStocks / totalProduct) * 100).toFixed(2)
  );
  const outStockPercentage = Number(
    ((outStockCount / totalProduct) * 100).toFixed(2)
  );

  return (
    <div className="flex-1 flex flex-col">
      <Header name="Dashboard" />
      <main className="p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 tracking-widest flex  items-center space-x-3">
          Welcome Back 🎇
          <p className="text-base tracking-widest ms-4">
            {user?.primaryEmail?.split(".")[0].toUpperCase()}
          </p>
        </h3>

        {/* Status Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="text-gray-600 font-medium">Total Amount</h4>
            <p className="text-3xl font-bold text-blue-600 mt-2 flex justify-between items-center">
              <span>
                <BadgeDollarSign size={30} />
              </span>
              ${totalAmount.toFixed(3)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="text-gray-600 font-medium">Total Products</h4>
            <p className="text-3xl font-bold text-green-600 mt-2 flex justify-between items-center">
              <span>
                <ShoppingBasket size={30} />
              </span>
              {totalProduct}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="text-gray-600 font-medium">Low Stocks</h4>
            <p className="text-3xl font-bold text-orange-600 mt-2 flex justify-between items-center">
              <span>
                <TrendingDown size={30} />
              </span>
              {lowStocks}
            </p>
          </div>

          {/* Instock Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm sm:col-span-1 min-h-[400px]">
            <StockCard
              inStockPercentage={inStockPercentage}
              lowStockPercentage={lowStockPercentage}
              outOfStockPercentage={outStockPercentage}
            />
          </div>

          {/* recent section */}
          <RecentProductsCard products={products} />

          {/* Chart section */}
          <div className="bg-white p-6 rounded-xl shadow-sm col-span-3 min-h-[400px] ">
            <div className="flex flex-col justify-center gap-4">
              <h4 className="text-gray-600 font-medium capitalize">
                New Products Per Week
              </h4>
              <div className=" mt-10">
                <ProductChart chartData={weeklyProductsData} />
              </div>
            </div>
          </div>
        </div>

        {/* sample card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <DashboardCard title="test" icon={TrendingDown} value={22} />
          <DashboardCard
            color="text-red-600"
            title="test"
            icon={TrendingDown}
            value={22}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
