import React, { Suspense } from "react";
import Header from "../components/Header";
import { getAllInventory } from "@/features/inventory/inventory-actions";
import InventoryList from "@/components/inventory/InventoryLists";

interface Props {
  searchParams: Promise<{ [key: string]: string }>;
}

const InventoryPage = async ({ searchParams }: Props) => {
  const search = await searchParams;
  const q = (search.q || "").trim();

  const productsPromise = getAllInventory({ q, limit: 10 });
  return (
    <React.Fragment>
      <main className="p-6 w-full min-h-screen ">
        <div className="flex flex-col gap-3">
          <Header name={"inventory"} />
          <Suspense fallback={"Loading ..."}>
            <InventoryList productsPromise={productsPromise} />
          </Suspense>
        </div>
      </main>
    </React.Fragment>
  );
};

export default InventoryPage;
