


var answers = function (data, source) {
    // console.log(source)
    // var dataButton = document.getElementById(source+"-btn");
    var movieButton = document.getElementById("movie-btn");
    var swansonButton = document.getElementById("swanson-btn");
    movieButton.textContent = data.role;
    swansonButton.textContent = "Ron Swanson";
};



var getMovieQuote = function() {
    var movieUrl = 'https://movie-quote-api.herokuapp.com/v1/quote/'
    fetch(movieUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            answers(data, "movie");
        })
    })
}

var getSwansonQuote = function() {
    var ronUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
    fetch(ronUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            answers(data, "swanson");
        })
    })
}

var randomizer = function() {
    getSwansonQuote()
    getMovieQuote()
    var quoteTypeRandom = Math.random()

    if(quoteTypeRandom >= 0.5) {
        //displayMovieQuote();
    } else {
        //displayMovieQuote();
    }
}

var highscore = function() {

}


randomizer();


