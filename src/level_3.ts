/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { startTimer, pauseTimer, resetTimer } from './lib/stopwatch'
import {
    renderStartScreen,
    renderGameField,
    renderResultsScreen,
    cardsObj,
} from './renderScreens'
import looseScreen from '../style/img/loose-screen.png'
import winScreen from '../style/img/win-screen.png'
export function thirdLevel() {
    let clicks = 0
    let target = 0
    let randomsCardRang:number []
    let randomsCardSuit:number []
    const cardsFormBtn = document.querySelector('.cards__form-btn') as HTMLElement
    cardsFormBtn.addEventListener('click', (e) => {
        e.preventDefault()
        renderGameField()

        const cardsGameField = document.querySelector('.cards__game-field')

        let cardRangIdInSting = ''
        let cardSuitIdInSting = ''
        let secondCardSuitIdInSting = ''

        // генерация массива рангов
        const myArray: number [] = [6,7,8,9,10,11,12,13,14]
        // myArray = [6,7,8,9,10,11,12,13,14]
        randomsCardRang = shuffle(myArray)
        function shuffle(o:Array<number>) {
            for (
                let j:number, x:number, i:number = o.length;
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
        const firstTargetArr  :string [] = []
        const secondTargetArr :string [] = []

        // процесс показа рандомных карт:
        for (let i = 0; i < 9; i++) {
            const randomSuitIndex = Math.ceil(1 + Math.floor(Math.random() * 4))
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
                )?.classList.remove('defaultCard')

            document
                .getElementById(
                    `${cardRangIdInSting}` + `-` + `${secondCardSuitIdInSting}`
                )?.classList.remove('defaultCard')

            firstTargetArr[i] = document.getElementById(
                `${cardRangIdInSting}` + `-` + `${cardSuitIdInSting}`
            )!.id
            secondTargetArr[i] = document.getElementById(
                `${cardRangIdInSting}` + `-` + `${secondCardSuitIdInSting}`
            )!.id

            console.log(
                document.getElementById(
                    `${cardRangIdInSting}` + `-` + `${cardSuitIdInSting}`
                )!.id
            )
            console.log(
                document.getElementById(
                    `${cardRangIdInSting}` + `-` + `${secondCardSuitIdInSting}`
                )!.id
            )
        }

        console.log(firstTargetArr)
        console.log(secondTargetArr)

        // функция перемешивания карт на игровом поле
        function randomizeCardsPosition() {
            cardsGameField!.innerHTML = ''

            const randoms = []
            while (randoms.length < 36) {
                const random = Math.ceil(1 + Math.floor(Math.random() * 36))
                if (randoms.indexOf(random) === -1) {
                    randoms.push(random)
                }
            }
            console.log(randoms)

            for (let i = 0; i < 36; i++) {
                cardsGameField!.innerHTML += cardsObj[randoms[i]]
            }
        }

        // скрытие карт, старт таймера и начало игры
        setTimeout(() => {
            randomizeCardsPosition()
            const cardItem = document.querySelectorAll('.cards__game-item')

            // кнопка рестарта
            const cardsGameBtn = document.querySelector('.cards__game-btn')
            cardsGameBtn!.addEventListener('click', () => {
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
                        firstTargetArr!.includes(cardItem[i].id) ||
                        secondTargetArr!.includes(cardItem[i].id)
                    ) {
                        (cardItem[i] as HTMLElement).style.border = '2px solid green'
                        target++
                    } else {
                        (cardItem[i] as HTMLElement).style.border = '2px solid red'
                    }

                    // проверка количества открытых карт
                    if (clicks === 18) {
                        // win screen
                        if (target === 18) {
                            pauseTimer()
                            setTimeout(() => {
                                renderResultsScreen()
                                const finalTitle = document.querySelector(
                                    '.cards__final-title'
                                )
                                const finalScrImg = document.querySelector(
                                    '.cards__final-image'
                                ) as HTMLImageElement
                                finalScrImg!.src = './style/img/win-screen.png'
                                finalTitle!.textContent = winScreen
                                const gameField = document.querySelector(
                                    '.cards__game'
                                ) as HTMLElement
                                gameField.style.opacity = '0.7'
                                document
                                    .querySelector('.cards__final-btn')!
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
                                const finalTitle = document.querySelector(
                                    '.cards__final-title'
                                )
                                const finalScrImg = document.querySelector(
                                    '.cards__final-image'
                                ) as HTMLImageElement
                                finalScrImg!.src = looseScreen
                                finalTitle!.textContent = 'Вы проиграли!'
                                const gameField = document.querySelector(
                                    '.cards__game'
                                ) as HTMLElement
                                gameField!.style.opacity = '0.7'
                                document
                                    .querySelector('.cards__final-btn')!
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
