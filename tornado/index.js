import "./spiral.js"

const textBox = document.body;

const myWarp = {
    path: {
        radius: 50,
        angle: "0deg",
    },
    targets: ["#warp", ".circled", ".rotate"],
    rotationMode: "rotate",
    indent: "100px",
}

const splitText = (text) => {
    const midWay = Math.floor(text.length / 2 + 5)
    const firstHalf = text.slice(0, midWay);
    const secondHalf = text.slice(midWay);
    return [firstHalf, secondHalf];
}

const addText = (textArray) => {
    const warpConfigs = []
    textArray = textArray.flatMap(splitText)
    for (const i in textArray) {
        const className = `rotate-${i}`
        const text = textArray[i]

        const parentElement = document.createElement("div");
        parentElement.classList.add(className, "rotate");
        parentElement.style.setProperty("--i", Math.floor(text.length * 0.1).toString())
        parentElement.innerText = text;

        const randomAngle = Math.floor(Math.random() * 360)

        warpConfigs.push({
            ...myWarp,
            path: {
                radius: 10 + text.length * 1.5,
                angle: `${randomAngle}deg`
            },
            targets: [`.${className}`]
        })

        textBox.append(parentElement);
    }

    return warpConfigs;
}

const treatQuote = (y) => {
    let returnValue = `${y.text} - ${y.person}`
    if (y.context) {
        returnValue = `${returnValue}, ${y.context}`
    }
    return returnValue
}

export const main = async () => {
    return await fetch("./text.json")
        .then((res) => res.json())
        .then((x) => x.map(treatQuote))
        .then(addText)
}