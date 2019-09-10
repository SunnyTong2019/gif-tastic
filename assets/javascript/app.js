$(document).ready(function () {

    var topics = ["laughing", "mad", "excited", "sad", "omg", "shocked"];

    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("btn btn-info m-2 reaction-button");
            newButton.attr("data-reaction", topics[i]);
            newButton.text(topics[i]);
            $("#buttons-view").append(newButton);
        }
    }


    $("#add-reaction").on("click", function (event) {

        event.preventDefault();

        var newReaction = $("#new-reaction").val().trim();
        if (newReaction) { topics.push(newReaction); }

        $("#new-reaction").val("");

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
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=nvpSYO2uu9JG3Hhm812QZ64TnGz1YZ3a&q=" + reaction + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var results = response.data;
            console.log(results)

            $("#gifs-view").empty();

            for (var i = 0; i < results.length; i++) {
                var stillURL = results[i].images.fixed_height_still.url;
                var animateURL = results[i].images.fixed_height.url;
                var rating = results[i].rating;

                var newDiv = $("<div>");
                newDiv.addClass("p-2");

                var newImg = $("<img>");
                newImg.attr("src", stillURL);
                newImg.attr("data-still", stillURL);
                newImg.attr("data-animate", animateURL);
                newImg.attr("data-state", "still");
                newImg.addClass("gif");

                var ratingEle = $("<h6>");
                ratingEle.addClass("text-center mt-2 text-info");
                ratingEle.text("Rating: " + rating);

                newDiv.append(newImg);
                newDiv.append(ratingEle);

                $("#gifs-view").append(newDiv);
                $("#gifs-column").addClass("border");
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


});

