let header = document.querySelector('header');
let sectionContent = document.querySelector('.section-content');

// делаем хедер прилипшим при прокрутке страницы
window.onscroll = () => {
    let scrollTop = document.documentElement.scrollTop;

    if (scrollTop > header.offsetHeight) {
        header.classList.add('active');
        sectionContent.style.marginTop = header.offsetHeight + 'px';
    } else {
        header.classList.remove('active');
        sectionContent.style.marginTop = 0 + 'px';
    }
}

let navItems = document.querySelectorAll('.menu-items li');
let toggleBar = document.querySelector('#toggle-bar');
//let navigationArea = document.querySelector('.menu-items');
//let searchBtn = document.querySelector('#search-btn');
let searchBox = document.querySelector('.search-box');
let searchInput = document.querySelector('#elastic');

// реализуем поиск
searchInput.oninput = function(){
    let val = this.value.trim();   //обрезаем пробелы от пользователя
    let elasticItems = document.querySelectorAll('.movie-wrap');
    if(val != ''){
        elasticItems.forEach(function(elem){
            if(elem.innerText.search(val) == -1){
                elem.classList.add('hide')
            } else {
                elem.classList.remove('hide');
            }
            console.log(elem)
        })
    }
    else{
        elasticItems.forEach(function(elem){
            elem.classList.remove('hide');
        }) 
    }
}


// выбираем нужные элементы
let filmsCartBtn = document.querySelector('#icon-movie-cart');
let cartIconFilmsCounter = document.querySelector('#item-counter');
let moviesCartArea = document.querySelector('#films-cart-area');
let favoriteIcon = document.querySelectorAll('.add-to-favorite > span');
let cinemaCart = document.querySelector('.cinema-cart-area');
let cartContentMenu = document.querySelectorAll('.cart-menu-items h2');
let cartCloseButton = document.querySelector('.cart-close-btn button');
let featuredMovies = document.querySelectorAll('.movie-wrap');
let moviesImage = document.querySelectorAll('.film-img img');
let movieyear = document.querySelectorAll('.f-movie-year');
let movieRating = document.querySelectorAll('.rating');
let movieName = document.querySelectorAll('.movie-name');
let currentyear = document.querySelectorAll('.f-cur-year');
let addToCartBtn = document.querySelectorAll('.add-to-cart-btn p');
let cartContentArea = document.querySelector('.cart-contents-area');
let cinemaCartArea = document.querySelector('.cinema-cart-wrap');
let selectedFilmsContent = document.querySelector('.choisen-film-title');
let filmDetailsContent = document.querySelector('.movies-details-content');
let totalSelectedCounter = document.querySelector('#total-selected span');
let controllScrolling = document.querySelector('html');
let countSelectedItem = 0;


// массивы
let addedToCart = [];
let addedForWatch = [];
let newCartContent = [];
let addedToFavorite = [];
let newfavoriteItem = [];
let cinemaCartItem = [];



let isSelectedItemActive = true;
//открываем карточки
filmsCartBtn.addEventListener('click', ()=>{
    toggleBar.classList.remove('active-toggler');
    moviesCartArea.classList.add('active-cart');
    searchBox.classList.remove('active-search-box');
    controllScrolling.style.overflowY = 'hidden';
});
// закрываем избранное
cartCloseButton.addEventListener('click', () => {
    moviesCartArea.classList.remove('active-cart');
    controllScrolling.style.overflowY = 'auto';
});
// показываем выбранные фильмы
function displayMoviesHeader(countValue) {
    let totalFilmsItems = filmDetailsContent.children.length;
    if (countValue > 0 && isSelectedItemActive === true) {
       selectedFilmsContent.classList.add('active-movie-title');
    } else if (totalFilmsItems > 0 && isSelectedItemActive === true) {
        selectedFilmsContent.classList.add('active-movie-title');
    } else {
        selectedFilmsContent.classList.remove('active-movie-title');
    }
}

(function () {
    for (let i = 0; i < cartContentMenu.length; i++) {
        cartContentMenu[i].addEventListener('click', function () {
            for (let j = 0; j < cartContentMenu.length; j++) {
                cartContentMenu[j].classList.remove('active-cart-menu');
                totalFavoriteFilm.classList.remove('active-movies-counter');
            }
            cartContentMenu[i].classList.add('active-cart-menu');
        });
    }
})();

(function () {
    for (let i = 0; i < addToCartBtn.length; i++) {
        addedToCart[i] = false;
    }
})();

