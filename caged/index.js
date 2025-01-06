import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const body = document.querySelector("body")
const main = document.querySelector("main")


const loadText = async () => {
    const text = await (await fetch("./script.md")).text()
    const textArray = text.split('\r\n')
    return textArray.slice(1 + textArray.findIndex((x) => x === "# START"));
}

let text
let lineIndex = 0;
const renderLine = () => {
    let /** @type {string} */ nextText = text[lineIndex];
    const template = document.createElement("template");
    let parsed = marked.parse(nextText);
    if (parsed == "") {
        parsed = "<br/>"
    }
    template.innerHTML = parsed;

    template.content.children[0].classList.add("text-reveal");
    const newNode = template.content;
    main.appendChild(newNode);
    if (text[1 + lineIndex] == "") {
        lineIndex++;
        renderLine();
    }
}

loadText().then((res) => {
    text = res;
    console.log(res);
    renderLine()
})


body.addEventListener("click", () => {
    lineIndex++
    renderLine()
})