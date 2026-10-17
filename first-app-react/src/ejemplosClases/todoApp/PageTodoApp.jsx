import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const PageTodoApp = () => {
  const [tarea, setTarea] = useState("");
  const [listaTareas, setListaTareas] = useState([]);

  const crearTarea = () => {
    const tareaAGuardar = {
      id: uuidv4(),
      nombre: tarea,
      estaCompletada: false,
      fechaCreacion: new Date(),
    };
    setListaTareas([tareaAGuardar, ...listaTareas]);
    setTarea("");
  };

  return (
    <div className="flex flex-col items-center h-screen gap-12">
      <div className="flex flex-col items-center gap-4 w-full">
        <h1 className="text-2xl font-bold">Todo App UPTC</h1>
        <div>
          <input
            type="text"
            placeholder="Add a new task"
            className="border border-line rounded-md p-2"
            value={tarea}
            onInput={(valor) => setTarea(valor.target.value)}
          />
          <button
            className="bg-blue-500 text-white rounded-md p-2"
            onClick={crearTarea}
          >
            Add
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 w-full">
        <h2 className="text-4xl font-bold">Todas las tareas</h2>
        {listaTareas.length === 0 && (
          <p className="text-gray-500">No hay tareas</p>
        )}
        {listaTareas.map((tra) => (
          <div
            key={tra.id}
            className="flex flex-col items-center gap-4 w-96 bg-gray-600/50 rounded-md p-4"
          >
            <h3>{tra.nombre}</h3>
            <p>
              Está completada:{" "}
              <span className="text-red-500">
                {tra.estaCompletada ? "Si" : "No"}
              </span>
            </p>
            <p>
              Fecha de creación:{" "}
              <span className="text-gray-500">
                {tra.fechaCreacion.toLocaleDateString()}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};