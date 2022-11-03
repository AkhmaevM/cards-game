/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// const { doc } = require("prettier");

const cards = document.querySelector('.cards');
const cardsForm = document.querySelector('.cards__start');
const cardsFormLevel = document.querySelectorAll('.cards__form-level');
let clicks = 0;
let target = 0;
let randomsCardRang = [];
let randomsCardSuit = [];

addEventListener('DOMContentLoaded',()=>{
   renderStartScreen();
  
   const easyLevel = document.querySelector('.easy');
   const mediumLevel = document.querySelector('.medium');
   const hardLevel = document.querySelector('.hard');

   

   easyLevel.addEventListener('click', () => {
     firstLevel();
   });

   mediumLevel.addEventListener('click', () => {
      secondLevel();
   });

   hardLevel.addEventListener('click', () => {
     thirdLevel();
   });

})

/******/ })()
;
//# sourceMappingURL=bundle.js.map