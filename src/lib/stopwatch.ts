
let startTime:number, updatedTime, difference:number, tInterval: number, savedTime:number
let paused = 0
let running = 0

export function startTimer() {
    if (!running) {
        startTime = new Date().getTime()
        tInterval = window.setInterval(getShowTime, 1)
        // change 1 to 1000 above to run script every second instead of every millisecond. one other change will be needed in the getShowTime() function below for this to work. see comment there.

        paused = 0
        running = 1
    }
}

export function pauseTimer() {
    if (!difference) {
        // if timer never started, don't allow pause button to do anything
    } else if (!paused) {
        clearInterval(tInterval)
        savedTime = difference
        paused = 1
        running = 0

        // startTimerButton.style.cursor = 'pointer';
        // pauseTimerButton.style.cursor = 'auto';
    } else {
        // if the timer was already paused, when they click pause again, start the timer again
        startTimer()
    }
}

export function resetTimer() {
    clearInterval(tInterval)
    savedTime = 0
    difference = 0
    paused = 0
    running = 0
}
export function getShowTime() {
    updatedTime = new Date().getTime()
    if (savedTime) {
        difference = updatedTime - startTime + savedTime
    } else {
        difference = updatedTime - startTime
    }
    let minutes:number | string = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    let seconds:number | string = Math.floor((difference % (1000 * 60)) / 1000)
    
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds
    
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.querySelector('.timer')!.innerHTML = minutes + ':' + seconds
}
