// links to api's
var ronUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
var movieUrl = 'https://movie-quote-api.herokuapp.com/v1/quote/'

var allScores = [];
var currentScore = 0;

// time function starts at whatever starting mins is and clears at 0
const startingMins = 1
let time = startingMins * 60
var countdownEl = document.getElementById('countdown')

var swansonButtonEl = document.getElementById('swanson-btn')
var movieButtonEl = document.getElementById('movie-btn')
var displayedQuoteEl = document.getElementById('quote-display')
var highscoreHeader = document.getElementById("highscore-header")
var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')



// START OF FUNCTIONS //

function updateCountdown() {
    const minutes = Math.floor(time/60)

    // annoying way of displaying seconds properly
    let seconds = time % 60
    seconds = seconds < 10 ? '0' + seconds : seconds

    // if time is remaining, show it in the element and reduce it
    if (time >= 0) {
        countdownEl.innerHTML = `${minutes}:${seconds}`
        time --
    // else clear the countdown    
    } else {
        endGame();

    }
}

// main function that pulls apis and assigns values to quote and answer fields
var getQuotes = function() {

    var quoteTypeRandom = Math.random()

    if(quoteTypeRandom >= 0.5) { // ron quote displayed

        //fetch swanson api and update displayed quote
        fetch(ronUrl).then(function(response) {
            response.json().then(function(data) {
                displayedQuoteEl.textContent = data[0]

                // experimental correct class add. need to be able to evaluate it. should probs switch to jquery
                swansonButtonEl.classList.add('correct')
                swansonButtonEl.addEventListener('click', function(event) {
                    console.log('swanson button worked')
                })
            })
        })

        //fetch movie api and update movie button
        fetch(movieUrl).then(function(response) {
            response.json().then(function(data) {
                movieButtonEl.textContent = data.role
            })
        })

    } else { // movie quote is displayed

        // fetch movie api and update displayed quote AND movie button
        fetch(movieUrl).then(function(response) {
            response.json().then(function(data) {               
                displayedQuoteEl.textContent = data.quote
                movieButtonEl.textContent = data.role

                // experimental correct class add. need to be able to evaluate it. should probs switch to jquery
                movieButtonEl.classList.add('correct')
                movieButtonEl.addEventListener('click', function(event) {
                    console.log('movie button worked')
                    answers(data);
                })
            })
        })
    }
    
}

function startGame() {
    $(highscoreHeader).toggle("hide")
    swansonButtonEl.textContent = "Ron Swanson";

    //start the countdown
    setInterval(updateCountdown, 1000)

    // hide the start button,
    $(startButton).toggle('hide');

    // pull the apis and populate info
    getQuotes()  
}

function selectAnswer(event) {    
    var selectedButton = event.target
    var correct = selectedButton.dataset.correct
    console.log(correct);
}

var answers = function (data) {
    var movieButton = document.getElementById("movie-btn");
    var swansonButton = document.getElementById("swanson-btn");
    movieButton.textContent = data.role;
    swansonButton.textContent = "Ron Swanson";
};

// advances 'question' (resets buttons and pulls new quote)
function advanceQuestion() {
    // reset correct status
    $(swansonButtonEl).removeClass('correct');
    $(movieButtonEl).removeClass('correct');

    // pull the apis and populate info
    getQuotes()
}

var highscore = function() {
    if (answers = correct) {
        currentScore = currentScore + 10;
    }
    else {
    }
};


var endGame = function() {
    $(highscoreHeader).toggle("show");
    $(swansonButtonEl).toggle("hide");
    $(movieButtonEl).toggle("hide");
    $(nextButton).toggle("hide");
    $(displayedQuoteEl).toggle("hide");

    for (i=0; i < allScores.length; i ++) {
        var scoreList = document.getElementById("score-list");
        var listEl = document.createElement('li');
        listEl.textContent = currentScore;
        scoreList.appendChild(listEl);
    }
};


// start-button starts the game

startButton.addEventListener('click', startGame)


nextButton.addEventListener('click', advanceQuestion)


// highscore();

//endGame();

