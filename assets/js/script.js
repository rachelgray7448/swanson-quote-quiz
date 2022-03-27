// links to api's
var ronUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
var movieUrl = 'https://movie-quote-api.herokuapp.com/v1/quote/'
var timerId;
var finalScores = [];
var currentScore = 0;
var userInitials;
var x;
var finalScores2;
var allScores = {
    name: userInitials,
    score: currentScore
};
const startingMins = 0.5
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
        endGame();
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
    highscoreHeader.textContent = "Enter Initials: "
    x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    quoteContainer.appendChild(x);
    quoteContainer.setAttribute("class", "quote-container");
    x.setAttribute("class", "xxx");
    x.setAttribute("id", "xxx");
    nextButton.removeEventListener('click', advanceQuestion);
    clearInterval(timerId);
    $(swansonButtonEl).toggle(false);
    $(movieButtonEl).toggle(false);
    $(displayedQuoteEl).toggle(false);
    nextButton.textContent = "Submit"
    nextButton.addEventListener('click', loadingInput);

};

//loading
var loadingInput = function () {

    nextButton.removeEventListener('click', loadingInput);
    userInitials = document.querySelector("#xxx").value;
    allScores.score = currentScore;
    allScores.name = userInitials;
    console.log(allScores.name);
    console.log(allScores.score);
    console.log(finalScores);
    finalScores = JSON.parse(localStorage.getItem("finalKey"));
    if (finalScores != null) {
        finalScores.push(allScores);
    }
    else {
        finalScores = [];
        finalScores.push(allScores);
    }
    console.log(currentScore);
    console.log(userInitials);
    localStorage.setItem("finalKey", JSON.stringify(finalScores));
    x.remove();
    highscore();
}




//high scores
var highscore = function () {
    finalScores2 = JSON.parse(localStorage.getItem("finalKey"));
    $(highscoreHeader).toggle(true);
    highscoreHeader.textContent = "High Scores:"
    $(startButton).toggle(false);
    if (finalScores2 != null) {
        for (i = 0; i < finalScores2.length; i++) {
            var scoreList = document.getElementById("score-list");
            var listEl = document.createElement('li');
            listEl.textContent = finalScores2[i].name + "  " + finalScores2[i].score;
            $(listEl).addClass('text-xl font-bold p-4');
            scoreList.appendChild(listEl);
        }
    }
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






