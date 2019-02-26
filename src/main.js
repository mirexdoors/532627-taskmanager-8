import getFilterElement from '../src/make-filter.js';
import getTaskCard from '../src/make-task.js';

const TOTAL_CARDS = 4;
const mainFilter = document.querySelector(`.main__filter`);
const filterValues = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];
const taskBoard = document.querySelector(`.board__tasks`);
const task = {
  color: `pink`,
  cardText: `card content`,
  cardTag: `tag`,
};

const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

const onCLickFilter = () => {
  taskBoard.innerHTML = ``;
  let taskAmount = randomInteger(1, 10);
  while (taskAmount) {
    taskBoard.insertAdjacentHTML(`beforeend`, getTaskCard(task.color, task.cardText, task.cardTag));
    --taskAmount;
  }
};

document.addEventListener(`DOMContentLoaded`, function () {

  // ex5
  if (mainFilter) {
    filterValues.forEach(function (filterName) {
      const filterAmount = randomInteger(0, 10);
      let isChecked = false;
      if (filterName === `All`) {
        isChecked = true;
      }
      mainFilter.insertAdjacentHTML(`beforeend`, getFilterElement(filterName, filterAmount, isChecked));
    });
  }

  // ex6
  if (taskBoard) {
    let counter = TOTAL_CARDS;
    while (counter) {
      taskBoard.insertAdjacentHTML(`beforeend`, getTaskCard(task.color, task.cardText, task.cardTag));
      --counter;
    }
  }

  // ex7
  document.querySelectorAll(`input[name="filter"]`).forEach((filter) => {
    filter.addEventListener(`click`, onCLickFilter);
  });
});
