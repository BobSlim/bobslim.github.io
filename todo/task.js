import {
	attrToBool,
	definitely,
	getBoolAttr,
	register,
	setBoolAttr,
} from "./util.js";

export class TaskModel {
	constructor({
		id = crypto.randomUUID(),
		createTime = new Date(),
		text = "",
		done = false,
	} = {}) {
		this.id = id;
		this.createTime = createTime;
		this.text = text;
		this.done = done;
	}
}

class TodoRepo {
	storeName = "tasks";

	/** @param {IDBDatabase} db */
	constructor(db) {
		this.db = db;
	}

	getStore(type = "readonly") {
		return this.db
			.transaction(this.storeName, type)
			.objectStore(this.storeName);
	}

	getAll() {
		return new Promise((resolve, reject) => {
			const task = this.getStore().getAll();
			task.onsuccess = () =>
				resolve(task.result.map((x) => new TaskModel(x)));
			task.onerror = reject;
		});
	}
	/** @param {TaskModel} model */
	save(model) {
		return new Promise((resolve, reject) => {
			const task = this.getStore("readwrite").add(model);
			task.onsuccess = resolve;
			task.onerror = reject;
		});
	}

	update(model) {
		return new Promise((resolve, reject) => {
			const task = this.getStore("readwrite").put(model);
			task.onsuccess = () => resolve(task.result);
			task.onerror = reject;
		});
	}

	clearAll() {
		return new Promise((resolve, reject) => {
			const result = this.getStore("readwrite").clear();
			result.onsuccess = () => resolve(result.result);
			result.onerror = reject;
		});
	}
}

const todoTemplate = document.createElement("template");
todoTemplate.innerHTML = /*html*/ `
<style>
	:host li {
		cursor: pointer;
		list-style-type: "☐"
	}

	:host([done]) li {
		text-decoration: line-through;
		text-decoration-color: green;
		list-style-type: "☑";
		color: grey;
	}

	:host([done]) li::marker {
		color: green;
	}

</style>
<li><slot></slot></li>
`;

export class TodoTask extends HTMLElement {
	/**
	 * @param {TaskModel | Partial<TaskModel>} model
	 */
	constructor(model) {
		super();

		this.model = definitely(model, TaskModel);
		this.done = this.model.done;
		this.onclick = function () {
			this.done = !this.done;
		};

		const shadowRoot = this.attachShadow({ mode: "open" });
		shadowRoot.appendChild(todoTemplate.content.cloneNode(true));
	}

	connectedCallback() {
		this.innerHTML = this.model.text;
	}

	static observedAttributes = ["done"];
	attributeChangedCallback(name, ...rest) {
		switch (name) {
			case "done":
				this.onDoneChange(...rest);
				break;
			default:
				break;
		}
	}

	onDoneChange(oldValue, newValue) {
		this.model.done = attrToBool(newValue);
		const event = new CustomEvent("task-update", {
			bubbles: true,
			cancelable: true,
		});
		this.dispatchEvent(event);
	}
	get done() {
		return getBoolAttr(this, "done");
	}
	set done(newVal) {
		setBoolAttr(this, "done", newVal);
	}
}

export default {
	model: TaskModel,
	component: TodoTask,
	repo: TodoRepo,
	register: register("todo-task"),
};
