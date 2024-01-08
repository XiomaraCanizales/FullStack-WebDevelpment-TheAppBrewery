let gameStarted = false
let level = 0

let buttonColours = ['red', 'blue', 'green', 'yellow']
let gamePattern = []
let userClickedPattern = []

$(document).keypress(function() {
    if (!gameStarted) {
      $('#level-title').text('Level '+ level)
      nextSequence()
      started = true
    }
  })

$('.btn').on('click', function() {
    let userChosenColour = $(this).attr('id')
    userClickedPattern.push(userChosenColour)

    playSound(userChosenColour)
    animatePress(userChosenColour)

    checkAnswer(userClickedPattern.length - 1)
})

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000)
        }
    } else {
        $('body').addClass('game-over')
        playSound('wrong')
        setTimeout(() => {
            $('body').removeClass('game-over')
          }, 200)
          $('#level-title').text('Game Over, Press Any Key to Restart')
          startOver()
    }
}

function nextSequence(){
    userClickedPattern = []
    level++
    $('#level-title').text('Level '+ level)

    let randomNumber = Math.floor(Math.random()* buttonColours.length)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    console.log('game2: ', gamePattern)
    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
    playSound(randomChosenColour)
}

function playSound(name) {
    let audio = new Audio("assets/sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentColour) {
    $('#' + currentColour).addClass('pressed')
    setTimeout(() => {
        $('#' + currentColour).removeClass('pressed')
      }, 100)
}

function startOver() {
    level = 0
    gamePattern = []
    gameStarted = false
}