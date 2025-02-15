import React, { useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/damian",
        { method: "GET" }
      );
      const data = await response.json();
      console.log("GET TODOS", data);
      setTodos(data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(
        `https://playground.4geeks.com/todo/todos/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      // No intentes hacer response.json() si no hay cuerpo en la respuesta
      if (!response.ok) {
        const errorData = await response.json();
        console.log("ERROR AL ELIMINAR", errorData);
      } else {
        console.log(`Todo con id ${id} eliminado`);
        getTodo(); // Volver a cargar todos después de eliminar
      }
    } catch (error) {
      console.log("Error en DELETE", error);
    }
  };

  const createUserTodo = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/todos/damian",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ label: inputValue, is_done: false }),
        }
      );

      const data = await response.json();

      // Esto devuelve el estado completo {name: "damian", todos: [...]}
      console.log("POST TODO", data);

      // Recargamos la lista desde la API después del POST
      getTodo();

      setInputValue(""); // Limpiar el input solo si se creó correctamente
    } catch (error) {
      console.log("Error en POST", error);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-center mt-5">Mis pendientes</h1>
      <ul>
        <li>
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyPress={(e) => {
              if (e.key === "Enter" && inputValue.trim() !== "") {
                createUserTodo();
              }
            }}
            placeholder="¿Qué quieres hacer?"
          />
        </li>

        {todos.map((item) => (
          <li key={item.id} className="listaDePendientes">
            {item.label}{" "}
            <i
              className="basurero fa-solid fa-trash"
              onClick={() => deleteTodo(item.id)}
            ></i>
          </li>
        ))}
      </ul>
      <div className="xPendientes">{todos.length} pendientes</div>
    </div>
  );
};

export default Home;
