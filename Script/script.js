// Смена вкладок

let now = document.querySelector('#tab-btn-1')
let details = document.querySelector('#tab-btn-2')
let forecast = document.querySelector('#tab-btn-3')


function displayOn() {
    let contentDivOne = document.querySelector('.content_1')
    let contentDivTwo = document.querySelector('.content_2')
    let contentDivThree = document.querySelector('.content_3')




    switch (this.id){
        case 'tab-btn-1':
            contentDivOne.id = 'active';
            contentDivTwo.id = '';
            contentDivThree.id = '';
            break;
        case 'tab-btn-2':
            contentDivTwo.id = 'active';
            contentDivOne.id = '';
            contentDivThree.id = '';
            break;
        case 'tab-btn-3':
            contentDivThree.id = 'active';
            contentDivTwo.id = '';
            contentDivOne.id = '';
            break;
    }
}



now.addEventListener('click', displayOn)
details.addEventListener('click', displayOn)
forecast.addEventListener('click', displayOn)


// Запрос погоды

const likeButton = document.querySelector('.like');
likeButton.addEventListener('click', isLikeButtonHandler);

const searchBtn = document.querySelector('.searchBtn');
searchBtn.addEventListener('click', isSearchButtonHandler);

const detailsTemp = document.querySelector('.detailsTemp');
const cloud = document.querySelector('.cloud')

function isSearchButtonHandler(event) {
    const searchBtn = document.querySelector('.searchBtn');
    const thisTemp = document.querySelector('.thisTemp');
    const thisCity = document.querySelector('.thisCity');
    const thisCityDetails = document.querySelector('.detailsCity');

    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const cityName = searchBtn.previousElementSibling.value
    thisCityDetails.textContent = cityName;
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

    localStorage.setItem('ThisCity', searchBtn.previousElementSibling.value);

    event.preventDefault();

    fetch(url)
        .then(response => response.json())
        .then(inf => {
            if (inf.cod === 200) {
                let temp = inf.main.temp-273.15;
                let feels_like = inf.main.feels_like-273.15;
                let weather = inf.weather[0].main;
                if (inf.weather[0].id === 800) {
                    cloud.style.backgroundImage = 'url(http://openweathermap.org/img/wn/01d@2x.png)';
                } else if (inf.weather[0].id === 801) {
                    cloud.style.backgroundImage = 'url(http://openweathermap.org/img/wn/02d@2x.png)';
                } else if (inf.weather[0].id === 802) {
                    cloud.style.backgroundImage = 'url(http://openweathermap.org/img/wn/03d@2x.png)';
                } else if (inf.weather[0].id === 803 || inf.weather[0].id === 804) {
                    cloud.style.backgroundImage = 'url(http://openweathermap.org/img/wn/04d@2x.png)';
                } else if (inf.weather[0].id > 199 && inf.weather[0].id < 233) {
                    cloud.style.backgroundImage = 'url(http://openweathermap.org/img/wn/11d@2x.png)';
                } else if (inf.weather[0].id > 299 && inf.weather[0].id < 322) {
                    cloud.style.backgroundImage = 'url(http://openweathermap.org/img/wn/09d@2x.png)';
                } else if (inf.weather[0].id > 499 && inf.weather[0].id < 505) {
                    cloud.style.backgroundImage = 'url(http://openweathermap.org/img/wn/10d@2x.png)';
                } else if (inf.weather[0].id === 511) {
                    cloud.style.backgroundImage = 'url(http://openweathermap.org/img/wn/13d@2x.png)';
                } else if (inf.weather[0].id > 519 && inf.weather[0].id < 532) {
                    cloud.style.backgroundImage = 'url(http://openweathermap.org/img/wn/09d@2x.png)';
                } else if (inf.weather[0].id > 599 && inf.weather[0].id < 623) {
                cloud.style.backgroundImage = 'url(http://openweathermap.org/img/wn/09d@2x.png)';
                } else if (inf.weather[0].id > 700 && inf.weather[0].id < 782) {
                cloud.style.backgroundImage = 'url(http://openweathermap.org/img/wn/50d@2x.png)';
                }
                let sunriseHours = (new Date(inf.sys.sunrise*1000)).getHours() < 10 ? "0" + (new Date(inf.sys.sunrise*1000)).getHours() : (new Date(inf.sys.sunrise*1000)).getHours()
                let sunsetHours = (new Date(inf.sys.sunset*1000)).getHours() < 10 ? "0" + (new Date(inf.sys.sunset*1000)).getHours() : (new Date(inf.sys.sunset*1000)).getHours()
                let sunriseMinutes = (new Date(inf.sys.sunrise*1000)).getMinutes() < 10 ? "0" + (new Date(inf.sys.sunrise*1000)).getMinutes() : (new Date(inf.sys.sunrise*1000)).getMinutes()
                let sunsetMinutes = (new Date(inf.sys.sunset*1000)).getMinutes() < 10 ? "0" + (new Date(inf.sys.sunset*1000)).getMinutes() : (new Date(inf.sys.sunset*1000)).getMinutes()
                thisTemp.innerHTML = `${Math.floor(temp)} &deg`;
                detailsTemp.innerHTML = `                     
                     <p class="detailsTemp">Temperature: ${Math.floor(temp)} &deg;<br>
                        Feels like: ${Math.floor(feels_like)} &deg;<br>
                        Weather: ${weather}<br>
                        Sunrise: ${sunriseHours}:${sunriseMinutes}<br>
                        Sunset: ${sunsetHours}:${sunsetMinutes}</p>`
                thisCity.textContent = cityName;
            } else {
                alert(inf.message)
            }
    })
    .catch(err => alert(err));

    const locationDiv = document.querySelectorAll('.cityLike');
    likeButton.style.backgroundImage = 'url(../Style/Shape.svg)';

    for (elem of locationDiv) {
        if (cityName === elem.firstElementChild.textContent) {
            likeButton.style.backgroundImage = 'url(../Style/ShapeLike.svg)';
            break;
            return;
        }
    }

}


