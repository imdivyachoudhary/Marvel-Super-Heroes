// Retrieving the id of marvel clicked from session
var aboutMarvelId = sessionStorage.getItem("aboutMarvelId");

if (!aboutMarvelId) {
  window.location.href = "index.html";
}

sessionStorage.removeItem("aboutMarvelId");

var apikey = "711ae2113dc5b535e66dc2ecb1833930";
var private_key = "602efb43dfe796b9454e3e7776bcd160bbef90ac";

showAbout();

// Sending request to Marvel Api to Fetch details of the marvel clicked
function showAbout() {
  let url = "https://gateway.marvel.com/v1/public/characters/" + aboutMarvelId;

  let ts = Date.now();
  let hash = CryptoJS.MD5(ts + private_key + apikey).toString();

  $.get(url, { ts: ts, apikey: apikey, hash: hash }, function (data) {
    if (data.data.results.length === 0) {
      alert("No Information about the Marvel!!!");
    } else {
      let character = data.data.results[0];
      document.getElementById("marvel-name").innerText = character.name;
      let src = character.thumbnail.path + "." + character.thumbnail.extension;
      document.getElementById(
        "marvel-image"
      ).innerHTML = `<img src="${src}" class="card-img-top" alt="" />`;
      document.getElementById("marvel-description").innerText =
        character.description;

      // To display list of Comics
      let comics = character.comics.items;
      if (comics.length > 0) {
        let comicsCard = document.getElementById("comics-card");
        let comicsList = document.getElementById("comics-list");
        let listItems = "";
        comics.forEach((element) => {
          let name = element.name.split("#");
          listItems += `<li>${name[0]}</li>`;
        });
        comicsList.innerHTML = listItems;
        comicsCard.setAttribute("style", "display:block");
      }

      // To display list of Series
      let series = character.series.items;
      if (series.length > 0) {
        let seriesCard = document.getElementById("series-card");
        let seriesList = document.getElementById("series-list");
        let listItems = "";
        series.forEach((element) => {
          let name = element.name.split("#");
          listItems += `<li>${name[0]}</li>`;
        });
        seriesList.innerHTML = listItems;
        seriesCard.setAttribute("style", "display:block");
      }

      // To display list of Stories
      let stories = character.stories.items;
      if (stories.length > 0) {
        let storiesCard = document.getElementById("stories-card");
        let storiesList = document.getElementById("stories-list");
        let listItems = "";
        stories.forEach((element) => {
          let name = element.name.split("#");
          listItems += `<li>${name[0]}</li>`;
        });
        storiesList.innerHTML = listItems;
        storiesCard.setAttribute("style", "display:block");
      }

      // To display list of Events
      let events = character.events.items;
      if (events.length > 0) {
        let eventsCard = document.getElementById("events-card");
        let eventsList = document.getElementById("events-list");
        let listItems = "";
        events.forEach((element) => {
          let name = element.name.split("#");
          listItems += `<li>${name[0]}</li>`;
        });
        eventsList.innerHTML = listItems;
        eventsCard.setAttribute("style", "display:block");
      }
    }
  });
  // console.log(ts);
}
