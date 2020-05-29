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

  // SEARCH FOR SIMILAR ARTISTS BY ARTIST NAME - LASTFM API
  function getSimilarArtists() {
    var apiKey = "da538ed1310540e471c7324ad05cf95f";
    var queryURL = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${artistName}&api_key=${apiKey}&format=json`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      if (data.error === 6 && data.message === "The artist you supplied could not be found") {
        $(".home-page").addClass("active");
        $(".searchInfo").removeClass("hide");
        $(".songInfoDiv").addClass("hide");
        $(".artistInfoDiv").addClass("hide");
        M.toast({ html: "Not a valid artist name. Try searching again!", classes: "toast" });
        return;
      } else {
        renderSimilarArtists(data);
      }
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
      var queryURL = `https://api.napster.com/v2.2/artists/${simArtistName}?apikey=${apiKey}`;
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (data) {
        if (data.artists.length === 1 && data.artists[0].bios) {
          renderArtistInfo(data);
        }
      });
    }
  }

  // USING NAPSTER ARTIST DATA, RENDER RELEVANT INFO ON PAGE
  function renderArtistInfo(data) {
    $(".userArtistChoice").text(artistName.toUpperCase());
    var artistCardDiv = $("<div>");
    artistCardDiv.addClass("card col s6");
    var artistInfoDiv = $("<div>");
    artistInfoDiv.addClass("card-content");
    var artistInfoBio = $("<p>");
    if (data.artists[0].bios) {
      artistInfoBio.html(data.artists[0].bios[0].bio);
    } else {
      monthArtistBio.text("No Bio");
    }
    var artistTopSongsDiv = $("<div>");
    artistTopSongsDiv.addClass("card-action");
    var artistTopSongsButton = $("<button>");
    artistTopSongsButton.addClass("btn waves-effect waves-light topSongsBtn");
    artistTopSongsButton.attr("data-artist", data.artists[0].id);
    artistTopSongsButton.text("Top Songs");
    artistInfoDiv.append(artistInfoBio);
    artistTopSongsDiv.append(artistTopSongsButton);
    artistCardDiv.append(artistInfoDiv);
    artistCardDiv.append(artistTopSongsDiv);

    var artistID = data.artists[0].id;
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var queryURL = `https://api.napster.com/v2.2/artists/${artistID}/images?apikey=${apiKey}`;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (imageData) {
      var artistCardImgDiv = $("<div>");
      artistCardImgDiv.addClass("card-image");
      var artistImg = $("<img>");
      var artistImgName = $("<span>");
      artistImgName.addClass("card-title");

      artistImgName.text(data.artists[0].name);

      if (imageData.images.length) {
        artistImg.attr("src", imageData.images[imageData.images.length - 1].url);
      } else {
        artistImg.attr("src", "assets/pics/placeholder.png");
      }

      artistCardImgDiv.append(artistImg);
      artistCardImgDiv.append(artistImgName);
      artistCardDiv.prepend(artistCardImgDiv);
      $(".userArtistDiv").append(artistCardDiv);
    });
  }

  // GET TOP SONGS BY ARTIST ID - NAPSTER API
  function getTopSongs() {
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var artistID = $(this).attr("data-artist");
    var queryURL = `https://api.napster.com/v2.2/artists/${artistID}/tracks/top?apikey=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      renderTopSongs(data);
    });
  }

  // USING NAPSTER DATA, RENDER TOP SONGS ON PAGE
  function renderTopSongs(data) {
    $(".songInfoDiv").addClass("hide");
    $(".searchInfo").addClass("hide");
    $(".artistInfoDiv").addClass("hide");
    $(".topSongsInfoDiv").removeClass("hide");
    $(".monthlyTopArtistsDiv").addClass("hide");
    $(".userTopSongH2").html(`<div><span class="artistChoice">${data.tracks[0].artistName}`);

    for (var i = 0; i < data.tracks.length; i++) {
      var topSongDiv = $("<div>");
      topSongDiv.addClass("row topSongDiv");
      var topSongAlbumImg = $("<div>");
      topSongAlbumImg.addClass("col s2 albumImg");
      topSongAlbumImg.attr("data-track", data.tracks[i].id);
      var topSongInfoDiv = $("<div>");
      topSongInfoDiv.addClass("col s4 songInfoDiv");
      var topSongLyricsDiv = $("<div>");
      topSongLyricsDiv.addClass("col s3 topSongLyricsDiv");
      var topSongPreviewDiv = $("<div>");
      topSongPreviewDiv.addClass("col s3 topSongPreviewDiv");
      var topSongData = $("<p>");
      var topSongAlbumData = $("<p>");
      topSongData.addClass("topSongData");
      topSongAlbumData.addClass("topSongAlbumData");
      var topSongLyricsBtn = $("<button>");
      topSongLyricsBtn.addClass("btn modal-trigger waves-effect waves-light lyricsBtn");
      topSongLyricsBtn.attr("data-song", data.tracks[i].name);
      topSongLyricsBtn.attr("data-artist", data.tracks[i].artistName);
      topSongLyricsBtn.attr("data-target", "modal1");
      var topSongPreview = $("<audio>");
      topSongPreview.attr("controls", "controls");
      var topSongSource = $("<source>");
      topSongSource.attr("src", data.tracks[i].previewURL);
      topSongSource.attr("type", "audio/mp3");
      topSongData.text(data.tracks[i].name.toUpperCase());
      topSongAlbumData.text(`Album: ${data.tracks[i].albumName}`);
      topSongLyricsBtn.text("Lyrics");
      topSongInfoDiv.append(topSongData);
      topSongInfoDiv.append(topSongAlbumData);
      topSongLyricsDiv.append(topSongLyricsBtn);
      topSongPreview.append(topSongSource);
      topSongPreviewDiv.append(topSongPreview);

      topSongDiv.append(topSongAlbumImg);
      topSongDiv.append(topSongInfoDiv);
      topSongDiv.append(topSongLyricsDiv);
      topSongDiv.append(topSongPreviewDiv);

      $(".userTopSongDiv").append(topSongDiv);

      var dataObj = {
        albumID: data.tracks[i].albumId,
        trackID: data.tracks[i].id,
      };
      getTopSongAlbumImg(dataObj);
    }
  }

  function getTopSongAlbumImg(dataObj) {
    var albumID = dataObj.albumID;
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var queryURL = `https://api.napster.com/v2.2/albums/${albumID}/images?apikey=${apiKey}`;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      if (data) {
        appendTopSongAlbumImg(data, dataObj);
      }
    });
  }

  function appendTopSongAlbumImg(data, dataObj) {
    var trackID = dataObj.trackID;
    var topSongAlbumImage = $("<img>");
    topSongAlbumImage.addClass("albumImg");
    if (data.images.length) {
      topSongAlbumImage.attr("src", data.images[data.images.length - 1].url);
    } else {
      topSongAlbumImage.attr("src", "assets/pics/placeholder.png");
    }
    var monthlyArtistDiv = $(`div[data-track='${trackID}']`);
    monthlyArtistDiv.append(topSongAlbumImage);
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

  $(".returnArtistsBtn").click(function () {
    $(".artistInfoDiv").removeClass("hide");
    $(".searchInfo").addClass("hide");
    $(".topSongsInfoDiv").addClass("hide");
    $(".userTopSongDiv").empty();
  });

  $(document).on("click", ".topSongsBtn", getTopSongs);
});
