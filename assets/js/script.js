// links to api's
var ronUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
var movieUrl = 'https://movie-quote-api.herokuapp.com/v1/quote/'

var timerId;
var allScores = [];
var currentScore = 0;


const startingMins = 0.05
let time = startingMins * 60
var countdownEl = document.getElementById('countdown')

var swansonButtonEl = document.getElementById('swanson-btn')
var answerButtonEl = document.getElementById('answer-buttons');
var movieButtonEl = document.getElementById('movie-btn')
var displayedQuoteEl = document.getElementById('quote-display')
var quoteContainer = document.getElementById('quote-container')
var highscoreHeader = document.getElementById("highscore-header")
var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var pageContent = document.getElementById('content')




//timer function
function updateCountdown() {
    const minutes = Math.floor(time / 60)

    let seconds = time % 60
    seconds = seconds < 10 ? '0' + seconds : seconds

    if (time >= 0) {
        countdownEl.innerHTML = `${minutes}:${seconds}`
        time--
    } else {
        //$(startButton).toggle();
        endGame();
        //highscore();
    }
}


//pull apis function
var getQuotes = function () {
    var quoteTypeRandom = Math.random()
    if (quoteTypeRandom >= 0.5) {
        fetch(ronUrl).then(function (response) {
            response.json().then(function (data) {
                displayedQuoteEl.textContent = data[0]


                swansonButtonEl.classList.add('correct')

            })
        })
        fetch(movieUrl).then(function (response) {
            response.json().then(function (data) {
                movieButtonEl.textContent = data.role
            })
        })

    } else {
        fetch(movieUrl).then(function (response) {
            response.json().then(function (data) {
                displayedQuoteEl.textContent = data.quote
                movieButtonEl.textContent = data.role
                movieButtonEl.classList.add('correct')

            })
        })
    }

}


//start game 
function startGame() {
    nextButton.removeEventListener('click', newGame);
    nextButton.removeEventListener('click', highscore)
    answerButtonEl.setAttribute("class", "btn-grid grid grid-cols-2 gap-3 my-5")
    swansonButtonEl.setAttribute("class", "btn");
    movieButtonEl.setAttribute("class", "btn");
    nextButton.textContent = "Next"
    $(highscoreHeader).toggle("hide")
    swansonButtonEl.textContent = "Ron Swanson";
    timerId = setInterval(updateCountdown, 1000);
    $(startButton).toggle('hide');

    getQuotes()

    nextButton.addEventListener('click', advanceQuestion)
}



//select answer
function selectAnswer(event) {

    var selectedButton = event.target;
    var correct = selectedButton.classList.contains("correct")

    if (correct) {
        selectedButton.classList.add('green');
        highscoreHeader.textContent = "Correct!"
        $(highscoreHeader).toggle(true);
        currentScore = currentScore + 10;
        console.log(currentScore);
    }
    else {
        selectedButton.classList.add('red');
        highscoreHeader.textContent = "Wrong!"
        $(highscoreHeader).toggle(true);
    }
    movieButtonEl.removeEventListener('click', selectAnswer);
    swansonButtonEl.removeEventListener('click', selectAnswer);
}



//next question
function advanceQuestion() {

    $(swansonButtonEl).removeClass('correct');
    $(movieButtonEl).removeClass('correct');
    $(movieButtonEl).removeClass('red');
    $(movieButtonEl).removeClass('green');
    $(swansonButtonEl).removeClass('red');
    $(swansonButtonEl).removeClass('green');
    $(highscoreHeader).toggle(false);

    swansonButtonEl.addEventListener('click', selectAnswer);
    movieButtonEl.addEventListener('click', selectAnswer);
    getQuotes()

}



//end game 
var endGame = function () {
    $(highscoreHeader).toggle(true);
    // highscoreHeader.textContent = "Enter Initials";
    var x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    quoteContainer.textContent = "Enter Initials: "
    quoteContainer.appendChild(x);
    quoteContainer.setAttribute("class","quote-container");
    x.setAttribute("class","xxx");
    nextButton.removeEventListener('click',advanceQuestion);
    clearInterval(timerId);
    $(swansonButtonEl).toggle(false);
    $(movieButtonEl).toggle(false);
    $(displayedQuoteEl).toggle(false);
    nextButton.textContent = "Submit"

    nextButton.addEventListener('click', highscore);

};




//high scores
var highscore = function () {
    
    $(startButton).toggle(false);
    nextButton.removeEventListener('click', highscore);
    //clearInterval(timerId);
     nextButton.textContent = 'New Game';
     console.log("inside highscore")
     nextButton.addEventListener('click', newGame);

};



//reload page
var newGame = function () {
    window.location.reload();
}



// event listeners//
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', highscore);
swansonButtonEl.addEventListener('click', selectAnswer);
movieButtonEl.addEventListener('click', selectAnswer);






/*
    $(highscoreHeader).textContent = "High Scores:"
    $(highscoreHeader).toggle(true);
    $(swansonButtonEl).toggle(false);
    $(movieButtonEl).toggle(false);
    $(displayedQuoteEl).toggle(false);
    $(nextButton).toggle(false);

    allScores.push(currentScore);

    for (i = 0; i < allScores.length; i++) {
        var scoreList = document.getElementById("score-list");
        var listEl = document.createElement('li');
        listEl.textContent = currentScore;
        $(listEl).addClass('text-xl font-bold p-4');
        scoreList.appendChild(listEl);
    }


    //high scores

    startButton.textContent = "New Game?"
    //$(startButton).toggle();
    $(highscoreHeader).textContent = "High Scores:"
    $(highscoreHeader).toggle(true);
    $(swansonButtonEl).toggle(false);
    $(movieButtonEl).toggle(false);
    $(nextButton).toggle(false);
    $(displayedQuoteEl).toggle(false);
    console.log("inside highscore");
    startButton.addEventListener("click", reload);
 */