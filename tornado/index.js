const addText = (textArray) => {
    for (const i in textArray) {
        const parentElement = document.createElement("div");
        parentElement.classList.add("rotate");
        parentElement.style.setProperty("--i", i);

        const newElement = document.createElement("p");
        newElement.innerText = textArray[i];

        parentElement.append(newElement);
        textBox.append(parentElement);
    }

    return textArray;
}

fetch("./text.json").then((res) => res.json()).then((x) => x.map((y) => y.text)).then(addText)

const textBox = document.getElementById("textBox");