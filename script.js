const projects = [
    {
        "header": "docuMed",
        "text": "A medtech health app. Provides consult transcriptions to doctors and patients.",
        "media": {
            "type": "video",
            "urlMp4": "./docuMed.mp4",
            "urlWebm": "./docuMed.webm",
            "urlSite": "https://www.documed.com.au",
        },
        "urlGithub": "",
        "enabled": true
    },
    {
        "header": "Adventuraxolotl",
        "text": "A visual novel built in RenPy.",
        "media": {
            "type": "image",
            "urlImage": "./adventuraxolotl.png",
            "urlSite": "https://adventuraxolotl.github.io/",
        },
        "urlGithub": "",
        "enabled": true
    },
    {
        "header": "The Odin Project (Course)",
        "text": "Getting through it.",
        "media": {
            "type": "image",
            "urlImage": "./adventuraxolotl.png",
            "urlSite": "",
        },
        "urlGithub": "",
        "enabled": true
    }
]

const renderProject = (project) => {
    const renderContent = (project) => {
        const contentDOM = document.createElement("div")
        contentDOM.classList.add("project-content")
        contentDOM.innerHTML = `
            <header class="project-headerRow">
                <h3>${project.header}</h3>
                <a href="${project.urlGithub}"><i class="devicon-github-original"></i></a>
            </header>
            <p>${project.text}</p>
        `
        return contentDOM
    }
    const renderMedia = (media) => {
        const mediaDOM = document.createElement("a")
        mediaDOM.href = media.urlSite
        switch (media.type) {
            case "image":
                mediaDOM.innerHTML = `
                   <img class="project-image" src="${media.urlImage}" alt="">
                `
                break;
            case "video":
                mediaDOM.innerHTML = `
                    <video autoplay muted loop class="project-image" alt="">
                        <source src=${media.urlMp4} type="video/mp4"/>
                        <source src=${media.urlWebm} type="video/webm"/>
                    </video>
                `
                break;
        }
        return mediaDOM
    }

    const projectDOM = document.createElement("article")
    projectDOM.classList.add("project")
    projectDOM.appendChild(renderMedia(project.media))
    projectDOM.appendChild(renderContent(project))
    return projectDOM
}


const projectsDOM = document.querySelector(".projects")
projects.forEach((project) => { projectsDOM.appendChild(renderProject(project)) })

const icons = document.querySelectorAll(".icons>li")
console.log(icons)
icons.forEach(icon => icon.addEventListener("mouseover", () => { icon.querySelectorAll("i").forEach((i) => { i.classList.add("colored") }) }))
icons.forEach(icon => icon.addEventListener("mouseleave", () => { icon.querySelectorAll("i").forEach((i) => { i.classList.remove("colored") }) }))
