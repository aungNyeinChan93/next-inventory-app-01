"use client";

import { Product } from "@/generated/prisma";
import React, { ReactNode, use } from "react";
import InventoryTable from "./InventoryTable";

interface Props {
  productsPromise: Promise<Product[]>;
}

const InventoryList = ({ productsPromise }: Props) => {
  const products = use(productsPromise);
  return (
    <React.Fragment>
      <main className="w-full min-h-screen max-w-8xl mx-auto ">
        <InventoryTable products={products} />
      </main>
    </React.Fragment>
  );
};

export default InventoryList;
