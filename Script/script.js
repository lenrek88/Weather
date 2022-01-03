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

let counter = 1;

const deleteButton = document.querySelector('.delete');
const cityLikeName = document.querySelector('.cityLikeName')
deleteButton.addEventListener('click', isButtonDeleteHandler);
cityLikeName.addEventListener('click', isLikeToNow)


function isLikeButtonHandler(event) {

    event.preventDefault()

    const location = document.querySelector('.locations');
    const nameThisCity = document.querySelector('.thisCity');
    const isNameThisCity = nameThisCity.textContent;
    const locationDiv = document.querySelectorAll('.cityLike')

    for (elem of locationDiv) {
        if (elem.firstElementChild.textContent === isNameThisCity) {
            console.log(elem.firstElementChild.textContent)
            alert('Данный город уже присутствует в избранном!');
            return;
            break;
        }
    }

    likeButton.style.backgroundImage = 'url(../Style/ShapeLike.svg)'

    console.log(elem.firstElementChild.textContent)
    const div = document.createElement('div');
    div.classList.add('cityLike');
    div.id = counter;            counter = ++counter;

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

// Удаление из избранного

function isButtonDeleteHandler() {
    const nameThisCity = document.querySelector('.thisCity');
    if (nameThisCity.textContent === this.previousElementSibling.textContent) {
        likeButton.style.backgroundImage = 'url(../Style/Shape.svg)'
    }

    this.parentElement.remove()


}

// Чтение из избранного

function isLikeToNow() {

    searchBtn.previousElementSibling.value = this.textContent;
    isSearchButtonHandler(event);

    likeButton.style.backgroundImage = 'url(../Style/ShapeLike.svg)'


}





