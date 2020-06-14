const time_now = document.querySelector(".js-clock");

function clock() {
	const time = new Date();
	const current_hour = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
	const current_minute = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
	const current_second = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
	time_now.innerText = `${current_hour} : ${current_minute} : ${current_second}`;
}
clock();
setInterval(clock,1000);
