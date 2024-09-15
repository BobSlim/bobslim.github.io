export class RadioButton extends HTMLElement {
	static template = undefined;
	static constructTemplate() {
		RadioButton.template = document.createElement("template");
		RadioButton.template.innerHTML = /*html*/ `
			<label>
				<input type="radio" name="groupName" value="value" />
				<span></span>
			</label>
			<br />
		`;
	}
	static register() {
		RadioButton.constructTemplate();
		customElements.define("radio-button", RadioButton);
	}

	constructor() {
		super();
		const templateContent = RadioButton.template.cloneNode(true).content;
		this.appendChild(templateContent);
		this.input = this.querySelector("input");
		this.onclick = () => {
			this.input.click();
		};
		this.input.onchange = (e) => {
			document
				.querySelectorAll(`radio-button[group-name="${this["group-name"]}"]`)
				.forEach((x) => {
					x.selected = false;
				});
			this.selected = this.input.checked;
		};
	}

	connectedCallback() {
		if (!this.label) {
			this.label = this.value;
		}
	}

	set selected(newValue) {
		this.setAttribute("selected", newValue);
	}

	static observedAttributes = ["value", "group-name", "label"];
	attributeChangedCallback(name, oldValue, newValue) {
		this[name] = newValue;
	}

	get "group-name"() {
		return this.getAttribute("group-name");
	}
	set "group-name"(newValue) {
		if (this["group-name"] !== newValue)
			this.setAttribute("group-name", newValue);
		this.querySelector("input").setAttribute("name", newValue);
	}

	get value() {
		return this.getAttribute("value");
	}
	set value(newValue) {
		if (this.value !== newValue) this.setAttribute("value", newValue);
		this.querySelector("input").setAttribute("value", newValue);
	}

	get label() {
		return this.getAttribute("label");
	}
	set label(newValue) {
		if (this.label !== newValue) this.setAttribute("label", newValue);
		this.querySelector("span").innerText = newValue;
	}
}

export class RadioQuestion extends HTMLElement {
	static template = undefined;
	static constructTemplate() {
		RadioQuestion.template = document.createElement("template");
		RadioQuestion.template.innerHTML = /*html*/ `
			<label></label> <br />
			<div class="button-group">
				<radio-button value="true" label="Yes"></radio-button>
				<radio-button value="false" label="No"></radio-button>
			</div>
			<br/>
		`;
	}
	static register() {
		RadioQuestion.constructTemplate();
		customElements.define("radio-question", RadioQuestion);
	}

	constructor({ question = "question" }) {
		super();
		const templateContent = RadioQuestion.template.cloneNode(true).content;
		this.appendChild(templateContent);
		this.question = question;
	}

	static observedAttributes = ["question"];
	attributeChangedCallback(name, oldValue, newValue) {
		this[name] = newValue;
	}

	get question() {
		return this.getAttribute("question");
	}
	set question(newValue) {
		if (this.question !== newValue) this.setAttribute("question", newValue);
		this.querySelector("label").innerText = newValue;
		const radioButtons = this.querySelectorAll("radio-button");

		radioButtons.forEach((node) => {
			node.setAttribute("group-name", newValue);
		});
	}
}
