export const definitely = (obj, builder) =>
	obj instanceof builder ? obj : new builder(obj);

export const register = (defaultName = "todo-undefined") =>
	function (name = defaultName) {
		customElements.define(name, this.component);
	};

export const boolToAttr = (bool) => (bool ? "" : null);
export const attrToBool = (attr) => attr !== null;
export const setBoolAttr = (that, attrName, newValue) =>
	newValue ? that.setAttribute(attrName, "") : that.removeAttribute(attrName);
export const getBoolAttr = (that, attrName) =>
	attrToBool(that.getAttribute(attrName));
