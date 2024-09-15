import { RadioButton, RadioQuestion } from "./components.js";
import questions from "./questions.js";
RadioButton.register();
RadioQuestion.register();

const form = document.querySelector("form");
for (const question of questions.reverse()) {
	const newQuestion = new RadioQuestion({ question });
	form.prepend(newQuestion);
}

const renderResult = (result) => {
	const [trues, total] = result;
	const percentage = (trues / total) * 100;

	let resultTitle = "Probably not asian.";
	let resultText =
		"I don't make the rules. Sorry. If you are asian, I guess that makes you a banana: white on the inside, yellow on the outside.";

	switch (true) {
		case percentage === 100:
			resultTitle = "Basically an asian.";
			resultText =
				"Yeah, you hit every box somehow. I'm impressed. You fit every stereotype I could think of, which makes you the Base Asian. Every other asian is just a subset of you.";
			break;
		case percentage >= 75:
			resultTitle = "Likely an asian.";
			resultText =
				"You hit most of them. That means you fit the stereotype, and I probably won't be wrong if I called you an asian. Welcome to the club, kiddo, proud of you.";
			break;
		case percentage >= 50:
			resultTitle = "Not a basic asian.";
			resultText =
				"You didn't answer yes to many of them, which means you don't fit this stereotype. Congratulations on not being basic, I guess. Woohoo?";
			break;
	}

	const resultString = /*html*/ `
        Out of ${total} questions, you have answered yes to ${trues} (${percentage}%). This makes you:
        <h2>${resultTitle}</h2>
        ${resultText}
        <p><small>**please note that this is strictly for entertainment. I mean no offense by these comments.</small></p>
        
    `;
	form.innerHTML = resultString;
};

form.onsubmit = (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	const answerArray = [];
	for (const [_key, value] of formData.entries()) {
		answerArray.push(value);
	}
	// if (answerArray.length === questions.length) {
	const trues = answerArray.reduce((acc, val) => {
		return acc + (val === "true" ? 1 : 0);
	}, 0);
	renderResult([trues, questions.length]);
	// }
};
