// SCRIPT FOR DISNEY API 

let myPage = 1;
const myAppElement = document.getElementById('myApp');

// ENTRY POINT
loadingScreen();
setUpShowAllButton();
setupSearchForm();
fetchOneCharacter(4703);


//FETCH FUNCTION FOR AT HENTE DATA OM EN KARAKTER DER ER SØGT PÅ
function fetchOneCharacter(myId) {
    let URI = `https://api.disneyapi.dev/characters/${myId}`

    fetch(URI).then((response) => {
        //console.log(response);

        if (response.ok) {
            return response.json();
        } else {
            alert("api error du får lige mickey mouse");
            fetchOneCharacter(4703);
        }



    }).then((data) => {

        //console.log(data);
        showCharacter(data);
//ERROR MESSAGE
    }).catch((err) => {

        console.error(err.message);

    });

}

function showCharacter(myData) {
    //  myAppElement
    console.log(myData.name);

    let myFilms = '<h3>Films:</h3>';
    myData.films.map((film) => {
        myFilms += `${film}, `
    }
    );


    let myTvShows = '<h3>TV Shows:</h3>';
    myData.tvShows.map((show) => {
        myTvShows += `${show}, `
    }
    );



    let myHTML = `<h2>${myData.name}</h2><img src="${myData.imageUrl}"><p>${myFilms}</p><p>${myTvShows}</p>`;
    myAppElement.innerHTML = myHTML;

}

//LOADING SCREEN KALDES NÅR VI HENTER DATA
function loadingScreen() {
    myAppElement.innerHTML = "<h2>Loading...</h2>";
}

//FUNKTION FOR VIS ALLE KNAP SOM HENTER ALLE DATA
function setUpShowAllButton() {

    let showAllButton = document.getElementById('showAllButton');
    showAllButton.addEventListener('click', (e) => {
        myPage = 1;
        fetchAllCharacters();
    });
}


//FUNKTION FOR VORES FORM MED SØGEFUNKTION
function setupSearchForm() {

    let searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();

        let searchInput = document.getElementById('searchInput');
        let myValue = searchInput.value;

        if (myValue) {
            console.log('Vi har string' + myValue);
            fetchSearch(myValue);
        }
        else {
            alert('Indtast i søgefelt.');
        }

    });

}


//FETCHER KARAKTERE PAGE
function fetchCharacterPage() {
    console.log('fetchCharacterPage');
}


//FETCH SØGERESULTAT
function fetchSearch(myName) {
    let URI = `https://api.disneyapi.dev/character?name=${myName}`


    fetch(URI).then((response) => {
        //console.log(response);

        if (response.ok) {
            return response.json();
        } else {
            alert("api error du får lige mickey mouse");
            fetchOneCharacter(4703);

        }



    }).then((data) => {

        console.log(data);
        showSearch(data.data);

    }).catch((err) => {

        console.error(err.message);

    });

}

//FUNKTION SOM VISER SØGERESULTATET MED BILLEDE OG NAVN
function showSearch(myData) {

    let myHTML = '';

    myData.map((myCharacter) => {
        myHTML += `<h3>${myCharacter.name}</h3><img src="${myCharacter.imageUrl}"></br>`;

    });

    myAppElement.innerHTML = myHTML;
}


//HENTER ALLE KARAKTERE
function fetchAllCharacters() {

    let URI = `https://api.disneyapi.dev/characters?page=${myPage}`

    fetch(URI).then((response) => {
        //console.log(response);

        if (response.ok) {
            return response.json();
        } else {
            alert("api error du får lige mickey mouse");
            fetchOneCharacter(4703);

        }

    }).then((data) => {

        console.log(data);

        showAll(data.data);

    }).catch((err) => {
        console.error(err.message);

    });

}
//VISER ALLE DATA
function showAll(myData) {

    myAppElement.innerHTML = "";
    makePageButtons();

    let myHTML = '';

    myData.map((myCharacter) => {
        myHTML += `<h3>${myCharacter.name}</h3><img src="${myCharacter.imageUrl}"></br>`;

    });

    myAppElement.innerHTML += myHTML;
    makePageButtons();
}
//FUNKTION FOR KNAPPER MED NEXT OG PREV
function makePageButtons() {

    let prevButton = document.createElement('button');
    prevButton.innerText = 'prev';
    prevButton.addEventListener('click', (e) => {
        myPage--;
        if (myPage < 1) {
            myPage = 1;
        }
        fetchAllCharacters();
    });

    let nextButton = document.createElement('button');
    nextButton.innerText = 'next';
    nextButton.addEventListener('click', (e) => {
        myPage++;
        if (myPage >= 149) {
            myPage = 149;
        }
        fetchAllCharacters();
    });
    myAppElement.appendChild(prevButton);
    myAppElement.appendChild(nextButton);

}




