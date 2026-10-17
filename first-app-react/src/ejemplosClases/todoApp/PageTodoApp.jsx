import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "./Task";

export const PageTodoApp = () => {
  const [tarea, setTarea] = useState("");
  const [listaTareas, setListaTareas] = useState(
    localStorage.getItem("tareas")
      ? JSON.parse(localStorage.getItem("tareas")).map((tra) => ({
          ...tra,
          fechaCreacion: new Date(tra.fechaCreacion),
        }))
      : [],
  );

  const crearTarea = () => {
    const tareaAGuardar = {
      id: uuidv4(),
      nombre: tarea,
      estaCompletada: false,
      fechaCreacion: new Date(),
    };
    const tareasAGuardar = [tareaAGuardar, ...listaTareas];
    localStorage.setItem("tareas", JSON.stringify(tareasAGuardar));
    setListaTareas(tareasAGuardar);
    setTarea("");
  };

  const completarTarea = (id) => {
    const tareaCompletada = listaTareas.find((tra) => tra.id === id);
    tareaCompletada.estaCompletada = !tareaCompletada.estaCompletada;
    localStorage.setItem("tareas", JSON.stringify(listaTareas));
    setListaTareas([...listaTareas]);
  };

  const eliminarTarea = (id) => {
    const listaTareasFiltrada = listaTareas.filter((tra) => tra.id !== id);
    localStorage.setItem("tareas", JSON.stringify(listaTareasFiltrada));
    setListaTareas(listaTareasFiltrada);
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
          <Task
            key={tra.id}
            tarea={tra}
            completarTarea={completarTarea}
            eliminarTarea={eliminarTarea}
          />
        ))}
      </div>
    </div>
  );
};
