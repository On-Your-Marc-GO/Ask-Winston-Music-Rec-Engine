// DECLARE VARIABLES
var songName = "";
var artistName = "";
var similarResultsArr = [];

$(document).ready(function () {
  // GET ARTIST INFO FROM FORM AND RESET IT
  function getArtistInfo() {
    artistName = $(".onlyArtistInput").val().trim();
    $(".home-page").removeClass("active");
    $(".searchInfo").addClass("hide");
    $(".songInfoDiv").addClass("hide");
    $(".artistInfoDiv").removeClass("hide");
    getSimilarArtists();
    $(".onlyArtistInput").val("");
  }

  // SEARCH FOR SIMILAR SONGS BY ARTIST NAME - LASTFM API
  function getSimilarArtists() {
    var apiKey = "da538ed1310540e471c7324ad05cf95f";
    var queryURL = `http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artistName}&api_key=${apiKey}&format=json`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      renderSimilarArtists(data);
    });
  }

  // GET ARTIST INFO PUSH IT TO ARRAY
  function renderSimilarArtists(data) {
    for (var i = 0; i < 100; i++) {
      var similarArtist = data.similarartists.artist[i].name;
      similarResultsArr.push(similarArtist);
    }
    getNapsterArtistInfo();
  }

  // ARTIST INFO TO GET MORE ARTIST DETAILS - NAPSTER API
  function getNapsterArtistInfo() {
    for (var i = 0; i < similarResultsArr.length; i++) {
      var simArtistName = similarResultsArr[i];
      simArtistName = simArtistName.replace(/\W+/g, "-").toLowerCase();
      var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
      var queryURL = `http://api.napster.com/v2.2/artists/${simArtistName}?apikey=${apiKey}`;
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (data) {
        if (data.artists.length === 1 && data.artists[0].bios) {
          renderArtistInfo(data);
          // console.log(data);
        }
      });
    }
  }

  // USING NAPSTER ARTIST DATA, RENDER RELEVANT INFO ON PAGE
  function renderArtistInfo(data) {
    // console.log(data);
    var artistCardDiv = $("<div>");
    artistCardDiv.addClass("card col s6");

    var artistCardImgDiv = $("<div>");
    artistCardImgDiv.addClass("card-image");
    var artistImg = $("<img>");

    // Napster Artist Image API CALL
    var artistID = data.artists[0].id;
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var queryURL = `http://api.napster.com/v2.2/artists/${artistID}/images?apikey=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (imageData) {
      if (imageData.images.length >= 4) {
        artistImg.attr("src", imageData.images[3].url);
      } else if (imageData.images.length > 0 && imageData.images.length < 4) {
        artistImg.attr("src", imageData.images[1].url);
      } else {
        artistImg.attr("src", "https://via.placeholder.com/633x422");
      }
    });

    // console.log(data);
    var artistImgName = $("<span>");
    artistImgName.addClass("card-title");
    artistImgName.text(data.artists[0].name);

    // TODO: We can add more P tags and pull more info to put into the card if we like.
    var artistInfoDiv = $("<div>");
    artistInfoDiv.addClass("card-content");
    var artistInfoBio = $("<p>");
    artistInfoBio.text(data.artists[0].bios[0].bio);

    var artistTopSongsDiv = $("<div>");
    artistTopSongsDiv.addClass("card-action");

    var artistTopSongsButton = $("<button>");
    artistTopSongsButton.addClass("btn waves-effect waves-light topSongsBtn");
    artistTopSongsButton.attr("data-artist", data.artists[0].id);
    artistTopSongsButton.text("Top Songs");

    artistCardImgDiv.append(artistImg);
    artistCardImgDiv.append(artistImgName);

    artistInfoDiv.append(artistInfoBio);

    artistTopSongsDiv.append(artistTopSongsButton);

    artistCardDiv.append(artistCardImgDiv);
    artistCardDiv.append(artistInfoDiv);
    artistCardDiv.append(artistTopSongsDiv);

    $(".userArtistDiv").append(artistCardDiv);
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
  $(".submitArtistBtn").click(function (event) {
    event.preventDefault();
    if ($(".onlyArtistInput").val() === "") {
      M.toast({ html: "Must include artist or band name", classes: "toast" });
      return;
    } else {
      getArtistInfo();
    }
  });

  $("#artistR2").click(function () {
    $(".songForm").addClass("hide");
    $(".artistForm").removeClass("hide");
  });

  $(document).on("click", ".lyricsBtn", getLyrics);

  $(".returnArtistsBtn").click(function () {
    $(".artistInfoDiv").removeClass("hide");
    $(".topSongInfoDiv").addClass("hide");
    $(".searchInfo").addClass("hide");
    $(".lyricInfo").addClass("hide");
  });

  $(document).on("click", ".topSongsBtn", getTopSongs);
});
