


var answers = function (data) {
    var answerButtons = document.getElementById("answer-btn");
    var swansonButton = document.getElementById("swanson-btn");
    answerButtons.textContent = data.role;
    swansonButton.textContent = "Ron Swanson";
};

var getMovieQuote = function() {
    var movieUrl = 'https://movie-quote-api.herokuapp.com/v1/quote/'
    fetch(movieUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            answers(data);
        })
    })
}

var getSwansonQuote = function() {
    var ronUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
    fetch(ronUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
            answers(data);
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

randomizer();


