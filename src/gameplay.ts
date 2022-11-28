import { resetTimer, pauseTimer } from './lib/stopwatch'
import { renderResultsScreen, renderStartScreen } from './render-screens'
import looseScreen from '../style/img/loose-screen.png'
import winScreen from '../style/img/win-screen.png'

export function startGame() {
    const cardItem = document.querySelectorAll(
        '.card-img'
    ) as NodeListOf<HTMLDivElement>

    for (let i = 0; i < cardItem.length; i++) {
        cardItem[i].addEventListener('click', () => {
            handleCard(cardItem[i], i)
        })
    }
}

// сюда будет складывать карты (номера), которые правильно были выбраны
const result: number[] = []
// здесь будем хранить по две карты, на каждом ходе
let selected: number[] = []

// функция принимает на вход dom элемент с картой и код карты
export function handleCard(cardNode: HTMLDivElement, cardNumber: number) {
    // если карта перевернута, то ничего не делаем
    if (!cardNode.classList.contains('defaultCard')) {
        return
    }
    // иначе показываем карту
    cardNode.classList.remove('defaultCard')
    // и начинаем проверять

    // если уже выбрана одна карта
    if (selected.length === 1) {
        // тогда положем вторую карту в массив выбранных карт
        selected.push(cardNumber)
        // и сравним их между собой
        const [first, second] = selected
        // если карты равны
        if (first === second) {
            // тогда положим их в результирующий массив
            result.push(first, second)
            // и очистим массив выбранных карт
            selected = []
        } else {
            // иначе проигрыш
            // alert('вы проиграли')
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

        // если это первая карта из пары проверяемых карт, тогда просто кладем ее в массив
    } else {
        selected.push(cardNumber)
    }

    // тут вместо цифры 6, которая соответствует количеству карт на минимальной сложности
    // надо подставить количество карт в зависимости от выбранного уровня сложности
    if (result.length === 6) {
        // если проверили все карты правильно, то мы победили
        // alert('win')
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
