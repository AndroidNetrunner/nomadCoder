const body = document.querySelector('body');

function paintImage(number) {
	const image = new Image();
	image.src = `images/${number}.jpg`;
	body.appendChild(image);
	image.classList.add('background');
}

function randomNumber() {
	return Math.floor(Math.random() * 3);
}

function init() {
	paintImage(randomNumber());
}

init();
