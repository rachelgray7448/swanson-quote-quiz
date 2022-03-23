
// links to api's
var ronUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
var movieUrl = 'https://movie-quote-api.herokuapp.com/v1/quote/'

var swansonButtonEl = document.getElementById('swanson-btn')
var movieButtonEl = document.getElementById('movie-btn')
var displayedQuoteEl = document.getElementById('quote-display')

// start-button starts the game
var startButton = document.getElementById('start-btn')
startButton.addEventListener('click', startGame)

var nextButton = document.getElementById('next-btn')
nextButton.addEventListener('click', advanceQuestion)

// time function starts at whatever starting mins is and clears at 0
const startingMins = 1
let time = startingMins * 60
var countdownEl = document.getElementById('countdown')

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
        clearInterval(updateCountdown)
    }
}

// main function that pulls apis and assigns values to quote and answer fields
var getQuotes = function() {

    var quoteTypeRandom = Math.random()
    console.log(quoteTypeRandom)

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
                })
            })
        })
    }
}

function startGame() {
    //start the countdown
    setInterval(updateCountdown, 1000)

    // hide the start button, show the next button
    $(startButton).toggle('hide');
    $(nextButton).toggle('hide');

    // display the answer boxes
    $(swansonButtonEl).toggle('hide')
    $(movieButtonEl).toggle('hide')

    // pull the apis and populate info
    getQuotes()  
}

function selectAnswer(event) {    
        var selectedButton = event.target
        var correct = selectedButton.dataset.correct
}

// advances 'question' (resets buttons and pulls new quote)
function advanceQuestion() {
    // reset correct status
    $(swansonButtonEl).removeClass('correct');
    $(movieButtonEl).removeClass('correct');

    // pull the apis and populate info
    getQuotes()
}

////////////////////////////////////////////////////////////////



// var answers = function (data, source) {
//     // console.log(source)
//     // var dataButton = document.getElementById(source+"-btn");
//     var movieButton = document.getElementById("movie-btn");
//     var swansonButton = document.getElementById("swanson-btn");
//     movieButton.textContent = data.role;
//     swansonButton.textContent = "Ron Swanson";
// };



// var getMovieQuote = function() {
//     var movieUrl = 'https://movie-quote-api.herokuapp.com/v1/quote/'
//     fetch(movieUrl).then(function(response) {
//         response.json().then(function(data) {
//             console.log(data);
//             answers(data, "movie");
//         })
//     })
// }

// var displayMovieQuote = function() {
//     var displayedQuoteEl = getElementById('quote-display')
//     displayedQuoteEl.textContent = data.quote
// }

// var displaySwansonQuote = function() {
//     var displayedQuoteEl = document.getElementById('quote-display')
//     displayedQuoteEl.textContent = data[0]
// }

// var getSwansonQuote = function() {
//     var ronUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
//     fetch(ronUrl).then(function(response) {
//         response.json().then(function(data) {
//             console.log(data);
//             answers(data, "swanson");
//         })
//     })
// }



// var highscore = function() {

// }


