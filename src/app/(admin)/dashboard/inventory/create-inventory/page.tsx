import CreateInventoryForm from "@/components/inventory/CreateInventoryForm";
import React from "react";
import Header from "../../components/Header";

const InventoryCreatePage = async () => {
  return (
    <React.Fragment>
      <main className="flex flex-col gap-4">
        <Header name="Create Product" />
        <div className="w-full h-[700px] flex justify-center items-center p-4 ">
          <div className="w-full max-w-3xl p-8 rounded-lg bg-white shadow">
            <CreateInventoryForm />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};

export default InventoryCreatePage;
