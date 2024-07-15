const connect = () => {
	return new Promise((resolve, reject) => {
		/** @type {IDBDatabase} */
		let db;
		const request = window.indexedDB.open("todo", 1);
		request.onerror = reject;
		request.onsuccess = () => resolve(request.result);
		/** @param {IDBVersionChangeEvent} event */
		request.onupgradeneeded = function (event) {
			const db = event.target.result;
			db.createObjectStore("tasks", { keyPath: "id" });
		};
	});
};

const db = await connect();
db.onerror = console.error;

export default db;
