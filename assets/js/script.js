var ronUrl = "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
var movieUrl = 'https://movie-quote-api.herokuapp.com/v1/quote/'

const startingMins = 1
let time = startingMins * 60
var countdownEl = document.getElementById('countdown')


function updateCountdown() {
    const minutes = Math.floor(time/60)
    let seconds = time % 60
    seconds = seconds < 10 ? '0' + seconds : seconds

    if (time >= 0) {
        countdownEl.innerHTML = `${minutes}:${seconds}`
        time --
    } else {
        clearInterval(updateCountdown)
    }
}

var getQuotes = function() {

    var quoteTypeRandom = Math.random()
    console.log(quoteTypeRandom)
    setInterval(updateCountdown, 1000)

    if(quoteTypeRandom >= 0.5) { // ron quote displayed

        //fetch swanson api and update displayed quote
        fetch(ronUrl).then(function(response) {
            response.json().then(function(data) {
                var displayedQuoteEl = document.getElementById('quote-display')
                displayedQuoteEl.textContent = data[0]
                var swansonButtonEl = document.getElementById('swanson-btn')
                swansonButtonEl.classList.add('correct')
                swansonButtonEl.addEventListener('click', function(event) {
                    console.log('swanson button worked')
                })
            })
        })

        //fetch movie api and update movie button
        fetch(movieUrl).then(function(response) {
            response.json().then(function(data) {
                var movieButtonEl = document.getElementById('movie-btn')
                movieButtonEl.textContent = data.role
            })
        })

    } else { // movie quote is displayed

        // fetch movie api and update displayed quote AND movie button
        fetch(movieUrl).then(function(response) {
            response.json().then(function(data) {
                var displayedQuoteEl = document.getElementById('quote-display')
                displayedQuoteEl.textContent = data.quote

                var movieButtonEl = document.getElementById('movie-btn')
                movieButtonEl.textContent = data.role
                movieButtonEl.classList.add('correct')
                movieButtonEl.addEventListener('click', function(event) {
                    console.log('movie button worked')
                })
            })
        })
    }
}

getQuotes()

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


