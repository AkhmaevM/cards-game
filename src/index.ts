/* eslint-disable no-unused-vars */
import { renderStartScreen } from './render-screens'

import { renderLevel } from './level-handler'
import '../style/style.css'

addEventListener('DOMContentLoaded', () => {
    renderStartScreen()

    const cardsFormBtn = document.querySelector(
        '.cards__form-btn'
    ) as HTMLElement

    const easyLevel = document.querySelector('.easy')
    const mediumLevel = document.querySelector('.medium')
    const hardLevel = document.querySelector('.hard')

    easyLevel?.addEventListener('click', () => {
        cardsFormBtn.addEventListener('click', (e) => {
            e.preventDefault()
            renderLevel(3)
        })
    })

    mediumLevel?.addEventListener('click', () => {
        cardsFormBtn.addEventListener('click', (e) => {
            e.preventDefault()
            renderLevel(6)
        })
    })

    hardLevel?.addEventListener('click', () => {
        cardsFormBtn.addEventListener('click', (e) => {
            e.preventDefault()
            renderLevel(9)
        })
    })
})
