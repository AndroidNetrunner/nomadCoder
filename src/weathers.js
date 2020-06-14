const API_KEY = '39da994f851f7f331da8b45e8494e7f3';
const weather = document.querySelector('.js-weather')
function success(location) {
	localStorage["position"] = JSON.stringify({
		latitude: location.coords.latitude,
		longitude: location.coords.longitude
	}
	);
}

function getWeather() {
	const position = JSON.parse(localStorage["position"]);
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${API_KEY}&units=metric`)
		.then(function (response) {
			return response.json();
		})
		.then(function(data){
			weather.innerText = `${data.main.temp} @ ${data.name}`;
		}
		)
}

function fail() {
	console.log('위치 정보를 불러오는데 실패하였습니다.');
}

function getPosition() {
	navigator.geolocation.getCurrentPosition(success, fail);
}

function init() {
	if (!localStorage["position"])
		getPosition();
	getWeather();
}

init();
