export const Task = ({ tarea, completarTarea, eliminarTarea }) => {
  return (
    <div className="flex flex-col items-center gap-4 w-96 bg-gray-600/50 rounded-md p-4">
      <h3>{tarea.nombre}</h3>
      <p>
        Está completada:{" "}
        <span
          className={tarea.estaCompletada ? "text-green-500" : "text-red-500"}
        >
          {tarea.estaCompletada ? "Si" : "No"}
        </span>
      </p>
      <p>
        Fecha de creación:{" "}
        <span className="text-gray-500">
          {tarea.fechaCreacion.toLocaleDateString()}
        </span>
      </p>
      <button
        className="bg-blue-500 text-white rounded-md p-2"
        onClick={() => completarTarea(tarea.id)}
        disabled={tarea.estaCompletada}
      >
        {tarea.estaCompletada ? "Completada" : "Completar"}
      </button>
      <button
        className="bg-red-500 text-white rounded-md p-2"
        onClick={() => eliminarTarea(tarea.id)}
      >
        Eliminar
      </button>
    </div>
  );
};
