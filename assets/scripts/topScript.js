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
  var monthTopSongs = $('.monthlySongDiv');
  $(".searchInfo").addClass("hide");
  $(".monthlyTopSongsDiv").removeClass("hide");
  for (var i = 0; i < 20; i++) {
   var monthlySongsDiv = $('<div>') ;
   monthlySongsDiv.addClass('row monthlySongDiv');
   var albumImg = $("<img>");
   albumImg.addClass("col s2 albumImg");
   albumImg.attr("src", "assets/pics/placeholder.png");
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

  // var albumID = data.tracks[i].albumId;
  // var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
  // var queryURL = `http://api.napster.com/v2.2/albums/${albumID}/images?apikey=${apiKey}`;

  // $.ajax({
  //   url: queryURL,
  //   method: "GET",
  // }).then(function (data) {
  //     // var albumImg = $("<img>");
  //     // albumImg.addClass("col s2 albumImg");
  //     if (data.images.length > 0 && data.images.length <= 5) {
  //       for (var i = 0; i < 5; i++) {
  //         if (data.images[i]) {
  //           albumImg.attr("src", data.images[i].url);
  //         }
  //       }
  //     } else {
  //       albumImg.attr("src", "assets/pics/placeholder.png");
  //     }
  //     // monthlySongsDiv.prepend(albumImg);
  //     // monthTopSongs.append(monthlySongsDiv);
  //   });
  }
}

function getTopArtists() {
  var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
  var queryURL = `http://api.napster.com/v2.2/artists/top?apikey=${apiKey}`;
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
  var monthlyArtistDiv = $('.monthlyArtistDiv');
  for (var i = 0; i < 20; i++) {
    var artistCardImgDiv = $("<div>");
    artistCardImgDiv.addClass("card-image");
    var artistImg = $("<img>");
    artistImg.attr("src", "assets/pics/rectangleplaceholder.png");
    var artistImgName = $("<span>");
    artistImgName.addClass("card-title");
    artistImgName.text(data.artists[i].name);
      var monthArtistCardDiv = $('<div>');
      monthArtistCardDiv.addClass('card col s6');
      var monthInfoDiv = $('<div>');
      monthInfoDiv.addClass('card-content');
      var monthArtistBio = $('<p>');
      if (data.artists[i].bios) {
          monthArtistBio.html(data.artists[i].bios[0].bio);
      } else {
          monthArtistBio.text('No Bio');
      }
      var monthArtistTopSongsDiv = $('<div>');
      monthArtistTopSongsDiv.addClass('card-action');
      var monthArtistTopSongBtn = $('<button>');
      monthArtistTopSongBtn.addClass('btn waves-effect waves-light topSongsBtn');
      monthArtistTopSongBtn.attr('data-artist', data.artists[i].id);
      monthArtistTopSongBtn.text('Top Songs');
      artistCardImgDiv.append(artistImg);
      artistCardImgDiv.append(artistImgName);
      monthInfoDiv.append(monthArtistBio);
      monthArtistTopSongsDiv.append(monthArtistTopSongBtn);
      monthArtistCardDiv.append(artistCardImgDiv);
      monthArtistCardDiv.append(monthInfoDiv);
      monthArtistCardDiv.append(monthArtistTopSongsDiv);
      monthlyArtistDiv.append(monthArtistCardDiv);
  }
}

function getTopAlbums() {
  var apiKey = "ZmJjMTczNmQtZjM2Yy00ZDI4LWJmOGYtZTE4MDRhNjQyZGMw";
  var queryURL = `http://api.napster.com/v2.2/albums/top?apikey=${apiKey}`;
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
  var monthAlbumDiv = $('.monthlyAlbumDiv');
  monthAlbumDiv.addClass('card col s3');
  for (var i = 0; i < 20; i++) {
     var topMonthlyAlbumDiv = $('<div>');
     topMonthlyAlbumDiv.addClass('card-image');
     var monthAlbumImg = $('<img>');
     monthAlbumImg.attr('src', 'assets/pics/placeholder.png');
     var monthImgName = $('<span>');
    monthImgName.addClass('card-title');
    monthImgName.text(data.albums[i].name);
    var monthAlbumCardDiv = $('<div>');
    monthAlbumCardDiv.addClass('card col s3')
    var monthAlbumInfoDiv = $('<div>');
    monthAlbumInfoDiv.addClass('card-content');
    var monthAlbumInfo = $('<p>');
    //if (data.albums[i].links[0].images) {
       //monthAlbumInfo.html(data.albums[i].links[0].images)
    //} else {
        //monthAlbumInfo.text('No Cover Art');
    //}
    var monthArtistAlbumName = $('<div>');
    monthArtistAlbumName.addClass('card-action');
    //monthAlbumDiv.append(monthAlbumImg);
    monthAlbumDiv.append(monthImgName);
    monthAlbumCardDiv.append(monthAlbumImg);
    
  }
}

$(document).on("click", ".topImgs", getApiType);
