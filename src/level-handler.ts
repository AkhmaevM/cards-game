import { renderGameField, renderStartScreen } from './render-screens'
import { startTimer, resetTimer } from './lib/stopwatch'
import { cards } from './render-screens'
import { handleCard } from './gameplay'

export function renderLevel(level: number) {
    renderGameField()

    const restartBtn = document.querySelector('.cards__game-btn')
    restartBtn?.addEventListener('click', () => {
        if (cards) {
            cards.innerHTML = ''
        }
        resetTimer()
        renderStartScreen()
    })

    const arr: number[] = []

    // собираем массив случайных НЕПОВТОРЯЮЩИХСЯ карт
    for (let i = 0; i < level; i++) {
        // запустим бесконечный цикл
        // eslint-disable-next-line no-constant-condition
        while (true) {
            // сгенерировали случайное число
            const randomCard = Math.ceil(Math.random() * 35)
            // если такого числа нет в нашем массиве arr
            if (!arr.includes(randomCard)) {
                // тогда добавим его
                arr.push(randomCard)
                // и остановим внутренний цикл while
                break
            }
        }
    }
    console.log(arr)

    // копируем полученный массив и формируем "пары"
    let cardSet = arr.concat(arr)
    // теперь "перемешаем" полученный массив парных карт
    cardSet = cardSet.sort(() => Math.random() - 0.5)
    console.log(cardSet)

    // теперь на основе этого массива можно легко простроить список карт
    // создаем контейнер куда будем класть div элементы с карточками
    const gameField = document.querySelector('.cards__game')
    const cardListDiv = document.createElement('div')
    cardListDiv.classList.add('cards__game-list')
    gameField?.appendChild(cardListDiv)

    // теперь проходимся по массиву
    cardSet.forEach((card) => {
        // используем элемент массива для генерации имени класса item-1 ... item-36
        const cardItemDiv = document.createElement('div')

        cardItemDiv.classList.add(
            'card-img',
            `item-${card}`,
            'cards__game-item'
        )
        cardListDiv.appendChild(cardItemDiv)

        cardItemDiv.addEventListener('click', () => {
            handleCard(cardItemDiv, card, level)
        })
    })

    setTimeout(() => {
        document.querySelectorAll('.cards__game-item').forEach((card) => {
            card.classList.add('defaultCard')
        })
        startTimer()
    }, 5000)
}
