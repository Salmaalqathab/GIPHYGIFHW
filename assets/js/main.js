var giphyKey = "S6Z5O62MwY3uwrI6cZChVj9JdQZqoHvK";
var topics = [
    "scooter",
    "bike",
    "skateboard",
    "rollerblades",
    "basketball",
    "football",
    "soccer"
];

$(document).ready(function() {
    createButtons();
    $(document).on("click", ".gifTopicButton", function() {
        giphy($(this).text());
    });
});

$("#addTopicButton").on("click", function(e) {
    e.preventDefault();
    var inputVal = $("#addTopic").val();
    if (inputVal != "" && topics.indexOf(inputVal) == -1) {
        topics.push(inputVal);
        createButtons();
        giphy(inputVal);
    }
});
function createButtons() {
    $("#gifButtons").empty();
    for (var i = 0; i < topics.length; i++) {
        var topicButton = $("<button>").
            text(topics[i]).
            addClass("gifTopicButton");
        $("#gifButtons").append(topicButton);
    }
}

function createGifs(res) {
    var gifs = $("#giphyGifs");
    gifs.empty();
    for (var i = 0; i < res.data.length; i++) {
        var rating = res.data[i].rating;
        var img = $("<img>").
            attr({
                "src": res.data[i].images.fixed_height_still.url,
                "data-still": res.data[i].images.fixed_height_still.url,
                "data-dynamic": res.data[i].images.fixed_height_downsampled.url
            }).
            addClass("gifImage");
        if (rating && img) {
            var gifContainer = $("<div>");
            var giphyImage = $("<div>").append(img);
            var ratingText = $("<div>").append(`${"Rating: " + "<b>"}${rating}</b>`);
            gifContainer.append(giphyImage);
            gifContainer.append(ratingText);
            gifs.append(gifContainer);
            gifs.append("<br>");
        }
    }
}

function giphy(search) {
    var url = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${giphyKey}&limit=10`;
    $.ajax({
        url,
        "type": "GET",
        success(res) {
            createGifs(res);
            // console.log(res);
        }
    });
}

$(document).on("click", ".gifImage", function() {
    if ($(this).attr("src") == $(this).attr("data-still")) {
        $(this).attr("src", $(this).attr("data-dynamic"));
    } else {
        $(this).attr("src", $(this).attr("data-still"));
    }
});