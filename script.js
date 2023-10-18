const projects = [
    {
        "header": "docuMed",
        "text": "A medtech health app. Provides consult transcriptions to doctors and patients. I am working with designers, data scientists, and medical specialists on this project.",
        "media": {
            "type": "video",
            "urlMp4": "./docuMed.mp4",
            "urlWebm": "./docuMed.webm",
            "urlSite": "https://www.documed.com.au",
        },
        "urlGithub": "",
        "enabled": true,
        "techs": [
            "typescript",
            "svelte",
            "firebase",
            "confluence",
            "jira",
            "figma",
        ]
    },
    {
        "header": "Adventuraxolotl",
        "text": "A visual novel built in RenPy. I'm mostly working on this alone, with some sporadic help from the internet.",
        "media": {
            "type": "image",
            "urlImage": "./adventuraxolotl.png",
            "urlSite": "https://adventuraxolotl.github.io/",
        },
        "urlGithub": "https://github.com/adventuraxolotl",
        "enabled": true,
        "techs": [
            "python"
        ]
    },
    {
        "header": "The Odin Project (Course)",
        "text": "A course teaching me everything I need to know about web development. A very hands-on, project-focused approach. This page was built as part of it!",
        "media": {
            "type": "image",
            "urlImage": "./homepage.png",
            "urlSite": "https://www.theodinproject.com/",
        },
        "urlGithub": "https://github.com/BobSlim/odin",
        "enabled": true,
        "techs": [
            "html5",
            "css3",
            "javascript",
        ]
    }
]

const techs = {
    "svelte": {
        "type": "devicon",
        "url": "devicon-svelte-plain",
    },
    "typescript": {
        "type": "devicon",
        "url": "devicon-typescript-plain",
    },
    "python": {
        "type": "devicon",
        "url": "devicon-python-plain",
    },
    "firebase": {
        "type": "devicon",
        "url": "devicon-firebase-plain",
    },
    "figma": {
        "type": "devicon",
        "url": "devicon-figma-plain",
    },
    "html5": {
        "type": "devicon",
        "url": "devicon-html5-plain",
    },
    "css3": {
        "type": "devicon",
        "url": "devicon-css3-plain",
    },
    "confluence": {
        "type": "devicon",
        "url": "devicon-confluence-plain",
    },
    "jira": {
        "type": "devicon",
        "url": "devicon-jira-plain",
    },
    "javascript": {
        "type": "devicon",
        "url": "devicon-javascript-plain",
    },

}

const renderIconList = (techList = []) => {
    const list = document.createElement("ul")
    list.classList.add("icons")
    techList.forEach(tech => list.appendChild(renderIcon(techs[tech])))
    return list
}

const renderIcon = (icon) => {
    const iconDOM = document.createElement("li")
    iconDOM.classList.add("iconAnchor")
    let renderedIcon
    switch (icon.type) {
        case "devicon":
        default:
            renderedIcon = `
            <a></a>
            <i class="${icon.url} icon"></i>
            `
    }
    iconDOM.innerHTML = renderedIcon
    const i = iconDOM.querySelector(".icon")
    iconDOM.addEventListener("mouseover", () => { i.classList.add("colored") })
    iconDOM.addEventListener("mouseleave", () => { i.classList.remove("colored") })
    return iconDOM
}

const renderProject = (project) => {
    const renderContent = (project) => {
        const contentDOM = document.createElement("div")
        contentDOM.classList.add("project-content")
        contentDOM.innerHTML = `
            <header class="project-headerRow">
                <h3>${project.header}</h3>
                ${project.urlGithub ? `<a href="${project.urlGithub}" class="gitIcon"><i class="devicon-github-original"></i></a>` : ""}
            </header>
            <p>${project.text}</p>
        `
        contentDOM.insertBefore(renderIconList(project.techs), contentDOM.children[1])
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