// Добавление в избранное


let FavoriteCity = ['Moscow'];


let counter = 1;

function isLikeButtonHandler(event) {

    event.preventDefault()

    const location = document.querySelector('.locations');
    const nameThisCity = document.querySelector('.thisCity');
    const isNameThisCity = nameThisCity.textContent;
    const locationDiv = document.querySelectorAll('.cityLike')

    for (elem of locationDiv) {
        if (elem.firstElementChild.textContent === isNameThisCity) {
            alert('Данный город уже присутствует в избранном!');
            return;
            break;
        }
    }


    FavoriteCity.push(isNameThisCity);


    localStorage.setItem('FavoriteCity', JSON.stringify(FavoriteCity))
    localStorage.setItem('ThisCity', searchBtn.previousElementSibling.value)

    likeButton.style.backgroundImage = 'url(../Style/ShapeLike.svg)'

    const div = document.createElement('div');
    div.classList.add('cityLike');
    div.id = counter;
    counter = ++counter;
    const h2 = document.createElement('h2');
    h2.textContent = isNameThisCity;
    h2.addEventListener('click', isLikeToNow);
    div.append(h2);

    const button = document.createElement('button');
    button.classList.add('delete');
    button.addEventListener('click', isButtonDeleteHandler)
    div.append(button);

    location.append(div);


}

function addFavorite(item) {

    const location = document.querySelector('.locations');
    const div = document.createElement('div');
    div.classList.add('cityLike');
    div.id = counter;
    counter = ++counter;
    const h2 = document.createElement('h2');
    h2.textContent = item;
    h2.addEventListener('click', isLikeToNow);
    div.append(h2);

    const button = document.createElement('button');
    button.classList.add('delete');
    button.addEventListener('click', isButtonDeleteHandler)
    div.append(button);

    location.append(div);

    localStorage.setItem('FavoriteCity', JSON.stringify(FavoriteCity))

    localStorage.setItem('ThisCity', searchBtn.previousElementSibling.value)
}

// Удаление из избранного

function isButtonDeleteHandler() {
    const nameThisCity = document.querySelector('.thisCity');
    if (nameThisCity.textContent === this.previousElementSibling.textContent) {
        likeButton.style.backgroundImage = 'url(../Style/Shape.svg)'
    }

    const ThisFavoriteCity = FavoriteCity.indexOf(this.previousElementSibling.textContent, 0);
    FavoriteCity.splice(ThisFavoriteCity, 1)

    localStorage.setItem('FavoriteCity', JSON.stringify(FavoriteCity))

    this.parentElement.remove()


}

// Чтение из избранного

function isLikeToNow() {

    searchBtn.previousElementSibling.value = this.textContent;
    isSearchButtonHandler(event);

    likeButton.style.backgroundImage = 'url(../Style/ShapeLike.svg)'


}

window.onload = function() {
    FavoriteCity = JSON.parse(localStorage.getItem('FavoriteCity'));
    searchBtn.previousElementSibling.value = localStorage.getItem('ThisCity');
    FavoriteCity.forEach((item) => { addFavorite(item); })
    isSearchButtonHandler(event);

}




