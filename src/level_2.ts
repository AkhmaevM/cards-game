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
export function secondLevel() {
    let target = 0
    let clicks = 0 
    const randomsCardRang: number[] = []
    const randomsCardSuit: number[] = []
    const cardsFormBtn = document.querySelector('.cards__form-btn') as HTMLElement
    cardsFormBtn.addEventListener('click', (e) => {
        e.preventDefault()
        renderGameField()

        const cardsGameField = document.querySelector('.cards__game-field') as HTMLElement | undefined

        let cardRangIdInSting = ''
        let cardSuitIdInSting = ''
        let secondCardSuitIdInSting = ''

        // генерация массива ранодомных рангов карт (от 6 до туза)
        while (randomsCardRang.length <6) {
            const random:number = Math.ceil(1 + Math.floor(Math.random() * (14 - 6)) + 6)

            if (randomsCardRang.indexOf(random) === -1) {
                randomsCardRang.push(random)
            }
            // randomsCardRang.push(random)
        }
        let random:number 

        // генерация массива рандомных мастей карт
        while (randomsCardSuit.length < 8) {
            random  = Math.ceil(1 + Math.floor(Math.random() * 4))
            randomsCardSuit.push(random)
        }

        for (let i = 1; i <= randomsCardSuit.length; i++) {
           
            if (randomsCardSuit[i]===randomsCardSuit[i-1]) {
                if (randomsCardSuit[i]<=4 && randomsCardSuit[i]>=1 ) {
                    randomsCardSuit[i] = randomsCardSuit[i-1] -1
                }

                if(randomsCardSuit[i]>=0)
                randomsCardSuit[i] =randomsCardSuit[i-1]+ 1
            }
        }
       
       
       

        console.log(randomsCardRang)
        console.log(randomsCardSuit)

        // в данные массивы будут записываться id пар карт, которые нужно найти
        const firstTargetArr : string [] = []
        const secondTargetArr : string [] = []

        // процесс показа рандомных карт:
        for (let i = 0; i < 7; i++) {
            cardRangIdInSting = String(randomsCardRang[i])
            cardSuitIdInSting = String(randomsCardSuit[i])
            secondCardSuitIdInSting = String(randomsCardSuit[i + 1])

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
            )?.id ?? ''
            secondTargetArr[i] = document.getElementById(
                `${cardRangIdInSting}` + `-` + `${secondCardSuitIdInSting}`
            )?.id ?? ''

           
        }

       

        // функция перемешивания карт на игровом поле
        function randomizeCardsPosition() {
            cardsGameField!.innerHTML  = ''

            const randoms:number [] = []
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
            const cardsGameBtn = document.querySelector('.cards__game-btn') as HTMLElement
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
                        firstTargetArr.includes(cardItem[i].id) ||
                        secondTargetArr.includes(cardItem[i].id)
                    ) {
                        target++
                        (cardItem[i] as HTMLElement).style.border = '2px solid green'
                    } else {
                       ( cardItem[i] as HTMLElement).style.border = '2px solid red'
                    }

                   
                    // проверка количества открытых карт
                    if (clicks === 12) {
                        // win screen
                        if (target === 12) {
                            pauseTimer()
                            setTimeout(() => {
                                renderResultsScreen()
                                const finalTitle = document.querySelector(
                                    '.cards__final-title'
                                )
                                const finalScrImg = document.querySelector(
                                    '.cards__final-image'
                                ) as HTMLImageElement 
                                finalScrImg!.src = winScreen
                                finalTitle!.textContent = 'Вы выиграли!'
                                const gameField = document.querySelector(
                                    '.cards__game'
                                ) as HTMLElement | null
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

                        // loose screen
                        if (target < 12) {
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
                                const gameField =  document.querySelector(
                                    '.cards__game'
                                ) as HTMLElement | null 
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
