/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const cards = document.querySelector('.cards')
export const cardsForm = document.querySelector('.cards__start')
export const cardsFormLevel = document.querySelectorAll('.cards__form-level')

import * as Handlebars from 'handlebars'

export function renderStartScreen() {
    const startScreen = `
    <div class="cards__start">
    <form class="cards__form">
        <label for="level_choise" class="cards__form-title"
            >Выбери сложность</label
        >

        <div class="cards__form-levels">
            <input
                type="radio"
                id="card__form-level-1"
                name="cards__form-option"
                value="easy"
                class="cards__form-level easy"
            />
            <label
                for="card__form-level-1"
                class="cards__form-levelHead"
                >1</label
            >

            <input
                type="radio"
                id="card__form-level-2"
                name="cards__form-option"
                value="medium"
                class="cards__form-level medium"
            />
            <label
                for="card__form-level-2"
                class="cards__form-levelHead"
                >2</label
            >

            <input
                type="radio"
                id="card__form-level-3"
                name="cards__form-option"
                value="hard"
                class="cards__form-level hard"
            />
            <label
                for="card__form-level-3"
                class="cards__form-levelHead"
                >3</label
            >
        </div>

        <button class="cards__form-btn btn">Старт</button>
    </form>
    </div>
    `

    const template = Handlebars.compile(startScreen)
    const result = template('')
    if (cards) {
        cards.innerHTML = result
    }
}

export function renderGameField() {
    const gameFieldScreen = `
    <div class="cards__game">
    <div class="cards__game-header">
        <div class="cards__game-time">
            <div class="cards__game-wrapper">
                <p class="cards__game-min">min</p>
                <p class="cards__game-sek">sek</p>
            </div>
            <div class="cards__game-timer timer">00.00</div>
        </div>

        <div class="cards__game-btn btn">Начать заново</div>
    </div>

    
</div>
    `
    const template = Handlebars.compile(gameFieldScreen)
    const result = template('')
    if (cards) {
        cards.innerHTML = ''
        cards.innerHTML = result
    }
}

export const cardsObj: { [key: number]: string } = {
    1: `<div class="cards__game-item item-1 defaultCard" id='14-1'></div>`,
    2: `<div class="cards__game-item item-2 defaultCard" id='13-1'></div>`,
    3: `<div class="cards__game-item item-3 defaultCard" id='12-1'></div>`,
    4: `<div class="cards__game-item item-4 defaultCard" id='11-1'></div>`,
    5: `<div class="cards__game-item item-5 defaultCard" id='10-1'></div>`,
    6: `<div class="cards__game-item item-6 defaultCard" id='9-1'></div>`,
    7: `<div class="cards__game-item item-7 defaultCard" id='8-1'></div>`,
    8: `<div class="cards__game-item item-8 defaultCard" id='7-1'></div>`,
    9: `<div class="cards__game-item item-9 defaultCard" id='6-1'></div>`,
    10: `<div class="cards__game-item item-10 defaultCard" id='14-2'></div>`,
    11: `<div class="cards__game-item item-11 defaultCard" id='13-2'></div>`,
    12: `<div class="cards__game-item item-12 defaultCard" id='12-2'></div>`,
    13: `<div class="cards__game-item item-13 defaultCard" id='11-2'></div>`,
    14: `<div class="cards__game-item item-14 defaultCard" id='10-2'></div>`,
    15: `<div class="cards__game-item item-15 defaultCard" id='9-2'></div>`,
    16: `<div class="cards__game-item item-16 defaultCard" id='8-2'></div>`,
    17: `<div class="cards__game-item item-17 defaultCard" id='7-2'></div>`,
    18: `<div class="cards__game-item item-18 defaultCard" id='6-2'></div>`,
    19: `<div class="cards__game-item item-19 defaultCard" id='14-3'></div>`,
    20: `<div class="cards__game-item item-20 defaultCard" id='13-3'></div>`,
    21: `<div class="cards__game-item item-21 defaultCard" id='12-3'></div>`,
    22: `<div class="cards__game-item item-22 defaultCard" id='11-3'></div>`,
    23: `<div class="cards__game-item item-23 defaultCard" id='10-3'></div>`,
    24: `<div class="cards__game-item item-24 defaultCard" id='9-3'></div>`,
    25: `<div class="cards__game-item item-25 defaultCard" id='8-3'></div>`,
    26: `<div class="cards__game-item item-26 defaultCard" id='7-3'></div>`,
    27: `<div class="cards__game-item item-27 defaultCard" id='6-3'></div>`,
    28: `<div class="cards__game-item item-28 defaultCard" id='14-4'></div>`,
    29: `<div class="cards__game-item item-29 defaultCard" id='13-4'></div>`,
    30: `<div class="cards__game-item item-30 defaultCard" id='12-4'></div>`,
    31: `<div class="cards__game-item item-31 defaultCard" id='11-4'></div>`,
    32: `<div class="cards__game-item item-32 defaultCard" id='10-4'></div>`,
    33: `<div class="cards__game-item item-33 defaultCard" id='9-4'></div>`,
    34: `<div class="cards__game-item item-34 defaultCard" id='8-4'></div>`,
    35: `<div class="cards__game-item item-35 defaultCard" id='7-4'></div>`,
    36: `<div class="cards__game-item item-36 defaultCard" id='6-4'></div>`,
}

export function renderResultsScreen() {
    const resultScreen = `
    <div class="cards__final">
        <img src="style/img/win-screen.png" alt="winscreen img" class="cards__final-image">
        <h2 class="cards__final-title"></h2>
        <div class="cards__final-timer">
            <p class="cards__final-timer--text">Затраченное время</p>
            <div class="cards__final-timer--numbers timer">${
                document.querySelector('.timer')!.innerHTML
            }</div>
        </div>
        <button class="cards__final-btn btn">Играть снова</button>
    </div>
    `
    const template = Handlebars.compile(resultScreen)
    const result = template('')
    if (cards) {
        cards.innerHTML += result
    }
}
