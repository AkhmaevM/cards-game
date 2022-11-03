let startTimerButton = document.querySelector('.startTimer');
let pauseTimerButton = document.querySelector('.pauseTimer');
let timerDisplay = document.querySelector('.cards__game-timer');
let startTime, updatedTime, difference, tInterval, savedTime;
let paused = 0;
let running = 0;

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        // change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.

        paused = 0;
        running = 1;
    }
}

function pauseTimer() {
    if (!difference) {
        // if timer never started, don't allow pause button to do anything
    } else if (!paused) {
        clearInterval(tInterval);
        savedTime = difference;
        paused = 1;
        running = 0;

        
        // startTimerButton.style.cursor = 'pointer';
        // pauseTimerButton.style.cursor = 'auto';
    } else {
        // if the timer was already paused, when they click pause again, start the timer again
        startTimer();
    }
}

function resetTimer() {
    clearInterval(tInterval);
    savedTime = 0;
    difference = 0;
    paused = 0;
    running = 0;
}
function getShowTime() {
    updatedTime = new Date().getTime();
    if (savedTime) {
        difference = updatedTime - startTime + savedTime;
    } else {
        difference = updatedTime - startTime;
    }
    let hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % (1000 * 60)) / 100);
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    milliseconds =
        milliseconds < 100
            ? milliseconds < 10
                ? '00' + milliseconds
                : '0' + milliseconds
            : milliseconds;
            document.querySelector('.timer').innerHTML = minutes + ':' + seconds;
}
