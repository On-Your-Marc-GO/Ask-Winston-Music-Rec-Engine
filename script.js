$(".submitBtn").click(console.log('hello'));

// GET ARTIST INFO BY ARTIST NAME - NAPSTER API
// $.ajax({
//   url: 'http://api.napster.com/v2.2/artists/nas?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4',
//   method: 'GET'
// }).then(function(response){
//   console.log(response);
// });


// SEARCH FOR SIMILAR ARTISTS BY ARTIST NAME - LASTFM API
// var apiKey = 'da538ed1310540e471c7324ad05cf95f';
// var artistName = 'Korn';
// var queryURL = `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artistName}&api_key=${apiKey}&format=json`;

// $.ajax({
//   url: queryURL,
//   method: 'GET'
// }).then(function(response){
//   console.log(response);
// });


// SEARCH FOR SIMILAR SONGS BY SONG TITLE AND ARTIST NAME - LASTFM API
// var apiKey = 'da538ed1310540e471c7324ad05cf95f';
// var songName = 'Helena';
// var artistName = 'My Chemical Romance';
// var queryURL = `http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${artistName}&track=${songName}&api_key=${apiKey}&format=json`;

// $.ajax({
//   url: queryURL,
//   method: 'GET'
// }).then(function(response){
//   console.log(response);
// });


// GET LYRICS BY SONG TITLE AND ARTIST NAME - LYRICSOVH API
// $.ajax({
//   url: 'https://api.lyrics.ovh/v1/tupac/changes',
//   method: 'GET'
// }).then(function(response){
//   console.log(response);
// });