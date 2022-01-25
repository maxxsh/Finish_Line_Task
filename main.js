const initialUrl = "https://rickandmortyapi.com/api/character/";

$.startFunction = function (resourceUrl) {
  $.get(
    resourceUrl,
    function (data) {
      const html = jQuery.map(data.results, function (card) {
        return (
          '<li><img src="' +
          card.image +
          '"  alt="" /><div class="cardMeta">' +
          card.name +
          ' <button class="deleteBtn">Delete</button></div></li>'
        );
      });
      // add new elements to HTML DOM
      $("#cardList")[0].innerHTML = html.join("");
      // delete bottons
      $(".deleteBtn").click(function () {
        $(this).parent().parent().slideUp();
      });
      // page buttons
      if (data.info.next == null) {
        $(".prevBtn").hide();
      } else {
        $(".prevBtn").show();
        $(".nextBtn").attr("data-card", data.info.next);
      }
      if (data.info.prev == null) {
        $(".prevBtn").hide();
      } else {
        $(".prevBtn").show();
        $(".prevBtn").attr("data-card", data.info.prev);
      }
      $(".pageBtn").click(function () {
        $.startFunction($(this).attr("data-card"));
      });
      // filter
      $("#characterName").on("input", function () {
        let urlName = initialUrl + "?name=" + $("input").val();
        $.startFunction(urlName);
      });
    },
    "json"
  );
};
$.startFunction(initialUrl);
