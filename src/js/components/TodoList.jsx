import { useEffect, useState } from "react";

const URLApi = 'https://playground.4geeks.com/todo/users/sergio90';


export const TodoList = () => {

	const [input, setInput] = useState('');
	const [taskList, setTaskList] = useState([]);
	

	const handleKeyUp = (e) => {
		if (e.key === 'Enter') {
			createTask();
		}
	};

	const getTask = async () => {
		const response = await fetch(URLApi);

		if (!response.ok) {
			console.log('Crea usurario atontao')
			createUser()
		}
		const data = await response.json()
		setTaskList(data.todos);

	}

	const createTask = async () => {
		const response = await fetch('https://playground.4geeks.com/todo/todos/sergio90', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				label: input,
				is_done: false
			})
		})
		const data = await response.json();
		getTask();
		setInput('');

	};

	useEffect(() => {
		getTask()
	}, [])


	const deleteTarea = async (id) => {

		await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: 'DELETE'
		});

		setTaskList(taskList.filter(task => task.id !== id));

	};

	const deleteFullTask = async () => {
		
		taskList.map(task => 
        fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
            method: 'DELETE'
        })
    );

		setTaskList([])

	}


	const createUser = async () => {
		await fetch(URLApi, { method: 'POST' })
	}


	return (
		<>

			<h1 className="text-center mt-4 titulo">LISTA DE TAREAS</h1>

			<div className="container my-4 border-2 d-flex justify-content-center ">

				<div className="row p-3 mx-5 w-50 bg-dark rounded-2">
					<input
						className="input rounded-2 fw-bold"
						type="text"
						placeholder="Introduce la tarea"
						onChange={(e) => setInput(e.target.value)}
						onKeyUp={handleKeyUp}
						value={input}
					/>

					<span className="text-white text-center my-2">
						Te {taskList.length === 1 ? 'queda' : 'quedan'} {taskList.length} {taskList.length === 1 ? 'tarea' : 'tareas'} aún por completar. {taskList.length > 1 ? 'Espabila' : ''}
					</span>
					<button onClick={deleteFullTask} className="btn btn-danger text-dartk my-2">Borrar Tareas</button>

					{
						taskList.map((task) => (
							<div className="d-flex justify-content-between bg-white align-items-center mt-1 border border-2 tarea rounded-2 fw-bold">
								<span key={task.id}>{task.label}</span>
								<button onClick={() => deleteTarea(task.id)} className="deletebtn">❌</button>
							</div>

						))
					}


				</div>
			</div>
		</>
	)
};