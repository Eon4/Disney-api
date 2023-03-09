// script for disney api 

// loading screen 

let myPage=1;
const myAppElement=document.getElementById('myApp');

//entry point
loadingScreen();
setUpShowAllButton();
setupSearchForm();

// loading screen kaldes når vi henter data 
function loadingScreen() {
    myAppElement.innerHTML = "<h2>Loading...</h2>";

    }

    function setUpShowAllButton(){
        let showAallButton = document.getElementById('showAllButton');
        showAallButton.addEventListener('click',(e)=>{
            myPage = 1;
            fetchCharachterPage();

        });
    }

    function setupSearchForm() {

        let searchButton = document.getElementById('searchButton');

        searchButton.addEventListener('click',(e)=>{
            e.preventDefault();

            let searchInput = document.getElementById('searchInput');
            let myValue = searchInput.value;

            if (myValue) {
                console.log('vi har string');
            }
            else {
                alert('indtast i søgefeltet');
            }

        });

    }

    const myCharachtersElement = document.getElementById('charachterSelect');

    fetchCharachterPage("https://api.disneyapi.dev/characters");

    function fetchCharachterPage(chrachterId){
        fetch(chrachterId)
        .then (
            (response) => {
        // console.log('fetchCharachterPage');
        return response.json();
    }
)
.then((chrachterId) => {
    console.log(`fetchCharachterPage:`, chrachterId);
    setupCharachterSelection(chrachterId);
})
.catch((error) => {
    console.log(error);
});
    }

    // function fetchCharachterPage(){
    //     console.log('fetchCharachterPage');
    // }





// {
//     "_id": 308,
//     "films": ["Tangled", "Tangled: Before Ever After"],
//     "shortFilms": ["Tangled Ever After", "Hare Peace"],
//     "tvShows": ["Once Upon a Time", "Tangled: The Series"],
//     "videoGames": [
//       "Disney Princess Enchanting Storybooks",
//       "Hidden Worlds",
//       "Disney Crossy Road",
//       "Kingdom Hearts III"
//     ],
//     "parkAttractions": ["Celebrate the Magic", "Jingle Bell, Jingle BAM!"],
//     "allies": [],
//     "enemies": [],
//     "name": "Queen Arianna",
//     "imageUrl": "https://static.wikia.nocookie.net/disney/images/1/15/Arianna_Tangled.jpg",
//     "url": "https://api.disneyapi.dev/characters/308"
//   }