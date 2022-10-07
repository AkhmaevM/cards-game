const cards = document.querySelector('.cards');
const cardsForm = document.querySelector('.cards__start');
const cardsFormBtn = document.querySelector('.cards__form-btn');
const cardsFormLevel = document.querySelectorAll('.cards__form-level')
const cardsGame = document.querySelector('.cards__game');
const cardsGameBtn = document.querySelector('.cards__game-btn');

cardsFormBtn.addEventListener('click', (e)=>{
    e.preventDefault();

    cardsForm.classList.add('hiden');
    cardsGame.classList.remove('hiden');
    startTimer();


    
    cardsFormLevel.forEach(checkedRadio => {
       checkedRadio.addEventListener('click', (e)=>{
            switch (checkedRadio) {
                case this.value === 'easy':
                    renderGameCards(value);
                    window.localStorage.gameLevel = this.value;
                    break;
            
                case this.value === 'medium':
                    renderGameCards(value);
                    window.localStorage.gameLevel = this.value;
                    break;  

                case this.value === 'hard':
                    renderGameCards(value);
                    window.localStorage.gameLevel = this.value;
                    break;

                default:
                    break;
            }
       })
    });

    
})

cardsGameBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    cardsGame.classList.add('hiden');
    cardsForm.classList.remove('hiden');
    resetTimer();
})

// function renderGameCards(value){
// здесь будет шаблонизатор 
// }