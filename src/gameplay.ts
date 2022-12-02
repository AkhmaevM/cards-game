import { resetTimer, pauseTimer } from './lib/stopwatch'
import { renderResultsScreen, renderStartScreen } from './render-screens'
import looseScreen from '../style/img/loose-screen.png'
import winScreen from '../style/img/win-screen.png'

const result: number[] = []
let selected: number[] = []

export function handleCard(
    cardNode: HTMLDivElement,
    cardNumber: number,
    level: number
) {
    if (!cardNode.classList.contains('defaultCard')) {
        return
    }
    cardNode.classList.remove('defaultCard')

    if (selected.length === 1) {
        selected.push(cardNumber)
        const [first, second] = selected
        if (first === second) {
            result.push(first, second)
            console.log(result)

            selected = []
        } else {
            pauseTimer()
            renderResultsScreen()
            const finalTitle = document.querySelector('.cards__final-title')
            const finalScrImg = document.querySelector(
                '.cards__final-image'
            ) as HTMLImageElement | null
            if (finalScrImg) {
                finalScrImg.src = looseScreen
            }

            if (finalTitle) {
                finalTitle.textContent = 'Вы проиграли!'
            }

            const gameField = document.querySelector(
                '.cards__game'
            ) as HTMLElement | null
            if (gameField) {
                gameField.style.opacity = '0.7'
            }

            document
                .querySelector('.cards__final-btn')
                ?.addEventListener('click', (e) => {
                    e.preventDefault()
                    renderStartScreen()
                    resetTimer()
                })
            return
        }
    } else {
        selected.push(cardNumber)
    }

    console.log(level)

    if (result.length === level * 2) {
        pauseTimer()

        renderResultsScreen()
        const finalTitle = document.querySelector('.cards__final-title')
        const finalScrImg = document.querySelector(
            '.cards__final-image'
        ) as HTMLImageElement | null
        if (finalScrImg) {
            finalScrImg.src = winScreen
        }

        if (finalTitle) {
            finalTitle.textContent = 'Вы выиграли!'
        }

        const gameField = document.querySelector(
            '.cards__game'
        ) as HTMLElement | null
        if (gameField) {
            gameField.style.opacity = '0.7'
        }
        document
            .querySelector('.cards__final-btn')
            ?.addEventListener('click', (e) => {
                e.preventDefault()
                renderStartScreen()
                resetTimer()
            })
    }
}
