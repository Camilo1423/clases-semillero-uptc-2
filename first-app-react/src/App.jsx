import { useState } from "react";
import { PageValorant } from "./ejemplosClases/valorant/PageValorant";

function App() {
  const [pestanaActiva, setPestanaActiva] = useState("valorant");
  return (
    <>
      <nav>
        <button onClick={() => setPestanaActiva("valorant")}>Valorant</button>
        <button onClick={() => setPestanaActiva("Todo App")}>Todo App</button>
      </nav>
      {pestanaActiva === "valorant" && <PageValorant />}
    </>
  );
}

export { App };
