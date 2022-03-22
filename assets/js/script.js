var getMovieQuote = function() {
    var movieUrl = 'https://movie-quote-api.herokuapp.com/v1/quote/'
    fetch(movieUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    })
}

var getSwansonQuote = function() {
    var ronUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
    fetch(ronUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        })
    })
}

var randomizer = function() {
    var quoteTypeRandom = Math.random()

    if(quoteTypeRandom >= 0.5) {
        getSwansonQuote()
    } else {
        getMovieQuote()
    }
}

randomizer()