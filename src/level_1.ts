/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { startTimer, pauseTimer, resetTimer } from './lib/stopwatch'

import {
    renderStartScreen,
    renderGameField,
    renderResultsScreen,
    cardsObj,
} from './render-screens'
import looseScreen from '../style/img/loose-screen.png'
import winScreen from '../style/img/win-screen.png'
export function firstLevel() {
    let clicks = 0
    let target = 0
    const cardsFormBtn = document.querySelector('.cards__form-btn') as HTMLElement 
    cardsFormBtn.addEventListener('click', (e) => {
        e.preventDefault()
        renderGameField()

        const cardsGameField = document.querySelector('.cards__game-field')

        let cardRangIdInSting = ''
        let cardSuitIdInSting = ''
        let secondCardSuitIdInSting = ''

        // генерация массива ранодомных рангов карт (от 6 до туза)
        const randomsCardRang:number[] = []

        if(randomsCardRang !==undefined){
            while (randomsCardRang.length < 3) {
                const random = Math.ceil(1 + Math.floor(Math.random() * (14 - 6)) + 6)
    
                if (randomsCardRang.indexOf(random) === -1) {
                    randomsCardRang.push(random)
                }
            }
        }
      

        // генерация массива рандомных мастей карт
        const randomsCardSuit:number [] = []
        while (randomsCardSuit.length < 4) {
            const random = Math.ceil(1 + Math.floor(Math.random() * 4))
            if (randomsCardSuit?.indexOf(random) === -1) {
                randomsCardSuit?.push(random)
            }
        }

        // в данные массивы будут записываться id пар карт, которые нужно найти
        const firstTargetArr : string[] | undefined = []
        const secondTargetArr : string[] | undefined = []

        // процесс показа рандомных карт:
        if(randomsCardRang){
            for (let i = 0; i < 3; i++) {
                cardRangIdInSting = String(randomsCardRang[i])
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                if (randomsCardSuit!) {
                    cardSuitIdInSting = String(randomsCardSuit[i])
                    secondCardSuitIdInSting = String(randomsCardSuit[i + 1])
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
                
               
            }
        }
        
        console.log(firstTargetArr);
        console.log(secondTargetArr);

       
        

        // функция перемешивания карт на игровом поле
        function randomizeCardsPosition() {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            cardsGameField!.innerHTML = ''

            const randoms: number[] =[]
            while (randoms.length < 36) {
                const random:number = Math.ceil(1 + Math.floor(Math.random() * 36))
                if (randoms.indexOf(random) === -1) {
                    randoms.push(random)
                }
            }
            console.log(randoms!)

            if (randoms !== undefined) {
                for (let i = 0; i < 36; i++) {
                    cardsGameField!.innerHTML += cardsObj[randoms[i]]
                }
            }
        }

        // скрытие карт, старт таймера и начало игры
        setTimeout(() => {
            randomizeCardsPosition()
            const cardItem = document.querySelectorAll('.cards__game-item')

            // кнопка рестарта
            const cardsGameBtn = document.querySelector('.cards__game-btn')
            cardsGameBtn?.addEventListener('click', () => {
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
                  if (firstTargetArr && secondTargetArr) {
                    if (
                        firstTargetArr.includes(cardItem[i].id) ||
                        secondTargetArr.includes(cardItem[i].id)
                    ) {
                        target++
                        (cardItem[i] as HTMLElement).style.border = '2px solid green'
                    } else {
                        (cardItem[i] as HTMLElement).style.border = '2px solid red'
                    }
                  }
                 
                    // проверка количества открытых карт
                    if (clicks === 6) {
                        // win screen
                        if (target === 6) {
                            pauseTimer()
                            setTimeout(() => {
                                renderResultsScreen()
                                const finalTitle = document.querySelector(
                                    '.cards__final-title'
                                )
                                const finalScrImg = document.querySelector(
                                    '.cards__final-image'
                                ) as HTMLImageElement | null
                                finalScrImg!.src = winScreen
                                finalTitle!.textContent = 'Вы выиграли!';
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
                        if (target < 6) {
                            pauseTimer()
                            setTimeout(() => {
                                renderResultsScreen()
                                const finalTitle = document.querySelector(
                                    '.cards__final-title'
                                )
                                const finalScrImg = document.querySelector(
                                    '.cards__final-image'
                                ) as HTMLImageElement | null
                                finalScrImg!.src = looseScreen
                                finalTitle!.textContent = 'Вы проиграли!'
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
                    }

                    
                })
            }

            startTimer()
        }, 5000)
    })
}
