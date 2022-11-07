/* eslint-disable no-unused-vars */
import { renderStartScreen } from './renderScreens'
import { firstLevel } from './level_1'
import { secondLevel } from './level_2'
import { thirdLevel } from './level_3'

import '../style/style.css'


addEventListener('DOMContentLoaded', () => {
    renderStartScreen()

    const easyLevel = document.querySelector('.easy')
    const mediumLevel = document.querySelector('.medium')
    const hardLevel = document.querySelector('.hard')

    easyLevel?.addEventListener('click', () => {
        firstLevel()
    })

    mediumLevel?.addEventListener('click', () => {
        secondLevel()
    })

    hardLevel?.addEventListener('click', () => {
        thirdLevel()
    })
})