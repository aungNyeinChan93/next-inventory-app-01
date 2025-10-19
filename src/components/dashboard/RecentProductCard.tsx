import { Product } from "@/generated/prisma";
import React from "react";
import { CircleDot } from "lucide-react";

const RecentProductsCard = ({ products }: { products: Product[] }) => {
  return (
    <React.Fragment>
      <div className="bg-white col-span-2 p-6 rounded-xl shadow-sm w-full min-h-[200px]">
        <h4 className="text-gray-600 font-medium">Recent Products</h4>
        <ul className="text-3xl font-bold text-green-600 mt-2">
          {products &&
            products
              ?.reverse()
              .slice(0, 6)
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
      </div>
    </React.Fragment>
  );
};

export default RecentProductsCard;
