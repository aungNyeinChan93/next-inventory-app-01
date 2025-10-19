import React from "react";
import Header from "./Header";
import {
  getAllProducts,
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

const Dashboard = async () => {
  const user = await getAuthUser();

  const [{ products, totalProduct }, lowStocks, totalAmount] =
    await Promise.all([
      getAllProducts(),
      lowStockProducts(),
      productTotalAmount(),
    ]);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
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
          <div className="bg-white p-6 rounded-xl shadow-sm sm:col-span-3 h-[300px]">
            <h4 className="text-gray-600 font-medium">Active Sessions</h4>
            <p className="text-3xl font-bold text-orange-600 mt-2">57</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm  min-h-[200px]">
            <h4 className="text-gray-600 font-medium">Recent Products</h4>
            <ul className="text-3xl font-bold text-green-600 mt-2">
              {products &&
                products
                  ?.reverse()
                  .slice(0, 5)
                  .map((p) => {
                    const stockLevel =
                      p.quantity === 0 ? 0 : p.quantity <= 5 ? 1 : 2;
                    return (
                      <li className="text-sm my-2 " key={p.id}>
                        <div className="flex justify-between items-center bg-amber-100/70 p-4 rounded-xl">
                          <div className="space-x-3 flex ">
                            <CircleDot
                              className={`${
                                stockLevel === 0
                                  ? "text-red-500"
                                  : stockLevel == 1
                                  ? "text-yellow-500"
                                  : "text-green-500"
                              }`}
                              size={20}
                            />
                            <p className="text-md">{p.name}</p>
                          </div>
                          <span>{p.quantity} unit</span>
                        </div>
                      </li>
                    );
                  })}
            </ul>
          </div>{" "}
          <div className="bg-white p-6 rounded-xl shadow-sm col-span-2 min-h-[400px] ">
            <h4 className="text-gray-600 font-medium capitalize">
              New Products Per Week
            </h4>
            <p className="text-3xl font-bold text-orange-600 mt-2">57</p>
          </div>
        </div>
        {/*   */}
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
