const displayCardNumber = 8;
let cardStartNumber = 1;
let resourceUrl = "https://rickandmortyapi.com/api/character/";
$(".nextBtn").click(function () {
  $.startFunction(parseInt($(this).attr("data-next-card")) + 1);
});
$(".prevBtn").click(function () {
  $.startFunction(parseInt($(this).attr("data-prev-card")) - displayCardNumber);
});
$("#search").submit(function (event) {
  $.startFunction(50);
});
$.startFunction = function (lastCard) {
  let cardRange = Array.from(
    { length: displayCardNumber },
    (_, i) => i + lastCard
  );
  $.get(
    resourceUrl + cardRange,
    function (data) {
      const html = jQuery.map(data, function (card) {
        return (
          '<li><img src="' +
          card.image +
          '"  alt="" /><div class="cardMeta">' +
          card.name +
          ' <button class="deleteBtn">Delete</button></div></li>'
        );
      });
      $("#cardList")[0].innerHTML = html.join("");
      $(".nextBtn").attr("data-next-card", cardRange[cardRange.length - 1]);
      if (lastCard < 9) {
        $(".prevBtn").hide();
      } else {
        $(".prevBtn").show();
        $(".prevBtn").attr("data-prev-card", cardRange[0]);
      }
      $(".deleteBtn").click(function () {
        $(this).parent().parent().slideUp();
      });
    },
    "json"
  );
};
$.startFunction(cardStartNumber);
