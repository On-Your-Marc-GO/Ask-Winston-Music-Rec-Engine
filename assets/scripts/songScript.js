// DECLARE VARIABLES
var songName = "";
var artistName = "";
var similarResultsArr = [];

// NAV BAR COLLAPSE: MATERIALIZE
$(document).ready(function(){
  $('.sidenav').sidenav();
});

$(document).ready(function () {

  // GET SONG AND ARTIST INFO FROM FORM AND RESET IT
  function getSongArtistInfo() {
    songName = $(".songInput").val().trim();
    artistName = $(".artistInput").val().trim();
    $(".home-page").removeClass("active");
    $(".searchInfo").addClass("hide");
    $(".artistInfoDiv").addClass("hide");
    $(".songInfoDiv").removeClass("hide");
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

  // PUT SONG AND ARTIST INFO INTO AN OBJ AND PUSH IT TO ARRAY
  function renderSimilarSongs(data) {
    for (var i = 0; i < 100; i++) {
      var trackArtistResult = {
        similarArtist: data.similartracks.track[i].artist.name,
        similarSong: data.similartracks.track[i].name,
      };
      similarResultsArr.push(trackArtistResult);
    }
    getLastFMSongInfo();
  }

  // USE SONG AND ARTIST INFO TO GET MORE SONG DETAILS - LASTFM API
  function getLastFMSongInfo() {
    for (var i = 0; i < similarResultsArr.length; i++) {
      var simArtistName = similarResultsArr[i].similarArtist;
      var simSongName = similarResultsArr[i].similarSong;
      var apiKey = "da538ed1310540e471c7324ad05cf95f";
      var queryURL = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${apiKey}&artist=${simArtistName}&track=${simSongName}&format=json`;
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (data) {
        if (data.track && data.track.album && data.track.album.title) {
          getNapsterSongInfo(data);
        }
      });
    }
  }

  // USE SONG, ARTIST, AND ALBUM INFO TO GET EVEN MORE SONG DETAILS - NAPSTER API
  function getNapsterSongInfo(data) {
    var artistName = data.track.artist.name;
    artistName = artistName.replace(/\W+/g, "-").toLowerCase(); // Stackoverflow
    var songName = data.track.name;
    songName = songName.replace(/\W+/g, "-").toLowerCase();
    var albumName = data.track.album.title;
    albumName = albumName.replace(/\W+/g, "-").toLowerCase();
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var queryURL = `http://api.napster.com/v2.2/tracks/${artistName}/${albumName}/${songName}?apikey=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      if (data.tracks.length === 1) {
        renderSongInfo(data);
      }
    });
  }

  // USING NAPSTER SONG DATA, RENDER RELEVANT INFO ON PAGE
  function renderSongInfo(data) {
    $(".userSongDiv").html(`<div><span class="songChoice">${songName.toUpperCase()}</span><span class=artistChoice> by ${artistName}</span></div>`);
    var songDiv = $("<div>");
    songDiv.addClass("row songDiv");
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
    songData.text(data.tracks[0].name.toUpperCase());
    artistData.text(`Artist: ${data.tracks[0].artistName}`);
    albumData.text(`Album: ${data.tracks[0].albumName}`);
    lyricsBtn.text("Lyrics");
    songInfoDiv.append(songData);
    songInfoDiv.append(artistData);
    songInfoDiv.append(albumData);
    lyricsDiv.append(lyricsBtn);
    songPreview.append(songSource);
    songPreviewDiv.append(songPreview);
    songDiv.append(songInfoDiv);
    songDiv.append(lyricsDiv);
    songDiv.append(songPreviewDiv);

    var albumID = data.tracks[0].albumId;
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var queryURL = `http://api.napster.com/v2.2/albums/${albumID}/images?apikey=${apiKey}`;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
    var albumImg = $("<img>");
    albumImg.addClass("col s2 albumImg");
      if (data.images.length >= 5) {
        albumImg.attr("src", data.images[4].url);
      } else if (data.images.length > 0 && data.images.length < 5) {
        albumImg.attr("src", data.images[2].url);
      } else {
        albumImg.attr("src", "assets/pics/placeholder.png");
      }
      songDiv.prepend(albumImg);
      $(".songInfo").append(songDiv);
    });
  }

  // USING SONG AND ARTIST INFO GET LYRICS - LYRICSOVH API
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

  // USING LYRICSOVH DATA, RENDER RELEVANT INFO ON PAGE
  function renderLyrics(lyricsInfo) {
    $(".songInfoDiv").addClass("hide");
    $(".searchInfo").addClass("hide");
    $(".lyricInfo").removeClass("hide");
    $(".songLyric").text(lyricsInfo.song.toUpperCase());
    $(".artistLyric").text(lyricsInfo.artist);
    var lyrics = lyricsInfo.lyrics.lyrics;
    lyrics = lyrics.replace(/[\n\r]/g, "<p>");
    $(".lyric").html(lyrics);
  }

  // EVENT LISTENERS
  $("#songR1").click(function () {
    $(".songForm").removeClass("hide");
    $(".artistForm").addClass("hide");
  });

  $("#artistR2").click(function () {
    $(".songForm").addClass("hide");
    $(".artistForm").removeClass("hide");
  });

  $(".submitBtn").click(function (event) {
    event.preventDefault();
    if ($(".songInput").val() === "" && $(".artistInput").val() === "") {
      M.toast({ html: "Please add both song and artist information", classes: "toast" });
      return;
    } else if ($(".songInput").val() === "") {
      M.toast({ html: "Must include song title", classes: "toast" });
      return;
    } else if ($(".artistInput").val() === "") {
      M.toast({ html: "Must include artist or band name", classes: "toast" });
      return;
    } else {
      getSongArtistInfo();
    }
  });

  $(".goBackBtn").click(function () {
    $(".undefinedInputDiv").addClass('hide');
    $(".searchInfo").removeClass("hide");
  });

  $(document).on("click", ".lyricsBtn", getLyrics);

  $(".returnBtn").click(function () {
    $(".songInfoDiv").removeClass("hide");
    $(".searchInfo").addClass("hide");
    $(".lyricInfo").addClass("hide");
  });

})