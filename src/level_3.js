const { startTimer } = require('./lib/stopwatch')
const { pauseTimer } = require('./lib/stopwatch')
const { resetTimer } = require('./lib/stopwatch')
const { renderStartScreen } = require('./renderScreens.js')
const { renderGameField } = require('./renderScreens')
const { cardsObj } = require('./renderScreens')
const { renderResultsScreen } = require('./renderScreens')
let { clicks } = require('./renderScreens')
let { target } = require('./renderScreens')
let { randomsCardRang } = require('./renderScreens')
let { randomsCardSuit } = require('./renderScreens')

export function thirdLevel() {
    const cardsFormBtn = document.querySelector('.cards__form-btn')
    cardsFormBtn.addEventListener('click', (e) => {
        e.preventDefault()
        renderGameField()

        const cardsGameField = document.querySelector('.cards__game-field')

        let cardRangIdInSting = ''
        let cardSuitIdInSting = ''
        let secondCardSuitIdInSting = ''

        let myArray = [6, 7, 8, 9, 10, 11, 12, 13, 14]
        randomsCardRang = shuffle(myArray)

        function shuffle(o) {
            for (
                var j, x, i = o.length;
                i;
                j = Math.floor(Math.random() * i),
                    x = o[--i],
                    o[i] = o[j],
                    o[j] = x
            );
            return o
        }

        console.log(randomsCardRang)
        console.log(randomsCardSuit)

        // в данные массивы будут записываться id пар карт, которые нужно найти
        let firstTargetArr = []
        let secondTargetArr = []

        // процесс показа рандомных карт:
        for (let i = 0; i < 9; i++) {
            let randomSuitIndex = Math.ceil(1 + Math.floor(Math.random() * 4))
            let secondSuitIndex = Math.ceil(1 + Math.floor(Math.random() * 4))
            cardRangIdInSting = String(randomsCardRang[i])
            cardSuitIdInSting = String(secondSuitIndex)

            secondCardSuitIdInSting = String(randomSuitIndex)
            if (randomSuitIndex === secondSuitIndex && randomSuitIndex === 4) {
                secondSuitIndex -= 1
                cardSuitIdInSting = String(secondSuitIndex)
            } else if (
                randomSuitIndex === secondSuitIndex &&
                randomSuitIndex < 4
            ) {
                secondSuitIndex += 1
                cardSuitIdInSting = String(secondSuitIndex)
            }
            document
                .getElementById(
                    `${cardRangIdInSting}` + `-` + `${cardSuitIdInSting}`
                )
                .classList.remove('defaultCard')

            document
                .getElementById(
                    `${cardRangIdInSting}` + `-` + `${secondCardSuitIdInSting}`
                )
                .classList.remove('defaultCard')

            firstTargetArr[i] = document.getElementById(
                `${cardRangIdInSting}` + `-` + `${cardSuitIdInSting}`
            ).id
            secondTargetArr[i] = document.getElementById(
                `${cardRangIdInSting}` + `-` + `${secondCardSuitIdInSting}`
            ).id

            console.log(
                document.getElementById(
                    `${cardRangIdInSting}` + `-` + `${cardSuitIdInSting}`
                ).id
            )
            console.log(
                document.getElementById(
                    `${cardRangIdInSting}` + `-` + `${secondCardSuitIdInSting}`
                ).id
            )
        }

        console.log(firstTargetArr)
        console.log(secondTargetArr)

        // функция перемешивания карт на игровом поле
        function randomizeCardsPosition() {
            cardsGameField.innerHTML = ''

            let randoms = []
            while (randoms.length < 36) {
                let random = Math.ceil(1 + Math.floor(Math.random() * 36))
                if (randoms.indexOf(random) === -1) {
                    randoms.push(random)
                }
            }
            console.log(randoms)

            for (let i = 0; i < 36; i++) {
                cardsGameField.innerHTML += cardsObj[randoms[i]]
            }
        }

        // скрытие карт, старт таймера и начало игры
        setTimeout(() => {
            randomizeCardsPosition()
            const cardItem = document.querySelectorAll('.cards__game-item')

            // кнопка рестарта
            const cardsGameBtn = document.querySelector('.cards__game-btn')
            cardsGameBtn.addEventListener('click', () => {
                renderStartScreen()
                resetTimer()
            })

            // сверим id карт, по которым кликнули, с id карт, которые нужно найти
            for (let i = 0; i < cardItem.length; i++) {
                cardItem[i].addEventListener('click', () => {
                    cardItem[i].classList.remove('defaultCard')
                    console.log(cardItem[i].id)
                    clicks++

                    // если игрок угадал загаданную карту, добавляется 1 балл
                    if (
                        firstTargetArr.includes(cardItem[i].id) ||
                        secondTargetArr.includes(cardItem[i].id)
                    ) {
                        cardItem[i].style.border = '2px solid green'
                        target++
                    } else {
                        cardItem[i].style.border = '2px solid red'
                    }

                    // проверка количества открытых карт
                    if (clicks === 18) {
                        // win screen
                        if (target === 18) {
                            pauseTimer()
                            setTimeout(() => {
                                renderResultsScreen()
                                let finalTitle = document.querySelector(
                                    '.cards__final-title'
                                )
                                let finalScrImg = document.querySelector(
                                    '.cards__final-image'
                                )
                                finalScrImg.src = 'style/img/win-screen.png'
                                finalTitle.textContent = 'Вы выиграли!'
                                document.querySelector(
                                    '.cards__game'
                                ).style.opacity = '0.7'
                                document
                                    .querySelector('.cards__final-btn')
                                    .addEventListener('click', (e) => {
                                        e.preventDefault()
                                        renderStartScreen()
                                        resetTimer()
                                    })
                            }, 2000)
                        }

                        // loose screen
                        if (target < 18) {
                            pauseTimer()
                            setTimeout(() => {
                                renderResultsScreen()
                                let finalTitle = document.querySelector(
                                    '.cards__final-title'
                                )
                                let finalScrImg = document.querySelector(
                                    '.cards__final-image'
                                )
                                finalScrImg.src = 'style/img/loose-screen.png'
                                finalTitle.textContent = 'Вы проиграли!'
                                document.querySelector(
                                    '.cards__game'
                                ).style.opacity = '0.7'
                                document
                                    .querySelector('.cards__final-btn')
                                    .addEventListener('click', (e) => {
                                        e.preventDefault()
                                        renderStartScreen()
                                        resetTimer()
                                    })
                            }, 2000)
                        }
                    }
                })
            }

            startTimer()
        }, 5000)
    })
}