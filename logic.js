var api = "http://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=dc6zaTOxFJmzC";

var searchName;

var q = "&q=";

//shuffle potential gifs
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//jquery to search for a new gif that will add new buttons to the #all-buttons div
$("#create-button").on("click", function(event) {

    event.preventDefault();

    var userSearch = $("#user-search").val();

    var newButton = $('<button>').attr('data-name', userSearch);

    newButton.attr('type', "button");

    newButton.attr('class', "b btn btn-info");

    newButton.text(userSearch);

    $('#all-buttons').append(newButton);

    // console.log(newButton.attr('data-name'));

});

// Event listener for our cat-button
$("#all-buttons").on("click", ".b", function() {

    //the next two lines are different
    searchName = $(this).attr("data-name");

    console.log(searchName);

    var qwery = q + searchName;
    // Storing our giphy API URL for a random image
    var queryURL = api + apiKey + qwery;

    // Perfoming an AJAX GET request to our queryURL

    $.ajax({
        url: queryURL,
        method: "GET"
    })

    // After the data from the AJAX request comes back
    .done(function(response) {

        var newData = shuffle(response.data);

        for (var i = 0; i < 10; i++) {

            var newGif = $('<img>').attr('src', newData[i].images.fixed_width.url);
            $('#gif-display').prepend(newGif);

        }

         


    });

   

    console.log(queryURL);

});
