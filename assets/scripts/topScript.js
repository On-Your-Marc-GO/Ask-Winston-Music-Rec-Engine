function getApiType() {
    var apiType = $(this).attr('data-type');
    //console.log(apiType);
    if (apiType === "top songs") {
        getTopSongs();
    } else if (apiType === 'top artists') {
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
        method: 'GET',
    }).then(function (data) {
        renderTopSongs(data);
    });
}

function renderTopSongs(data) {
    var artistName = data.response.tracks.artistName;
    $('.searchInfo').addClass('hide');
    $('.monthlyTopSongsDiv').removeClass('hide');
    $('.monthlySongDiv').append(artistName);
    console.log(data);
} 

function getTopArtists() {
    alert("getTopArtists");
}

function getTopAlbums() {
    alert("getTopAlbums");
}

$(document).on("click", ".topImgs", getApiType);