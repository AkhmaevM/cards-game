function firstLevel() {
    const cardsFormBtn = document.querySelector('.cards__form-btn');
    cardsFormBtn.addEventListener('click', (e) => {
        e.preventDefault();
        renderGameField();

        const cardsGameField = document.querySelector('.cards__game-field');

        let cardRangIdInSting = '';
        let cardSuitIdInSting = '';
        let secondCardSuitIdInSting = '';

        // генерация массива ранодомных рангов карт (от 6 до туза)
        let randomsCardRang = [];
        while (randomsCardRang.length < 3) {
            let random = Math.ceil(
                1 + Math.floor(Math.random() * (14 - 6)) + 6
            );

            if (randomsCardRang.indexOf(random) == -1) {
                randomsCardRang.push(random);
            }
        }

        // генерация массива рандомных мастей карт
        let randomsCardSuit = [];
        while (randomsCardSuit.length < 4) {
            let random = Math.ceil(1 + Math.floor(Math.random() * 4));
            if (randomsCardSuit.indexOf(random) == -1) {
                randomsCardSuit.push(random);
            }
        }

        // в данные массивы будут записываться id пар карт, которые нужно найти
        let firstTargetArr = [];
        let secondTargetArr = [];

        // процесс показа рандомных карт:
        for (let i = 0; i < 3; i++) {
            cardRangIdInSting = String(randomsCardRang[i]);
            cardSuitIdInSting = String(randomsCardSuit[i]);
            secondCardSuitIdInSting = String(randomsCardSuit[i + 1]);
            document
                .getElementById(
                    `${cardRangIdInSting}` + `-` + `${cardSuitIdInSting}`
                )
                .classList.remove('defaultCard');

            document
                .getElementById(
                    `${cardRangIdInSting}` +
                        `-` +
                        `${secondCardSuitIdInSting}`
                )
                .classList.remove('defaultCard');

            firstTargetArr[i] = document.getElementById(
                `${cardRangIdInSting}` + `-` + `${cardSuitIdInSting}`
            ).id;
            secondTargetArr[i] = document.getElementById(
                `${cardRangIdInSting}` + `-` + `${secondCardSuitIdInSting}`
            ).id;
        }

        console.log(firstTargetArr);
        console.log(secondTargetArr);

        // функция перемешивания карт на игровом поле
        function randomizeCardsPosition() {
            cardsGameField.innerHTML = '';

            let randoms = [];
            while (randoms.length < 36) {
                let random = Math.ceil(1 + Math.floor(Math.random() * 36));
                if (randoms.indexOf(random) == -1) {
                    randoms.push(random);
                }
            }
            console.log(randoms);

            for (let i = 0; i < 36; i++) {
                cardsGameField.innerHTML += cardsObj[randoms[i]];
            }
        }

        // скрытие карт, старт таймера и начало игры
        setTimeout(() => {
            randomizeCardsPosition();
            const cardItem = document.querySelectorAll('.cards__game-item');

            // кнопка рестарта
            const cardsGameBtn = document.querySelector('.cards__game-btn');
            cardsGameBtn.addEventListener('click', (e) => {
                renderStartScreen();
                resetTimer();
            });

            // сверим id карт, по которым кликнули, с id карт, которые нужно найти
            for (let i = 0; i < cardItem.length; i++) {
                cardItem[i].addEventListener('click', () => {
                    cardItem[i].classList.remove('defaultCard');
                    console.log(cardItem[i].id);
                    clicks++;
                    
                    // если игрок угадал загаданную карту, добавляется 1 балл
                    if (firstTargetArr.includes(cardItem[i].id) || secondTargetArr.includes(cardItem[i].id)) {
                        target++;
                        cardItem[i].style.border = '2px solid green'
                    }

                    else{
                        cardItem[i].style.border = '2px solid red'
                    }

                    // проверка количества открытых карт
                    if (clicks === 6) {
                        // win screen
                        if (target === 6) {
                            pauseTimer();
                            setTimeout(() => {
                                renderResultsScreen();
                                let finalTitle = document.querySelector(
                                    '.cards__final-title'
                                );
                                let finalScrImg = document.querySelector(
                                    '.cards__final-image'
                                );
                                finalScrImg.src =
                                    'style/img/win-screen.png';
                                finalTitle.textContent = 'Вы выиграли!';
                                document.querySelector(
                                    '.cards__game'
                                ).style.opacity = '0.7';
                                document
                                    .querySelector('.cards__final-btn')
                                    .addEventListener('click', (e) => {
                                        e.preventDefault();
                                        renderStartScreen();
                                        resetTimer();
                                    });
                            }, 2000);
                        }

                        // loose screen
                        if (target < 6) {
                            pauseTimer();
                            setTimeout(() => {
                                renderResultsScreen();
                                let finalTitle = document.querySelector(
                                    '.cards__final-title'
                                );
                                let finalScrImg = document.querySelector(
                                    '.cards__final-image'
                                );
                                finalScrImg.src =
                                    'style/img/loose-screen.png';
                                finalTitle.textContent = 'Вы проиграли!';
                                document.querySelector(
                                    '.cards__game'
                                ).style.opacity = '0.7';
                                document
                                    .querySelector('.cards__final-btn')
                                    .addEventListener('click', (e) => {
                                        e.preventDefault();
                                        renderStartScreen();
                                        resetTimer();
                                    });
                            }, 2000);
                        }
                    }
                });
            }

            startTimer();
        }, 5000);
    });
}