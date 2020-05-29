function showInezBio() {
  $("#inezBio").removeClass("hide");
  $("#marcImage").addClass("hide");
  $("#ramonImage").addClass("hide");
  $("#inezImageCol").removeClass("col s4");
  $("#inezImageCol").addClass("col s12");
  $("button").removeClass("hide");
  $("h2").addClass("hide");
}

function showMarcBio() {
  $("#marcBio").removeClass("hide");
  $("#inezImage").addClass("hide");
  $("#ramonImage").addClass("hide");
  $("#marcImageCol").removeClass("col s4");
  $("#marcImageCol").addClass("col s12");
  $("button").removeClass("hide");
  $("h2").addClass("hide");
}

function showRamonBio() {
  $("#ramonBio").removeClass("hide");
  $("#inezImage").addClass("hide");
  $("#marcImage").addClass("hide");
  $("#ramonImageCol").removeClass("col s4");
  $("#ramonImageCol").addClass("col s12");
  $("button").removeClass("hide");
  $("h2").addClass("hide");
}

function meetOtherDeveloper() {
  $("#inezImage").removeClass("hide");
  $("#marcImage").removeClass("hide");
  $("#ramonImage").removeClass("hide");

  $("#inezImageCol").removeClass();
  $("#inezImageCol").addClass("col s4");
  $("#ramonImageCol").removeClass();
  $("#ramonImageCol").addClass("col s4");
  $("#marcImageCol").removeClass();
  $("#marcImageCol").addClass("col s4");

  $("#ramonBio").addClass("hide");
  $("#marcBio").addClass("hide");
  $("#inezBio").addClass("hide");

  $("button").addClass("hide");

  $("h2").removeClass("hide");
}

$("#inezImage").click(function () {
  showInezBio();
});
$("#marcImage").click(function () {
  showMarcBio();
});
$("#ramonImage").click(function () {
  showRamonBio();
});
$("button").click(function () {
  meetOtherDeveloper();
});
