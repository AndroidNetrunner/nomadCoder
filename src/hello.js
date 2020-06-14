const hello = document.querySelector('.hello');
const form = document.querySelector(".js-form");
const current_user = localStorage['ID'];
function say_hello(name) {
	hello.innerText = `Hello ${name}!`;
	localStorage['ID'] = name;
}
function init() {
	if (current_user)
		say_hello(localStorage['ID']);
	else {
		const username = document.createElement('input');
		username.placeholder = 'What is your name?'
		form.appendChild(username);
		form.addEventListener("submit", (event) => {
			say_hello(username.value);
			form.removeChild(username);
			event.preventDefault();
		}
		);
	}
}
init();
