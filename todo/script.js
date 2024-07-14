const todoTemplate = document.createElement("template");
todoTemplate.innerHTML = /*html*/`<slot></slot>`

class TodoTask extends HTMLElement {
    id = crypto.randomUUID();
    createTime = new Date();

    constructor(text) {
        super();
        const shadowRoot = this.attachShadow({mode: "open"});
        shadowRoot.appendChild(todoTemplate.content.cloneNode(true))
        this.onclick = () => this.done = !this.done;
    };

    get done () {
        return this.getAttribute('done') !== null;
    }
    set done (newVal) {
        if (newVal) {
            return this.setAttribute("done", '');
        } else {
            return this.removeAttribute("done");
        }
    }
}

customElements.define('todo-task', TodoTask)