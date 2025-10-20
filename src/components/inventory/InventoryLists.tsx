"use client";

import { Product } from "@/generated/prisma";
import React, { use } from "react";
import InventoryTable from "./InventoryTable";
import InventorySearchBar from "./InventorySearchBar";
import { useSearchParams } from "next/navigation";

interface Props {
  productsPromise: Promise<Product[]>;
}

const InventoryList = ({ productsPromise }: Props) => {
  const products = use(productsPromise);
  const searchParams = useSearchParams();

  return (
    <React.Fragment>
      <main className="w-full min-h-screen max-w-8xl mx-auto ">
        <InventorySearchBar q={searchParams.get("q") as string} />
        <InventoryTable products={products} />
      </main>
    </React.Fragment>
  );
};

export default InventoryList;
