import React, { Suspense } from "react";
import Header from "../components/Header";
import { getAllInventory } from "@/features/inventory/inventory-actions";
import InventoryList from "@/components/inventory/InventoryLists";

const InventoryPage = async () => {
  const productsPromise = getAllInventory({ limit: 10, skip: 30 });
  return (
    <React.Fragment>
      <main className="p-6 w-full min-h-screen ">
        <div className="flex flex-col gap-3">
          <Header name="Inventory" />

          <Suspense fallback={"Loading ..."}>
            <InventoryList productsPromise={productsPromise} />
          </Suspense>
        </div>
      </main>
    </React.Fragment>
  );
};

export default InventoryPage;