// рисуем карточки
function createSelectedFilmsContent(image, name, year, rating) {
    let newCartContent = document.createElement('div');
    newCartContent.setAttribute('class', 'cart-content');

    let newCartImageArea = document.createElement('div');
    newCartImageArea.setAttribute('class', 'cart-image-area');

    let newCartDetails = document.createElement('div');
    newCartDetails.setAttribute('class', 'cart-details');

    let newImage = document.createElement('img');
    newImage.src = image;

    newCartImageArea.appendChild(newImage);

    let newHeading2 = document.createElement('h2');
    newHeading2.textContent = 'Movie Details';

    let newPara = [];
    let newStrong = [];
    for (let i = 0; i < 6; i++) {
        newPara[i] = document.createElement('p');
        newStrong[i] = document.createElement('strong');
    }

    newStrong[0].textContent = 'Movie name: ';
    newStrong[1].textContent = 'Year: ';
    newStrong[2].textContent = 'Rating: ';

    for (let i = 0; i < 6; i++) {
        newPara[i].appendChild(newStrong[i]);
    }

    let newInput = document.createElement('input');
    newInput.setAttribute('type', 'number');
    let newSpan = [];
    for (let i = 0; i < 3; i++) {
    newSpan[i] = document.createElement('span');
    }

    newSpan[0].textContent = name;
    newSpan[1].textContent = year;
    newSpan[2].textContent = rating;
   
    for (let i = 0; i < 3; i++) {
        newPara[i].appendChild(newSpan[i]);
    }

    let  newWatchingButton = [];

    for (let i = 0; i < 2; i++) {
         newWatchingButton[i] = document.createElement('button');
    }

     newWatchingButton[0].textContent = 'To watch now';
     newWatchingButton[1].textContent = 'Remove Item';

     newWatchingButton[0].setAttribute('class', 'add-to-watch-btn');
     newWatchingButton[1].setAttribute('class', 'remove-item-btn');

    // доб в родительский контейнер
    newCartDetails.appendChild(newHeading2);

    for (let i = 0; i < 6; i++) {
        newCartDetails.appendChild(newPara[i]);
    }

    for (let i = 0; i < 2; i++) {
        newCartDetails.appendChild( newWatchingButton[i]);
    }

    newCartContent.appendChild(newCartImageArea);
    newCartContent.appendChild(newCartDetails);

    return newCartContent;
}

// переносим данные в карточки с первоначальных данных
function addItemsToSelectedFilms(movieIndex) {
    // задаем стиль кнопке после добавления
    addToCartBtn[movieIndex].style.background = 'light-blue';
    addToCartBtn[movieIndex].innerHTML = '<span class="icon-cart-arrow-down"></span> Added';
    let movieCartImage = moviesImage[movieIndex].src;
    let movieCartName = movieName[movieIndex].textContent;
    let movieCartyear = movieyear[movieIndex].textContent;
    let movieCartrating = movieRating[movieIndex].textContent;
    newCartContent[movieIndex] = createSelectedFilmsContent(movieCartImage, movieCartName, movieCartyear, movieCartrating)
    cartContentArea.insertBefore(newCartContent[movieIndex], cartContentArea.firstChild);
}

// удаляем по одному
function removeItemsToSelectedFilms(movieIndex) {
    addToCartBtn[movieIndex].style.background = '#blue';
    addToCartBtn[movieIndex].innerHTML = '<span class="icon-cart-plus"></span> Add to Watch List';
    cartContentArea.removeChild(newCartContent[movieIndex]);
}

// счетчик фильмов
function displayCartCounter(countValue) {
    if (countValue > 0) {
        cartIconFilmsCounter.classList.add('active-item-counter');
    } else {
        cartIconFilmsCounter.classList.remove('active-item-counter');
    }
}
// удаляем фильм
function removeSelectedFilms(movieIndex) {
    removeItemsToSelectedFilms(movieIndex);
    if (newfavoriteItem[movieIndex] !== undefined) {
        deactiveFavoriteItemAddToCartBtn(movieIndex);
    }
    --countSelectedItem;
    totalSelectedCounter.innerHTML = countSelectedItem;
    cartIconFilmsCounter.innerHTML = countSelectedItem;
    displayMoviesHeader(countSelectedItem);
    displayCartCounter(countSelectedItem);
    addedToCart[movieIndex] = false;
}


function controlSelectedFilmsItems(itemIndex) {
    if (addedToCart[itemIndex] === false) {
        addItemsToSelectedFilms(itemIndex);
        let selectedMovieRemoveBtn = newCartContent[itemIndex].children[1].children[8];

        selectedMovieRemoveBtn.addEventListener('click', () =>{
            removeSelectedFilms(itemIndex);
        })
            ++countSelectedItem;

            
            cartIconFilmsCounter.innerHTML = countSelectedItem;
        addedToCart[itemIndex] = true;
    } 

    let  addToListBtn = newCartContent[itemIndex].children[1].children[7];

     addToListBtn.addEventListener('click', () => {
        controlShoppingProductItems(itemIndex);
     })
     displayCartCounter(countSelectedItem);
};

(function () {
    for (let i = 0; i < addToCartBtn.length; i++) {

        // кликаем по кнопке добавить в watch list
        addToCartBtn[i].addEventListener('click', function () {
            controlSelectedFilmsItems(i);
        });
    }
})();





