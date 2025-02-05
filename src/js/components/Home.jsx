import React, { useState, useEffect }from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';



//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);
	useEffect(() =>{
		getTodo()
	}, [])

	const getTodo = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/users/damian",
				{
					method: "GET",
				},
			)
			const data = await response.json();
		console.log(data);
		setTodos(data.todos);
		} catch (error) {
			console.log(error)
		}
	}

	const deleteTodo = async (id) => {
		try {
			const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			const data = await response.json();
		console.log(data);
		} catch (error) {
			console.log(error)
		}
	}


	const createUserTodo = async () => {
		try {
			const response = await fetch("https://playground.4geeks.com/todo/todos/damian",
			{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				label: inputValue,
				is_done: false,
			}),
			} 
		);
		const data = await response.json();
		console.log(data);
		} catch (error) {
			console.log(error);
		}
	};


	return (
		<div className="text-center">
            

			<h1 className="text-center mt-5">Mis pendientes</h1>
			<ul>
				<li>
					<input type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value = {inputValue}
					onKeyPress={(e) =>{
						if (e.key === "Enter" && inputValue.trim() !== "") {
						createUserTodo(inputValue);
						setTodos(todos.concat([inputValue]));
						setInputValue("");	
						}
					}
				}
				placeholder="¿que quieres hacer?"
					/>
				</li>
				{todos.map((item, index) =>(
					<li className="listaDePendientes">
						{item.label} <i className=" basurero fa-solid fa-trash" onClick={() =>{setTodos(todos.filter((t, currentIndex) => index != currentIndex)), deleteTodo(item.id)}}></i>
					</li>
				))}
			</ul>
			<div className="xPendientes">{todos.length} pendientes</div>


		</div>
	);
};

export default Home;