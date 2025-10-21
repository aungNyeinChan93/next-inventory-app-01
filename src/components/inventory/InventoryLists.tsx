"use client";

import { Product } from "@/generated/prisma";
import React, { use } from "react";
import InventoryTable from "./InventoryTable";
import InventorySearchBar from "./InventorySearchBar";
import { useSearchParams } from "next/navigation";
import Inventorypagination from "./InventoryPagination";

interface Props {
  productsPromise: Promise<Product[]>;
  totalCount: number;
  currentPage: number;
  limit: number;
}

const InventoryList = ({
  productsPromise,
  totalCount,
  currentPage,
  limit,
}: Props) => {
  const products = use(productsPromise);
  const searchParams = useSearchParams();

  const totalPage = Math.max(1, Math.ceil(totalCount / limit));

  return (
    <React.Fragment>
      <main className="w-full min-h-screen max-w-8xl mx-auto space-y-8">
        <InventorySearchBar q={searchParams.get("q") as string} />
        <InventoryTable products={products} />
        <Inventorypagination
          totalPage={totalPage}
          currentPage={currentPage}
          baseUrl="/dashboard/inventory"
          searchParams={{
            q: (searchParams.get("q") as string) || "",
          }}
        />
      </main>
    </React.Fragment>
  );
};

export default InventoryList;
