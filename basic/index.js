import { RadioButton, RadioQuestion } from "./components.js";
import questions from "./questions.js";
RadioButton.register();
RadioQuestion.register();

const form = document.querySelector("form");
for (const question of questions.reverse()) {
	const newQuestion = new RadioQuestion({ question });
	form.prepend(newQuestion);
}

import results from "./results.js";
const renderResult = (result) => {
	const [trues, total] = result;
	const percentage = (trues / total) * 100;

	const { title, text } = results.find((x) => percentage >= x.threshold);

	const resultString = /*html*/ `
        Out of ${total} questions, you have answered yes to ${trues} (${percentage}%). This makes you:
        <h2>${title}</h2>
        ${text}
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
	if (answerArray.length === questions.length) {
		const trues = answerArray.reduce((acc, val) => {
			return acc + (val === "true" ? 1 : 0);
		}, 0);
		renderResult([trues, questions.length]);
	}
};
