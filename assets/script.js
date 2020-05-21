var songName = "";
var artistName = "";
var similarResultsArr = [];

var apiKeyYT = "AIzaSyD7zePgMXC4h9_g6fWu1mPQRf0HHpHFaww";

$(document).ready(function () {
  function getTrackArtistInfo(event) {
    event.preventDefault();
    songName = $(".songInput").val().trim();
    artistName = $(".artistInput").val().trim();

    $(".home-page").removeClass("active");
    $(".songInfoDiv").removeClass("hide");
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

  function renderSimilarSongs(data) {
    // console.log(data);
    for (var i = 0; i < 100; i++) {
      var trackArtistResult = {
        similarArtist: data.similartracks.track[i].artist.name,
        similarSong: data.similartracks.track[i].name,
      };
      // console.log("IN THE RENDERSIMILARSONGS FUNCTION. THE FOLLOWING ARE THE OBJECTS PUSHED TO ARRAY");
      // console.log(trackArtistResult);

      similarResultsArr.push(trackArtistResult);
    }
    getLastFMTrackInfo();
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
        getNapsterIDInfo(data);
      });
    }
  }
  // TODO // REVIEW DURING OFFICE HOURS
  function getNapsterIDInfo(data) {
    var artistName = data.track.artist.name;
    artistName = artistName.replace(/\W+/g, "-").toLowerCase(); // Stackoverflow
    var songName = data.track.name;
    songName = songName.replace(/\W+/g, "-").toLowerCase();
    var albumName = data.track.album.title;
    albumName = albumName.replace(/\W+/g, "-").toLowerCase();
    // console.log(`Artist Name:${artistName}`);
    // console.log(`Song Name:${songName}`);
    // console.log(`Album Name:${albumName}`);

    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var queryURL = `http://api.napster.com/v2.2/tracks/${artistName}/${albumName}/${songName}?apikey=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      // console.log(data);
      // console.log(queryURL);
      renderSongInfo(data);
    });
  }

  function renderSongInfo(data) {
    // console.log(data.tracks.length);
    $(".userSong").text(songName);
    $(".userArtist").text(artistName);

    if (data.tracks.length === 1) {
      // console.log(data);
      var songDiv = $("<div>");
      songDiv.addClass("row songDiv");
      var albumImg = $("<img>");
      albumImg.addClass("col s2 albumImg");
      var albumID = data.tracks[0].albumId;

      var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
      var queryURL = `http://api.napster.com/v2.2/albums/${albumID}/images?apikey=${apiKey}`;
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (data) {
        // console.log(data);
        if (data.images.length === 5) {
          albumImg.attr("src", data.images[4].url);
        } else if (data.images.length > 0 && data.images.length < 5) {
          albumImg.attr("src", data.images[2].url);
        } else {
          albumImg.attr("src", "assets/placeholder.png");
        }
      });

      var songInfoDiv = $("<div>");
      songInfoDiv.addClass("col s4 songInfoDiv");
      var lyricsDiv = $("<div>");
      lyricsDiv.addClass("col s3 lyricsDiv");
      var songPreviewDiv = $("<div>");
      songPreviewDiv.addClass("col s3 songPreviewDiv");
      var songData = $("<p>");
      var artistData = $("<p>");
      var albumData = $("<p>");
      songData.addClass("songData");
      artistData.addClass("artistData");
      albumData.addClass("albumData");
      var lyricsBtn = $("<button>");
      lyricsBtn.addClass("btn waves-effect waves-light lyricsBtn");
      lyricsBtn.attr("data-song", data.tracks[0].name);
      lyricsBtn.attr("data-artist", data.tracks[0].artistName);
      var songPreview = $("<audio>");
      songPreview.attr("controls", "controls");
      var songSource = $("<source>");
      songSource.attr("src", data.tracks[0].previewURL);
      songSource.attr("type", "audio/mp3");
      songData.text(data.tracks[0].name);
      artistData.text(`Artist: ${data.tracks[0].artistName}`);
      albumData.text(`Album: ${data.tracks[0].albumName}`);
      lyricsBtn.text("Lyrics");
      songInfoDiv.append(songData);
      songInfoDiv.append(artistData);
      songInfoDiv.append(albumData);
      lyricsDiv.append(lyricsBtn);
      songPreview.append(songSource);
      songPreviewDiv.append(songPreview);
      songDiv.append(albumImg);
      songDiv.append(songInfoDiv);
      songDiv.append(lyricsDiv);
      songDiv.append(songPreviewDiv);
      $(".songInfo").append(songDiv);
    }
  }

  function getLyrics() {
    var lyricsSong = $(this).attr("data-song");
    lyricsSong.replace(/\W+/g, "-").toLowerCase();
    var lyricsArtist = $(this).attr("data-artist");
    lyricsArtist.replace(/\W+/g, "-").toLowerCase();

    $.ajax({
      url: `https://api.lyrics.ovh/v1/${lyricsArtist}/${lyricsSong}`,
      method: "GET",
    }).then(function (data) {
      var lyricsInfo = {
        song: lyricsSong,
        artist: lyricsArtist,
        lyrics: data,
      };
      renderLyrics(lyricsInfo);
    });
  }

  function renderLyrics(lyricsInfo) {
    $(".songInfoDiv").addClass("hide");
    $(".searchInfo").addClass("hide");
    $(".lyricInfo").removeClass("hide");
    $(".songLyric").text(lyricsInfo.song);
    $(".artistLyric").text(lyricsInfo.artist);
    var lyrics = lyricsInfo.lyrics.lyrics;
    lyrics = lyrics.replace(/[\n\r]/g, "<p>");
    $(".lyric").html(lyrics);
  }

  function returnPage() {
    $(".songInfoDiv").removeClass("hide");
    $(".searchInfo").addClass("hide");
    $(".lyricInfo").addClass("hide");
  }

  $(".submitBtn").click(getTrackArtistInfo);
  $(document).on("click", ".lyricsBtn", getLyrics);
  $(".returnBtn").click(returnPage);
});
