const { renderStartScreen } = require('./renderScreens.js')
const { firstLevel } = require('./level_1')
const { secondLevel } = require('./level_2')
const { thirdLevel } = require('./level_3')

addEventListener('DOMContentLoaded', () => {
    renderStartScreen()

    const easyLevel = document.querySelector('.easy')
    const mediumLevel = document.querySelector('.medium')
    const hardLevel = document.querySelector('.hard')

    easyLevel.addEventListener('click', () => {
        firstLevel()
    })

    mediumLevel.addEventListener('click', () => {
        secondLevel()
    })

    hardLevel.addEventListener('click', () => {
        thirdLevel()
    })
})
