import { deleteTodo, getAllTodos } from "@/features/todos/todos-server";
import { revalidatePath } from "next/cache";
import React from "react";

const TodoPage = async () => {
  const [todo] = await getAllTodos();
  return (
    <React.Fragment>
      <main>
        <form
          action={async () => {
            "use server";
            await deleteTodo(todo?.id);
            revalidatePath("/todos");
          }}
        >
          <button type="submit">delete</button>
        </form>
        <pre>{JSON.stringify(todo, null, 2)}</pre>
      </main>
    </React.Fragment>
  );
};

export default TodoPage;
