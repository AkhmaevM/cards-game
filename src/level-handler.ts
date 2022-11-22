import { renderGameField, renderStartScreen } from "./renderScreens"
import { startTimer, resetTimer } from './lib/stopwatch'
import { cards } from "./renderScreens"
// наши карты это картинки с именами от 0 до 35 в формате png
// для каждого уровня сложности нужно сгенерировать либо фиксированное количество случайных пар
// для первого уровня 3 пары - 6 карт
// для первого уровня 6 пар  - 16 карт
// для первого уровня 9 пар -  18 карт

// алгоритм для генерации пар может быть такой
// 1. генерируем массив случайных чисел от 1 до 36, так как у нас уже классы, которые устанавливают фон item-1 ... item-36
// 2. в зависимости от уровня сложности это будет массив длиной 3, 6 или 9 элементов
// 3. сгенерированный массив соответствует случайным картам, теперь чтобы сделать их "парными" можно просто сделать копию этого массива и склеить два массива в 1. Таким образом мы получим новый массив из 6, 12 или 18 карт
// 4. теперь можно "размешать" этот массив и получим абсолютно случайны порядок карт

export function renderLevel(level: number) {
    renderGameField()
    
    setTimeout(() => {
        startTimer()
    }, 5000);

    const restartBtn = document.querySelector('.cards__game-btn')
    restartBtn?.addEventListener('click', ()=>{
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
        
        cardItemDiv.classList.add('card-img', `item-${card}`, 'cards__game-item')
        cardListDiv.appendChild(cardItemDiv)
    })

}
