const initialUrl = "https://rickandmortyapi.com/api/character/";

$(document).ready( () => {
  $("#characterName").on( "input", () => {
    let urlName = `${initialUrl}?name=${$("#characterName").val()}`
    $.startFunction(urlName);
  });
  $(".pageBtn").click(function () {
    $.startFunction($(this).attr("data-card"));
  });
});
let getUrlVars = url => {
  let vars = {};
  let hashes = url.slice(url.indexOf("?") + 1).split("&");
  for (let hash of hashes) {
    hash = hash.split("=");
    vars[hash[0]] = hash[1];
  }
  return vars;
}
let handlePagesButtons = (button, number) => {
  button.show();
  button[0].innerHTML = number;
  button.attr(
    "data-card",
    `https://rickandmortyapi.com/api/character/?page=${number}`,
  );
}
$.startFunction = resourceUrl => {
  $.get(
    resourceUrl,
    data => {
      const html = jQuery.map(data.results, card => {
        return (`<li><img src="${card.image}" alt="" /><div class="cardMeta"><h3>${card.name}</h3><button class="deleteBtn">Delete</button></div></li>`);
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
      $(".deleteBtn").click( function () {
        $(this).parent().parent().hide(400);
      });
      let pageUrl = parseInt(getUrlVars(resourceUrl).page);
      let currentPageNumber = pageUrl ? pageUrl : 1;
      $("#currentPageNumber")[0].innerHTML = currentPageNumber;
      if (currentPageNumber != data.info.pages) {
        handlePagesButtons($("#nextPageNumber"), currentPageNumber + 1);
      } else {
        $("#nextPageNumber").hide();
      }
      if (currentPageNumber !== 1) {
        handlePagesButtons($("#prevPageNumber"), currentPageNumber - 1);
      } else {
        $("#prevPageNumber").hide();
      }
      if (currentPageNumber <= parseInt(data.info.pages) - 2) { handlePagesButtons($("#lastPageNumber"), data.info.pages);
      } else {
        $("#lastPageNumber").hide();
      }
      if (currentPageNumber >= 3) {
        handlePagesButtons($("#firstPageNumber"), 1);
      } else {
        $("#firstPageNumber").hide();
      }
    },
    "json"
  ).fail( () => {
    $("#cardList")[0].innerHTML = "<li>There is nothing here</li>";
    $(".nextBtn").hide();
  });
};
$.startFunction(initialUrl);
