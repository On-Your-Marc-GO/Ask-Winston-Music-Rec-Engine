var monthlySongResults

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
  $(".searchInfo").addClass("hide");
  $(".monthlyTopSongsDiv").removeClass("hide");
   var monthlySongsDiv = $('<div>') ;
   monthlySongsDiv.addClass('row monthlySongDiv');
   var monthlyInfoDiv = $('<div>');
   monthlyInfoDiv.addClass('col s4 monthlyInfoDiv');
   var monthlySongLyrics = $('<div>');
   monthlySongLyrics.addClass('col s3 monthlyLyricsDiv');
   var monthlySongPreviewDiv = $('<div>');
   monthlySongPreviewDiv.addClass('col s3 songPreviewDiv');
   var monthSongData = $('<p>');
   var monthArtistData = $('<p>');
   var monthAlbumData = $('<p>');
   monthSongData.addClass('monthSongData');
   monthArtistData.addClass('monthArtistData');
   monthAlbumData.addClass('monthAlbumData');
   var lyricsBtn = $("<button>");
   lyricsBtn.addClass("btn modal-trigger waves-effect waves-light lyricsBtn");
   lyricsBtn.attr("data-song", data.tracks[0].name);
   lyricsBtn.attr("data-artist", data.tracks[0].artistName);
   lyricsBtn.attr("data-target", "modal1");
   var monthSongPreview = $("<audio>");
   monthSongPreview.attr("controls", "controls");
   var monthSongSource = $("<source>");
   monthSongSource.attr("src", data.tracks[0].previewURL);
   monthSongSource.attr("type", "audio/mp3");
   monthSongData.text(data.tracks[0].name.toUpperCase());
   monthArtistData.text(`Artist: ${data.tracks[0].artistName}`);
   monthAlbumData.text(`Album: ${data.tracks[0].albumName}`);
   lyricsBtn.text("Lyrics");
   monthlyInfoDiv.append(monthSongData);
   monthlyInfoDiv.append(monthArtistData);
   monthlyInfoDiv.append(monthAlbumData);
   monthlySongLyrics.append(lyricsBtn);
   monthSongPreview.append(monthSongSource);
   monthlySongPreviewDiv.append(monthSongPreview);
   monthlyInfoDiv.append(monthlyInfoDiv);
   monthlyInfoDiv.append(monthlySongLyrics);
   monthlyInfoDiv.append(monthlySongPreviewDiv); 
   $('.monthlySongDiv').append(monthlyInfoDiv, monthlyInfoDiv, monthlySongLyrics, monthlySongPreviewDiv);
   console.log(data);
}

function getTopArtists() {
  alert("getTopArtists");
}

function getTopAlbums() {
  alert("getTopAlbums");
}

$(document).on("click", ".topImgs", getApiType);
