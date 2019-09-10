


var reactions = ["laughing", "mad", "excited", "sad", "omg", "shocked"];

function renderButtons() {

    $("#buttons-view").empty();

    for (var i = 0; i < reactions.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("btn btn-info m-2 reaction-button");
        newButton.attr("data-reaction", reactions[i]);
        newButton.text(reactions[i]);
        $("#buttons-view").append(newButton);
    }
}


$("#add-reaction").on("click", function (event) {

    event.preventDefault();

    var newReaction = $("#new-reaction").val().trim();

    if (newReaction) { reactions.push(newReaction); }

    renderButtons();
});


renderButtons();

/*
 If I use this line: $(".reaction-button").on("click", function () {
 button click function won't work for newly added button.

 So I changed to use this line instead: 
 $(document).on("click", ".reaction-button", function(){
*/
$(document).on("click", ".reaction-button", function () {
    var reaction = $(this).attr("data-reaction");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&q=" + reaction + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data;

        $("#gifs-view").empty();

        for (var i = 0; i < results.length; i++) {
            var stillURL = results[i].images.fixed_height_still.url;
            var animateURL = results[i].images.fixed_height.url;

            var newDiv = $("<div>");
            newDiv.addClass("p-2");
            var newImg = $("<img>");
            newImg.attr("src", stillURL);
            newImg.attr("data-still", stillURL);
            newImg.attr("data-animate", animateURL);
            newImg.attr("data-state", "still");
            newImg.addClass("gif");
            newDiv.append(newImg);
            $("#gifs-view").append(newDiv);
        }

    });

});

$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});




