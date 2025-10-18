import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma-client";
import React from "react";

export type Product = Prisma.ProductGetPayload<{}>;

export async function getAllProducts() {
  const products: Product[] = await prisma.product.findMany({
    orderBy: { created_at: "desc" },
  });
  return products;
}

const TestProductsPage = async () => {
  const products = await getAllProducts();
  return (
    <React.Fragment>
      <main className="w-full min-h-screen max-w-4xl text-black px-10 my-3 mx-auto bg-slate-300">
        {/*  <pre>{products && JSON.stringify(products, null, 2)}</pre> */}
        <div className="grid grid-cols-2 gap-3">
          {products &&
            Array.isArray(products) &&
            products?.map((product) => (
              <ProductCard key={product?.id} {...product} />
            ))}
        </div>
      </main>
    </React.Fragment>
  );
};

export default TestProductsPage;

export async function ProductCard({
  name,
  price,
}: {
  name: string;
  price: any;
}) {
  return (
    <>
      <div className="bg-white shadow-sm border border-gray-200 p-2 w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
        <div className="aspect-[3/2]">
          <img
            src="https://readymadeui.com/cardImg.webp"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-xl font-bold">
            {name} - {price}
          </h3>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor
            auctor arcu, at fermentum dui. Maecenas
          </p>
          <button
            type="button"
            className="mt-6 px-4 py-2.5 w-full rounded-lg text-white text-sm tracking-wider font-medium border-none outline-none bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            View
          </button>
        </div>
      </div>
    </>
  );
}
