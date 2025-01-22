import React, { useState }from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';



//create your first component
const Home = () => {

	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	return (
		<div className="text-center">
            

			<h1 className="text-center mt-5">Mis pendientes</h1>
			<ul>
				<li>
					<input type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value = {inputValue}
					onKeyPress={(e) =>{
						if (e.key === "Enter") {
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
						{item} <i className=" basurero fa-solid fa-trash" onClick={() =>setTodos(todos.filter((t, currentIndex) => index != currentIndex))}></i>
					</li>
				))}
			</ul>
			<div className="xPendientes">{todos.length} pendientes</div>

		</div>
	);
};

export default Home;