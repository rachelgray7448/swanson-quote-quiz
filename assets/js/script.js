allScores = [];1
currentScore = 0


var answers = function (data, source) {
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
    if (answers = correct) {
        currentScore = currentScore + 10;
    }
    else {
    }
};



var endGame = function() {
    for (i=0; i < allScores.length; i ++) {
        var scoreList = document.getElementById("score-list");
        var listEl = document.createElement('li');
        listEl.textContent = currentScore;
        scoreList.appendChild(listEl);
    }
};

// highscore();

//endGame();

randomizer();


