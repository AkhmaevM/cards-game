/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// const cards = document.querySelector('.cards')
const cardsForm = document.querySelector('.cards__start');
const cardsFormBtn = document.querySelector('.cards__form-btn');
const cardsFormLevel = document.querySelectorAll('.cards__form-level');
const cardsGame = document.querySelector('.cards__game');
const cardsGameBtn = document.querySelector('.cards__game-btn');
const cardsGameGroup = document.querySelector('.cards__game-field').childNodes;
const cardsGameItem = document.querySelectorAll('.cards__game-item');

cardsFormBtn.addEventListener('click', renderScreen);

function renderScreen(e) {
    e.preventDefault();

    cardsForm.classList.add('hiden');
    cardsGame.classList.remove('hiden');

    setTimeout(() => {
        cardsGameItem.forEach((item) => {
            item.classList.add('defaultCard');
            startTimer();
        });
    }, 5000);

    // cardsFormLevel.forEach((checkedRadio) => {
    //     checkedRadio.addEventListener('click', (_e) => {
    //         switch (checkedRadio) {
    //             case this.value === 'easy':
    //                 renderGameCards(value);
    //                 window.localStorage.gameLevel = this.value;
    //                 break;

    //             case this.value === 'medium':
    //                 renderGameCards(value);
    //                 window.localStorage.gameLevel = this.value;
    //                 break;

    //             case this.value === 'hard':
    //                 renderGameCards(value);
    //                 window.localStorage.gameLevel = this.value;
    //                 break;

    //             default:
    //                 break;
    //         }
    //     });
    // });
}

cardsGameBtn.addEventListener('click', (e) => {
    e.preventDefault();
    cardsGame.classList.add('hiden');
    cardsForm.classList.remove('hiden');
    resetTimer();
    cardsGameItem.forEach((item) => {
        item.classList.remove('defaultCard');
    });
});

function renderGameCards(_value) {
    // здесь будет шаблонизатор
}
