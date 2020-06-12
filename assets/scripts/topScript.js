$(document).ready(function () {
  function getApiType() {
    $(".home-page").removeClass("active");
    var apiType = $(this).attr("data-type");
    if (apiType === "top songs") {
      getTopSongs();
    } else if (apiType === "top artists") {
      getTopArtists();
    } else {
      getTopAlbums();
    }
  }

  function getTopSongs() {
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var queryURL = `https://api.napster.com/v2.2/tracks/top?apikey=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      renderTopSongs(data);
    });
  }

  function renderTopSongs(data) {
    var monthTopSongs = $(".monthlySongDiv");
    $(".searchInfo").addClass("hide");
    $(".monthlyTopSongsDiv").removeClass("hide");
    for (var i = 0; i < 20; i++) {
      var monthlySongsDiv = $("<div>");
      monthlySongsDiv.addClass("row monthlySongDiv");
      var albumImg = $("<div>");
      albumImg.addClass("col s2 albumImgDiv");
      albumImg.attr("data-track", data.tracks[i].id);
      var monthlyInfoDiv = $("<div>");
      monthlyInfoDiv.addClass("col s4 songInfoDiv");
      var monthlySongLyrics = $("<div>");
      monthlySongLyrics.addClass("col s3 monthlyLyricsDiv");
      var monthlySongPreviewDiv = $("<div>");
      monthlySongPreviewDiv.addClass("col s3 songPreviewDiv");
      var monthSongData = $("<p>");
      var monthArtistData = $("<p>");
      var monthAlbumData = $("<p>");
      monthSongData.addClass("songData");
      monthArtistData.addClass("artistData");
      monthAlbumData.addClass("albumData");
      var lyricsBtn = $("<button>");
      lyricsBtn.addClass("btn modal-trigger waves-effect waves-light lyricsBtn");
      lyricsBtn.attr("data-song", data.tracks[i].name);
      lyricsBtn.attr("data-artist", data.tracks[i].artistName);
      lyricsBtn.attr("data-target", "modal1");
      var monthSongPreview = $("<audio>");
      monthSongPreview.attr("controls", "controls");
      var monthSongSource = $("<source>");
      monthSongSource.attr("src", data.tracks[i].previewURL);
      monthSongSource.attr("type", "audio/mp3");
      monthSongData.text(data.tracks[i].name.toUpperCase());
      monthArtistData.text(`Artist: ${data.tracks[i].artistName}`);
      monthAlbumData.text(`Album: ${data.tracks[i].albumName}`);
      lyricsBtn.text("Lyrics");
      monthlyInfoDiv.append(monthSongData);
      monthlyInfoDiv.append(monthArtistData);
      monthlyInfoDiv.append(monthAlbumData);
      monthlySongLyrics.append(lyricsBtn);
      monthSongPreview.append(monthSongSource);
      monthlySongPreviewDiv.append(monthSongPreview);
      monthlySongsDiv.append(albumImg);
      monthlySongsDiv.append(monthlyInfoDiv);
      monthlySongsDiv.append(monthlySongLyrics);
      monthlySongsDiv.append(monthlySongPreviewDiv);
      monthTopSongs.append(monthlySongsDiv);
      var dataObj = {
        albumID: data.tracks[i].albumId,
        trackID: data.tracks[i].id,
      };
      getImageData(dataObj);
    }
  }

  function getImageData(dataObj) {
    var albumID = dataObj.albumID;
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var queryURL = `https://api.napster.com/v2.2/albums/${albumID}/images?apikey=${apiKey}`;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      if (data) {
        appendImages(data, dataObj);
      }
    });
  }

  function appendImages(data, dataObj) {
    var trackID = dataObj.trackID;
    var albumImage = $("<img>");
    albumImage.addClass("albumImg");
    if (data.images.length) {
      albumImage.attr("src", data.images[data.images.length - 1].url);
    } else {
      albumImage.attr("src", "assets/pics/placeholder.png");
    }
    var monthlyArtistDiv = $(`div[data-track='${trackID}']`);
    monthlyArtistDiv.append(albumImage);
  }

  function getTopArtists() {
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var queryURL = `https://api.napster.com/v2.2/artists/top?apikey=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      renderTopArtists(data);
    });
  }
  function renderTopArtists(data) {
    $(".searchInfo").addClass("hide");
    $(".monthlyTopArtistsDiv").removeClass("hide");
    var monthlyArtistDiv = $(".monthlyArtistDiv");
    for (var i = 0; i < 20; i++) {
      var monthArtistCardDiv = $("<div>");
      monthArtistCardDiv.addClass("card col s6");
      var artistCardImgDiv = $("<div>");
      artistCardImgDiv.addClass("card-image");
      artistCardImgDiv.attr("data-artist", data.artists[i].id);
      var artistImgName = $("<span>");
      artistImgName.addClass("card-title");
      artistImgName.text(data.artists[i].name);
      var artistInfoDiv = $("<div>");
      artistInfoDiv.addClass("card-content");
      var monthArtistBio = $("<p>");
      if (data.artists[i].bios) {
        monthArtistBio.html(data.artists[i].bios[0].bio);
      } else {
        monthArtistBio.text("No Bio");
      }
      var monthArtistTopSongsDiv = $("<div>");
      monthArtistTopSongsDiv.addClass("card-action");
      var monthArtistTopSongBtn = $("<button>");
      monthArtistTopSongBtn.addClass("btn waves-effect waves-light artistTopSongsBtn");
      monthArtistTopSongBtn.attr("data-artist", data.artists[i].id);
      monthArtistTopSongBtn.text("Top Songs");
      artistCardImgDiv.append(artistImgName);
      artistInfoDiv.append(monthArtistBio);
      monthArtistTopSongsDiv.append(monthArtistTopSongBtn);
      monthArtistCardDiv.append(artistCardImgDiv);
      monthArtistCardDiv.append(artistInfoDiv);
      monthArtistCardDiv.append(monthArtistTopSongsDiv);
      monthlyArtistDiv.append(monthArtistCardDiv);
      getTopArtistImageData(data.artists[i].id);
    }
  }
  function getTopArtistImageData(artistID) {
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var queryURL = `https://api.napster.com/v2.2/artists/${artistID}/images?apikey=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      if (data) {
        appendTopArtistImages(data, artistID);
      }
    });
  }
  function appendTopArtistImages(data, artistID) {
    var artistImage = $("<img>");
    artistImage.addClass("artistImg");
    if (data.images.length) {
      artistImage.attr("src", data.images[data.images.length - 1].url);
    } else {
      artistImage.attr("src", "assets/pics/placeholder.png");
    }
    var monthlyArtistDiv = $(`div[data-artist='${artistID}']`);
    monthlyArtistDiv.prepend(artistImage);
  }

  function getArtistTopSongs() {
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var artistID = $(this).attr("data-artist");
    var queryURL = `https://api.napster.com/v2.2/artists/${artistID}/tracks/top?apikey=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      renderArtistTopSongs(data);
    });
  }

  function renderArtistTopSongs(data) {
    var artistTopSongs = $(".artistTopSongDiv");
    $(".monthlyTopArtistsDiv").addClass("hide");
    $(".artistTopSongsInfoDiv").removeClass("hide");
    $(".artistTopSongH2").html(`<div><span class="artistChoice">${data.tracks[0].artistName}`);
    for (var i = 0; i < data.tracks.length; i++) {
      var topSongDiv = $("<div>");
      topSongDiv.addClass("row topSongDiv");
      var topSongAlbumImg = $("<div>");
      topSongAlbumImg.addClass(`col s2 albumImgDiv${[i]}`);
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
      artistTopSongs.append(topSongDiv);
      var dataObj = {
        albumID: data.tracks[i].albumId,
        trackID: data.tracks[i].id,
      };
      getAlbData(dataObj);
    }
  }

  function getAlbData(dataObj) {
    var albumID = dataObj.albumID;
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var queryURL = `https://api.napster.com/v2.2/albums/${albumID}/images?apikey=${apiKey}`;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      if (data) {
        appendAlb(data, dataObj);
      }
    });
  }

  function appendAlb(data, dataObj) {
    var trackID = dataObj.trackID;
    var albumImage = $("<img>");
    albumImage.addClass("albumImg");
    if (data.images.length) {
      albumImage.attr("src", data.images[data.images.length - 1].url);
    } else {
      albumImage.attr("src", "assets/pics/placeholder.png");
    }
    var songTopArtistDiv = $(`div[data-track='${trackID}']`);
    songTopArtistDiv.append(albumImage);
  }

  function getTopAlbums() {
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var queryURL = `https://api.napster.com/v2.2/albums/top?apikey=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      renderTopAlbums(data);
    });
  }

  function renderTopAlbums(data) {
    $(".searchInfo").addClass("hide");
    $(".monthlyTopAlbumsDiv").removeClass("hide");
    var monthlyAlbumsDiv = $(".monthlyAlbumDiv");
    for (var i = 0; i < 20; i++) {
      var albumCardDiv = $("<div>");
      albumCardDiv.addClass("card col s3");
      var albumCardImgDiv = $("<div>");
      albumCardImgDiv.addClass("card-image album-image");
      albumCardImgDiv.attr("data-album", data.albums[i].id);
      var albumInfoDiv = $("<div>");
      albumInfoDiv.addClass("card-content album-content");
      var albumInfo = $("<p>");
      albumInfo.addClass("songData");
      albumInfo.text(data.albums[i].name.toUpperCase());
      var artistInfo = $("<p>");
      artistInfo.text(`by ${data.albums[i].artistName}`);
      var albumTopSongsDiv = $("<div>");
      albumTopSongsDiv.addClass("card-action");
      var albumTopSongsBtn = $("<button>");
      albumTopSongsBtn.addClass("btn waves-effect waves-light albumDetailsBtn");
      albumTopSongsBtn.attr("data-albums", data.albums[i].id);
      albumTopSongsBtn.text("GET TRACKS");
      albumInfoDiv.append(albumInfo);
      albumInfoDiv.append(artistInfo);
      albumTopSongsDiv.append(albumTopSongsBtn);
      albumCardDiv.append(albumCardImgDiv);
      albumCardDiv.append(albumInfoDiv);
      albumCardDiv.append(albumTopSongsDiv);
      monthlyAlbumsDiv.append(albumCardDiv);
      getTopAlbumImageData(data.albums[i].id);
    }
  }

  function getTopAlbumImageData(albumID) {
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var queryURL = `https://api.napster.com/v2.2/albums/${albumID}/images?apikey=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      if (data) {
        appendTopAlbumImages(data, albumID);
      }
    });
  }

  function appendTopAlbumImages(data, albumID) {
    var albumImage = $("<img>");
    albumImage.addClass("albumImg");
    if (data.images.length) {
      albumImage.attr("src", data.images[data.images.length - 1].url);
    } else {
      albumImage.attr("src", "assets/pics/placeholder.png");
    }
    var monthlyAlbumDiv = $(`div[data-album='${albumID}']`);
    monthlyAlbumDiv.prepend(albumImage);
  }

  function getAlbumDetails() {
    var albumId = $(this).attr("data-albums");
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var queryURL = `https://api.napster.com/v2.2/albums/${albumId}/tracks?apikey=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      renderAlbumDetails(data);
    });
  }

  function renderAlbumDetails(data) {
    $(".albumDetailsDiv").removeClass("hide");
    $(".monthlyTopAlbumsDiv").addClass("hide");
    var userAlbumChoice = $("<div>");
    userAlbumChoice.addClass("row");
    var albumInfo = $("<div>");
    albumInfo.addClass("col s8 albumInfo");
    var albumName = $("<p>");
    albumName.text(data.tracks[0].albumName.toUpperCase());
    albumName.addClass("row albumName");
    var artistName = $("<p>");
    artistName.addClass("row artistName");
    artistName.text(data.tracks[0].artistName);
    albumInfo.append(albumName);
    albumInfo.append(artistName);
    userAlbumChoice.append(albumInfo);
    var albumID = data.tracks[0].albumId;
    var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    var queryURL = `https://api.napster.com/v2.2/albums/${albumID}/images?apikey=${apiKey}`;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (data) {
      var albumImg = $("<img>");
      albumImg.addClass("col s4");

      if (data.images.length) {
        albumImg.attr("src", data.images[data.images.length - 1].url);
      } else {
        albumImg.attr("src", "assets/pics/placeholder.png");
      }

      userAlbumChoice.prepend(albumImg);
      $(".albumDetailsInfo").append(userAlbumChoice);
    });
    renderTrackDetails(data);
  }

  function renderTrackDetails(data) {
    var trackTable = $("<table>");
    var trackTableHead = $("<thead>");
    var trackRowHead = $("<tr>");
    var trackNameHead = $("<th>");
    var trackLyricsHead = $("<th>");
    var songPreviewHead = $("<th>");
    trackNameHead.text("Song Name");
    trackLyricsHead.text("Lyrics");
    trackLyricsHead.addClass("center-align");
    songPreviewHead.text("Song Preview");
    songPreviewHead.addClass("center-align");
    trackRowHead.append(trackNameHead);
    trackRowHead.append(trackLyricsHead);
    trackRowHead.append(songPreviewHead);
    trackTableHead.append(trackRowHead);
    var trackTableBody = $("<tbody>");

    for (var i = 0; i < data.tracks.length; i++) {
      var trackRowBody = $("<tr>");
      var trackName = $("<td>");
      var lyrics = $("<td>");
      lyrics.addClass("center-align");
      var lyricsBtn = $("<button>");
      lyricsBtn.addClass("btn modal-trigger waves-effect waves-light lyricsBtn lyricsAlbumBtn");
      lyricsBtn.attr("data-song", data.tracks[i].name);
      lyricsBtn.attr("data-artist", data.tracks[i].artistName);
      lyricsBtn.attr("data-target", "modal1");
      var songPreview = $("<td>");
      songPreview.addClass("center-align");
      var songPreviewAudio = $("<audio>");
      songPreviewAudio.addClass("audioAlbum");
      songPreviewAudio.attr("controls", "controls");
      var songSource = $("<source>");
      songSource.attr("src", data.tracks[i].previewURL);
      songSource.attr("type", "audio/mp3");
      trackName.text(data.tracks[i].name);
      lyricsBtn.text("Lyrics");
      lyrics.append(lyricsBtn);
      songPreviewAudio.append(songSource);
      songPreview.append(songPreviewAudio);
      trackRowBody.append(trackName);
      trackRowBody.append(lyrics);
      trackRowBody.append(songPreview);
      trackTableBody.append(trackRowBody);
    }
    trackTable.append(trackTableHead);
    trackTable.append(trackTableBody);
    $(".albumTrackTable").append(trackTable);
  }

  $(document).on("click", ".topImgs", getApiType);

  $(document).on("click", ".artistTopSongsBtn", getArtistTopSongs);

  $(document).on("click", ".albumDetailsBtn", getAlbumDetails);

  $(".returnArtistsTopBtn").click(function () {
    $(".monthlyTopArtistsDiv").removeClass("hide");
    $(".artistTopSongsInfoDiv").addClass("hide");
    $(".artistTopSongDiv").empty();
  });

  $(".returnBtn").click(function () {
    $(".albumDetailsDiv").addClass("hide");
    $(".monthlyTopAlbumsDiv").removeClass("hide");
    $(".albumDetailsInfo").empty();
    $(".albumTrackTable").empty();
  });
});
