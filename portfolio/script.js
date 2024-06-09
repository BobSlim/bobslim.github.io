const projects = [
	{
		header: "docuMed",
		text: "A medtech health app. Provides consult transcriptions to doctors and patients. I am working with designers, data scientists, and medical specialists on this project.",
		media: {
			type: "video",
			urlMp4: "./docuMed.mp4",
			urlWebm: "./docuMed.webm",
			urlSite: "https://www.documed.com.au",
		},
		urlGithub: "",
		enabled: true,
		techs: [
			"typescript",
			"svelte",
			"firebase",
			"confluence",
			"jira",
			"figma",
		],
	},
	{
		header: "Battleship",
		text: "Built to learn Test Driven Development (TDD). Uses Jest for testing and MVC model for rendering. I first attempted a Functional Programming model, but found that too difficult to parse. I might come back at it some day.",
		media: {
			type: "image",
			urlImage: "./battleship.png",
			urlSite: "https://www.robertlim.dev/battleship/",
		},
		urlGithub: "https://github.com/BobSlim/battleship",
		enabled: true,
		techs: ["jest", "javascript"],
	},
	{
		header: "React Project (WIP)",
		text: "A playground that I used to learn React.",
		media: {
			type: "image",
			urlImage: "./react.png",
			urlSite: "https://react.robertlim.dev",
		},
		urlGithub: "https://github.com/BobSlim/odin-react",
		enabled: true,
		techs: ["react"],
	},
	{
		header: "The Odin Project (Course)",
		text: "A course teaching me everything I need to know about web development. A very hands-on, project-focused approach. This page was built as part of it!",
		media: {
			type: "image",
			urlImage: "./homepage.png",
			urlSite: "https://www.theodinproject.com/",
		},
		urlGithub: "https://github.com/BobSlim/odin",
		enabled: true,
		techs: ["html5", "css3", "javascript"],
	},
	{
		header: "Adventuraxolotl",
		text: "A visual novel built in RenPy. I'm mostly working on this alone, with some sporadic help from the internet.",
		media: {
			type: "image",
			urlImage: "./adventuraxolotl.png",
			urlSite: "https://adventuraxolotl.github.io/",
		},
		urlGithub: "https://github.com/adventuraxolotl",
		enabled: true,
		techs: ["python"],
	},
];

const techs = {
	svelte: {
		type: "devicon",
		url: "devicon-svelte-plain",
	},
	typescript: {
		type: "devicon",
		url: "devicon-typescript-plain",
	},
	python: {
		type: "devicon",
		url: "devicon-python-plain",
	},
	firebase: {
		type: "devicon",
		url: "devicon-firebase-plain",
	},
	figma: {
		type: "devicon",
		url: "devicon-figma-plain",
	},
	html5: {
		type: "devicon",
		url: "devicon-html5-plain",
	},
	css3: {
		type: "devicon",
		url: "devicon-css3-plain",
	},
	confluence: {
		type: "devicon",
		url: "devicon-confluence-plain",
	},
	jira: {
		type: "devicon",
		url: "devicon-jira-plain",
	},
	javascript: {
		type: "devicon",
		url: "devicon-javascript-plain",
	},
	react: {
		type: "devicon",
		url: "devicon-react-plain",
	},
	jest: {
		type: "devicon",
		url: "devicon-jest-plain",
	},
};

