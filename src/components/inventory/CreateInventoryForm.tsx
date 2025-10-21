"use client";

import React, { useActionState } from "react";
import {
  BadgeDollarSign,
  ShoppingBasket,
  Diff,
  TrendingDown,
  Boxes,
} from "lucide-react";
import { createProductsAction } from "@/features/products/products-action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CreateInventoryForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    createProductsAction,
    undefined
  );

  if (state?.success) {
    router.refresh();
    toast.success(`${state?.message}`, {
      duration: 3000,
      position: "top-right",
    });
    router.push("/dashboard/inventory");
  }
  return (
    <React.Fragment>
      <form className="px-6 py-10  max-w-4xl mx-auto" action={formAction}>
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="relative flex items-center">
            <label
              className={` ${
                state?.errors?.name && "!text-red-600"
              } text-[14px] bg-white text-slate-900 font-medium absolute px-2 top-[-10px] left-[18px]`}
            >
              {(!state?.success && state?.errors?.name) || "Products Name *"}
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              className="px-4 py-3.5 pr-8 bg-white text-slate-900 font-medium w-full text-sm border-2 border-gray-200 focus:border-blue-500 rounded-sm outline-none"
              name="name"
            />
            <ShoppingBasket className=" w-[22px] h-[22px] absolute right-4" />
          </div>

          <div className="relative flex items-center">
            <label className="text-[14px] bg-white text-slate-900 font-medium absolute px-2 top-[-10px] left-[18px]">
              {(!state?.success && state?.errors?.price) || "Price *"}
            </label>
            <input
              type="number"
              placeholder="Enter Price"
              className="px-4 py-3.5 pr-8 bg-white text-slate-900 font-medium w-full text-sm border-2 border-gray-200 focus:border-blue-500 rounded-sm outline-none"
              name="price"
              step={0.01}
            />
            <BadgeDollarSign className="w-[22px] h-[22px] absolute right-4" />
          </div>

          <div className="relative flex items-center">
            <label className="text-[14px] bg-white text-slate-900 font-medium absolute px-2 top-[-10px] left-[18px]">
              {(!state?.success && state?.errors?.quantity) || "Quality *"}
            </label>
            <input
              type="number"
              placeholder="Enter Quantity"
              className="px-4 py-3.5 pr-8 bg-white text-slate-900 font-medium w-full text-sm border-2 border-gray-200 focus:border-blue-500 rounded-sm outline-none"
              name="quantity"
            />
            <Diff className="w-[22px] h-[22px] absolute right-4" />
          </div>

          <div className="relative flex items-center">
            <label className="text-[14px] bg-white text-slate-900 font-medium absolute px-2 top-[-10px] left-[18px]">
              SKU (optional)
            </label>
            <input
              type="text"
              placeholder="Enter SKU "
              className="px-4 py-3.5 pr-8 bg-white text-slate-900 font-medium w-full text-sm border-2 border-gray-200 focus:border-blue-500 rounded-sm outline-none"
              name="sku"
            />
            <Boxes className="w-[22px] h-[22px] absolute right-4" />
          </div>

          <div className="relative flex items-center sm:col-span-2">
            <label className="text-[14px] bg-white text-slate-900 font-medium absolute px-2 top-[-10px] left-[18px]">
              Low Stock At (optional)
            </label>
            <input
              type="number"
              placeholder="Set Low Stock (optional) "
              className="px-4 py-3.5 pr-8 bg-white text-slate-900 font-medium w-full text-sm border-2 border-gray-200 focus:border-blue-500 rounded-sm outline-none"
              name="lowStockAt"
            />
            <TrendingDown className="w-[22px] h-[22px] absolute right-4" />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className=" basis-2/3 mt-10 px-6 py-3.5 w-full text-sm font-medium bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-all cursor-pointer"
          >
            ➕ Create
          </button>
          <button
            onClick={() => router.push("/dashboard/inventory")}
            className=" basis-1/3 mt-10 px-6 py-3.5 w-full text-sm font-medium bg-gray-600 text-white rounded-sm hover:bg-gray-700 transition-all cursor-pointer"
          >
            ❌ Cancle
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default CreateInventoryForm;
