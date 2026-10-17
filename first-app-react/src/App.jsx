import { useState } from "react";
import { PageValorant } from "./ejemplosClases/valorant/PageValorant";
import { PageTodoApp } from "./ejemplosClases/todoApp/PageTodoApp";

function App() {
  const [pestanaActiva, setPestanaActiva] = useState("valorant");
  return (
    <>
      <nav className="flex gap-2 border-b border-line px-4 py-3 sm:px-6">
        <button
          className="cursor-pointer rounded-[4px] px-4 py-2 text-sm font-semibold tracking-[0.14em] text-text-muted uppercase transition-colors hover:text-accent"
          onClick={() => setPestanaActiva("valorant")}
        >
          Valorant
        </button>
        <button
          className="cursor-pointer rounded-[4px] px-4 py-2 text-sm font-semibold tracking-[0.14em] text-text-muted uppercase transition-colors hover:text-accent"
          onClick={() => setPestanaActiva("Todo App")}
        >
          Todo App
        </button>
      </nav>
      {pestanaActiva === "valorant" && <PageValorant />}
      {pestanaActiva === "Todo App" && <PageTodoApp />}
    </>
  );
}

export { App };