// @ts-expect-error not currently used
const webDevelopmentTerms = [
	"HTML",
	"CSS",
	"JavaScript",
	"Front-end",
	"Back-end",
	"Full-stack",
	"Responsive Design",
	"User Interface (UI)",
	"User Experience (UX)",
	"HTTP",
	"HTTPS",
	"URL",
	"Domain Name",
	"Web Hosting",
	"Server",
	"Client",
	"API (Application Programming Interface)",
	"Database",
	"SQL",
	"NoSQL",
	"Version Control",
	"Git",
	"Repository",
	"Framework",
	"Library",
	"CMS (Content Management System)",
	"IDE (Integrated Development Environment)",
	"Debugging",
	"Testing",
	"Cross-browser Compatibility",
	"AJAX",
	"Node.js",
	"NPM (Node Package Manager)",
	"JSON (JavaScript Object Notation)",
	"REST API",
	"MVC (Model-View-Controller)",
	"SPA (Single Page Application)",
	"SEO (Search Engine Optimization)",
	"Web Accessibility",
	"Cookies",
	"Session",
	"Authentication",
	"Authorization",
	"Responsive Images",
	"Web Security",
	"Web Performance",
	"Scalability",
	"Web Standards",
	"Semantic HTML",
	"Bootstrap",
	"SASS/SCSS",
	"LESS",
	"Webpack",
	"Babel",
	"Responsive Typography",
	"Front-end Framework",
	"Back-end Framework",
	"WebSockets",
	"URL Routing",
	"Web Analytics",
	"Content Delivery Network (CDN)",
	"Progressive Web App (PWA)",
	"SSL/TLS",
	"Web Server",
	"HTTP Methods",
	"Cookies",
	"Authentication Tokens",
	"CRUD (Create, Read, Update, Delete)",
	"Web Caching",
	"Content Management System (CMS)",
	"Web Design",
	"Wireframe",
	"Prototyping",
	"User Testing",
	"DOM (Document Object Model)",
	"API Endpoint",
	"Front-end Build Tools",
	"Back-end Build Tools",
	"Responsive Web Design",
	"Mobile-First Design",
	"Grid Layout",
	"Flexbox",
	"Web Animation",
	"SVG (Scalable Vector Graphics)",
	"Web Fonts",
	"Web Hosting Providers",
	"DNS (Domain Name System)",
	"Web Server Configuration",
	"Code Deployment",
	"Continuous Integration (CI)",
	"Continuous Deployment (CD)",
	"Serverless Computing",
	"Content Management",
	"Web Scraping",
	"Data Visualization",
	"Web Forms",
	"Web Templates",
	"Web Development Lifecycle",
	"User Interface (UI) Framework",
	"User Experience (UX) Design",
	"A/B Testing",
	"Web Accessibility Standards",
	"API Authentication",
	"API Rate Limiting",
	"Microservices",
	"Docker",
	"Containerization",
	"Web Security Vulnerabilities",
	"Content Security Policy (CSP)",
	"Front-end Performance Optimization",
	"Back-end Performance Optimization",
	"Responsive Images",
	"Single Page Application (SPA) Framework",
	"Web Application Architecture",
];

const renderIconList = (techList = []) => {
	const list = document.createElement("ul");
	list.classList.add("icons");
	techList.forEach((tech) => list.appendChild(renderIcon(techs[tech])));
	return list;
};

const renderIcon = (icon) => {
	const iconDOM = document.createElement("li");
	iconDOM.classList.add("iconAnchor");
	let renderedIcon;
	switch (icon.type) {
		case "devicon":
		default:
			renderedIcon = `
            <a></a>
            <i class="${icon.url} icon"></i>
            `;
	}
	iconDOM.innerHTML = renderedIcon;
	const i = iconDOM.querySelector(".icon");
	iconDOM.addEventListener("mouseover", () => {
		i.classList.add("colored");
	});
	iconDOM.addEventListener("mouseleave", () => {
		i.classList.remove("colored");
	});
	return iconDOM;
};

const renderProject = (project) => {
	const renderContent = (project) => {
		const contentDOM = document.createElement("div");
		contentDOM.classList.add("project-content");
		contentDOM.innerHTML = `
            <header class="project-headerRow">
                <h3>${project.header}</h3>
                ${project.urlGithub ? `<a href="${project.urlGithub}" class="gitIcon"><i class="devicon-github-original"></i></a>` : ""}
            </header>
            <p>${project.text}</p>
        `;
		contentDOM.insertBefore(
			renderIconList(project.techs),
			contentDOM.children[1],
		);
		return contentDOM;
	};
	const renderMedia = (media) => {
		const mediaDOM = document.createElement("a");
		mediaDOM.href = media.urlSite;
		switch (media.type) {
			case "image":
				mediaDOM.innerHTML = `
                   <img class="project-image" src="${media.urlImage}" alt="">
                `;
				break;
			case "video":
				mediaDOM.innerHTML = `
                    <video autoplay muted loop class="project-image" alt="">
                        <source src=${media.urlMp4} type="video/mp4"/>
                        <source src=${media.urlWebm} type="video/webm"/>
                    </video>
                `;
				break;
		}
		return mediaDOM;
	};

	const projectDOM = document.createElement("article");
	projectDOM.classList.add("project");
	projectDOM.appendChild(renderMedia(project.media));
	projectDOM.appendChild(renderContent(project));
	return projectDOM;
};

const projectsDOM = document.querySelector(".projects");
projects.forEach((project) => {
	projectsDOM.appendChild(renderProject(project));
});
