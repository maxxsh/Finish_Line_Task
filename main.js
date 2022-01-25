const initialUrl = "https://rickandmortyapi.com/api/character/";

$(document).ready(function () {
  $("#characterName").on("input", function () {
    let urlName = initialUrl + "?name=" + $("#characterName").val();
    $.startFunction(urlName);
  });
  $(".pageBtn").click(function () {
    $.startFunction($(this).attr("data-card"));
  });
});

$.startFunction = function (resourceUrl) {
  console.log("vhod1");
  $.get(
    resourceUrl,
    function (data) {
      const html = jQuery.map(data.results, function (card) {
        return (
          '<li><img src="' +
          card.image +
          '"  alt="" /><div class="cardMeta"><h3>' +
          card.name +
          '</h3><button class="deleteBtn">Delete</button></div></li>'
        );
      });
      $("#cardList")[0].innerHTML = html.join("");

      if (data.info.next) {
        $(".nextBtn").show();
        $(".nextBtn").attr("data-card", data.info.next);
      } else {
        $(".nextBtn").hide();
      }
      if (data.info.prev) {
        $(".prevBtn").show();
        $(".prevBtn").attr("data-card", data.info.prev);
      } else {
        $(".prevBtn").hide();
      }
      $(".deleteBtn").click(function () {
        $(this).parent().parent().slideUp();
      });
    },
    "json"
  ).fail(function () {
    $("#cardList")[0].innerHTML = "<li>There is nothing here</li>";
    $(".nextBtn").hide();
  });
};
$.startFunction(initialUrl);
