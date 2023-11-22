const dice1 = document.querySelector('.img1')
const dice2 = document.querySelector('.img2')
const result = document.querySelector('.result')

let randomNumer1 = Math.floor(Math.random() * 6) + 1
dice1.setAttribute('src', './assets/images/dice' + randomNumer1 + '.png')

let randomNumer2 = Math.floor(Math.random() * 6) + 1
dice2.setAttribute('src', './assets/images/dice' + randomNumer2 + '.png')

if (randomNumer1 == randomNumer2) {
   result.textContent = "It's a tie"
} else if (randomNumer1 > randomNumer2) {
    result.textContent = 'Player 1 Wins!'
} else {
    result.textContent = 'Player 2 Wins!'
}