// API Call to Query OMDB API
var apiKeyOMDB = "6927641b";
// This variable will change to encompass user input
var inputMovieTitle = "The+Dark+Knight";
var OMDBQueryURL = `http://www.omdbapi.com/?apikey=${apiKeyOMDB}&t=${inputMovieTitle}`;

$.ajax({
  url: OMDBQueryURL,
  method: "GET",
}).then(function (responseOMDB) {
  console.log(responseOMDB);
  console.log(responseOMDB.runtime);
});
