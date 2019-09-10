$(document).ready(function () {


    var reactions = ["laughing", "mad", "excited", "sad", "omg", "shocked"];

    function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < reactions.length; i++) {
            var a = $("<button>");
            a.addClass("btn btn-info m-2 reaction-button");
            a.attr("data-reaction", reactions[i]);
            a.text(reactions[i]);
            $("#buttons-view").append(a);
        }
    }


    $("#add-reaction").on("click", function (event) {

        event.preventDefault();

        var newReaction = $("#new-reaction").val().trim();

        if (newReaction) { reactions.push(newReaction); }

        renderButtons();
    });


    renderButtons();


   

});
