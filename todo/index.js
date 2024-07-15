const newTaskForm = document.getElementById("newTaskForm");
if (newTaskForm === null || !(newTaskForm instanceof HTMLFormElement))
	throw new Error();
const sect = document.getElementById("todoSection");

import task from "./task.js";
task.register();

import db from "./db.js";
const taskRepo = new task.repo(db);

const addTask = (newTask) => {
	const newTaskComponent = new task.component(newTask);
	sect.appendChild(newTaskComponent);
	newTaskComponent.addEventListener("task-update", (event) => {
		taskRepo.update(event.target.model).then(console.log);
	});
};

const handleSubmit = (e) => {
	e.preventDefault();
	const newText = new FormData(newTaskForm).get("todoText").toString();
	newTaskForm.elements["todoText"].value = "";
	const newTask = new task.model({ text: newText });
	addTask(newTask);
	taskRepo.save(newTask);
};

newTaskForm.addEventListener("submit", handleSubmit);

document.getElementById("clearButton").addEventListener("click", async () => {
	await taskRepo.clearAll();
	sect.innerHTML = "";
});

const tasks = await taskRepo.getAll();
tasks.forEach(addTask);
