var songName = "";
var artistName = "";

var similarResultsArr = [];

function getTrackArtistInfo(event) {
  event.preventDefault();
  songName = $(".songInput").val().trim();
  artistName = $(".artistInput").val().trim();

  $(".songInfo").removeClass("hide");
  $(".searchInfo").addClass("hide");

  getSimilarSongs();

  $(".songInput").val("");
  $(".artistInput").val("");
}

// SEARCH FOR SIMILAR SONGS BY SONG TITLE AND ARTIST NAME - LASTFM API
function getSimilarSongs() {
  var apiKey = "da538ed1310540e471c7324ad05cf95f";
  var queryURL = `http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=${artistName}&track=${songName}&api_key=${apiKey}&format=json`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data) {
    renderSimilarSongs(data);
  });
}

// Based on Similar Songs Received, Pull Track Info for each - LASTFM API
function getLastFMTrackInfo() {
  for (var i = 0; i < similarResultsArr.length; i++) {
    var simArtistName = similarResultsArr[i].similarArtist;
    var simSongName = similarResultsArr[i].similarSong;

    var apiKey = "da538ed1310540e471c7324ad05cf95f";
    var queryURL = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${simArtistName}&track=${simSongName}&format=json`;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      // console.log(data);
      getNapsterIDInfo(data);
    });
  }
}
// TODO // REVIEW DURING OFFICE HOURS
function getNapsterIDInfo(data) {
  var artistName = data.track.album.artist;
  var songName = data.track.name;
  var albumName = data.track.album.title;

  // console.log(`Artist Name:${artistName}`);
  // console.log(`Song Name:${songName}`);
  // console.log(`Album Name:${albumName}`);

  var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
  // var queryURL = `http://api.napster.com/v2.2/tracks/${artistName}/${albumName}/${songName}?apikey=${apiKey}`;
  var queryURL = `http://api.napster.com/v2.2/artists/${artistName}?apikey=${apiKey}`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data) {
    console.log(data);
  });
}

function renderSimilarSongs(data) {
  // console.log(data);
  for (var i = 0; i < 10; i++) {
    var trackArtistResult = {
      similarArtist: data.similartracks.track[i].artist.name,
      similarSong: data.similartracks.track[i].name,
    };
    // console.log("IN THE RENDERSIMILARSONGS FUNCTION. THE FOLLOWING ARE THE OBJECTS PUSHED TO ARRAY");
    // console.log(trackArtistResult);

    similarResultsArr.push(trackArtistResult);

    var songDiv = $("<div>");
    songDiv.addClass("row songDiv");
    // var artistImg = $("<img>");
    // artistImg.addClass("col-2 artistImg");
    var artistInfoDiv = $("<div>");
    artistInfoDiv.addClass("col-4 artistInfoDiv");
    var matchDiv = $("<div>");
    matchDiv.addClass("col-2 matchDiv");
    // var extraInfoDiv = $("<div>");
    // extraInfoDiv.addClass("col-4 extraInfoDiv");
    var songData = $("<p>");
    var artistData = $("<p>");
    var matchData = $("<p>");
    songData.text(data.similartracks.track[i].name);
    artistData.text(data.similartracks.track[i].artist.name);

    matchData.text((data.similartracks.track[i].match * 100).toFixed(2));
    // artistImg.attr("src", data.similartracks.track[i].image[1].#text);
    artistInfoDiv.append(songData);
    artistInfoDiv.append(artistData);
    matchDiv.append(matchData);
    // songDiv.append(artistImg);
    songDiv.append(artistInfoDiv);
    songDiv.append(matchDiv);
    $(".songInfo").append(songDiv);
  }

  getLastFMTrackInfo();
}

$(".submitBtn").click(getTrackArtistInfo);

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
