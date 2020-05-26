function getApiType() {
  var apiType = $(this).attr("data-type");
  //console.log(apiType);
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
  var queryURL = `http://api.napster.com/v2.2/tracks/top?apikey=${apiKey}`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (data) {
    renderTopSongs(data);
  });
}

function renderTopSongs(data) {
  var artistName = data.response.tracks.artistName;
  $(".searchInfo").addClass("hide");
  $(".monthlyTopSongsDiv").removeClass("hide");
  $(".monthlySongDiv").append(artistName);
  console.log(data);

  $(".userTopSongDiv").html(`<div><span class="topSong">Top Songs by ${data.tracks[0].artistName}</span></div>`);

  for (var i = 0; i < data.tracks.length; i++) {
    var topSongDiv = $("<div>");
    topSongDiv.addClass("row topSongDiv");
    var topSongInfoDiv = $("<div>");
    topSongInfoDiv.addClass("col s4 topSongInfoDiv");
    var topSongLyricsDiv = $("<div>");
    topSongLyricsDiv.addClass("col s3 topSongLyricsDiv");
    var topSongPreviewDiv = $("<div>");
    topSongPreviewDiv.addClass("col s3 topSongPreviewDiv");
    var topSongData = $("<p>");
    var topSongAlbumData = $("<p>");
    topSongData.addClass("topSongData");
    topSongAlbumData.addClass("topSongAlbumData");
    var topSongLyricsBtn = $("<button>");
    topSongLyricsBtn.addClass("btn modal-trigger waves-effect waves-light topSongLyricsBtn");
    topSongLyricsBtn.attr("data-topSong", data.tracks[i].name);
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

    topSongDiv.append(topSongInfoDiv);
    topSongDiv.append(topSongLyricsDiv);
    topSongDiv.append(topSongPreviewDiv);

    // TODO: Logic to Include Top Track Album Image much like our similar song page
    // var topSongAlbumID = data.tracks[i].albumId;
    // var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
    // var topSongQueryURL = `http://api.napster.com/v2.2/albums/${topSongAlbumID}/images?apikey=${apiKey}`;

    // $.ajax({
    //   url: topSongQueryURL,
    //   method: "GET",
    // }).then(function (data) {
    //   var topSongAlbumImg = $("<img>");
    //   topSongAlbumImg.addClass("col s2 albumImg");
    //   if (data.images.length >= 5) {
    //     topSongAlbumImg.attr("src", data.images[4].url);
    //   } else if (data.images.length > 0 && data.images.length < 5) {
    //     topSongAlbumImg.attr("src", data.images[2].url);
    //   } else {
    //     topSongAlbumImg.attr("src", "assets/pics/placeholder.png");
    //   }
    //   topSongDiv.prepend(topSongAlbumImg);
    //   //  $(".songInfo").append(songDiv);
    //   // $(".userTopSongDiv").append(topSongDiv);
    // });

    $(".userTopSongDiv").append(topSongDiv);
  }
}

function getTopArtists() {
  alert("getTopArtists");
}

function getTopAlbums() {
  alert("getTopAlbums");
}

$(document).on("click", ".topImgs", getApiType);
