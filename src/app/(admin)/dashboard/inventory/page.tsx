import React, { Suspense } from "react";
import Header from "../components/Header";
import {
  getAllInventory,
  totalInventoryCount,
} from "@/features/inventory/inventory-actions";
import InventoryList from "@/components/inventory/InventoryLists";

interface Props {
  searchParams: Promise<{ [key: string]: string }>;
}

const InventoryPage = async ({ searchParams }: Props) => {
  const search = await searchParams;
  const q = (search.q || "").trim();
  const page = Math.max(1, Number(search.page)) || 1;
  const limit = 10;

  const productsPromise = getAllInventory({ q, limit, page });
  const totalCount = await totalInventoryCount();
  return (
    <React.Fragment>
      <main className="p-6 w-full min-h-screen ">
        <div className="flex flex-col gap-3">
          <Header name={"inventory"} />
          <Suspense fallback={"Loading ..."}>
            <InventoryList
              productsPromise={productsPromise}
              totalCount={totalCount}
              currentPage={page}
              limit={limit}
            />
          </Suspense>
        </div>
      </main>
    </React.Fragment>
  );
};

export default InventoryPage;
