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




const searchBtn = document.querySelector('.searchBtn')

searchBtn.addEventListener('click', isSearchButtonHandler)

function isSearchButtonHandler(event) {
    const searchBtn = document.querySelector('.searchBtn')
    const thisTemp = document.querySelector('.thisTemp')
    const thisCity = document.querySelector('.thisCity')

    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const cityName = searchBtn.previousElementSibling.value
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

    event.preventDefault()
    fetch(url)
        .then(response => response.json())
        .then(inf => {
            if (inf.cod === 200) {
                let temp = inf.main.temp-273.15;
                thisTemp.innerHTML = `${Math.floor(temp)} &deg`;
                thisCity.textContent = cityName;
            } else {
                alert(inf.message)
            }
    })
    .catch(err => alert(err));
}


// Добавление в избранное

const counter = 2;

const likeButton = document.querySelector('.like');
likeButton.addEventListener('click', isLikeButtonHandler);


// TODO Написать h2 button стили id к locations div

function isLikeButtonHandler(event) {

    event.preventDefault()

    const location = document.querySelector('.locations');
    const nameThisCity = document.querySelector('.thisCity');
    const isNameThisCity = nameThisCity.textContent;


    const div = document.createElement('div');
    div.classList.add('cityLike');
    div.textContent = isNameThisCity;
    location.append(div);


    counter = ++counter;

}



