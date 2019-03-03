import getTask from '../src/get-task.js';
import getFilterElement from '../src/make-filter.js';
import getTaskCard from '../src/make-task.js';


const TOTAL_CARDS = 4;
const mainFilter = document.querySelector(`.main__filter`);
const filterValues = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];
const taskBoard = document.querySelector(`.board__tasks`);
const tasks = []; // массив для хранения всех тасок

const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};

const renderTasks = (taskArray) => {
  taskArray.forEach(taskBoard.insertAdjacentHTML(`beforeend`, getTaskCard(taskArray)));
};

const onCLickFilter = () => {
  taskBoard.innerHTML = ``;
  let taskAmount = randomInteger(1, 10);
  while (taskAmount) {
    taskBoard.insertAdjacentHTML(`beforeend`, getTaskCard(getTask()));
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

  let counter = TOTAL_CARDS;
  while (counter) {
    tasks.push(getTask());
  }

  if (tasks.length > 0 && taskBoard) {
    console.log(tasks);
    // renderTasks(tasks);
  }


  // ex7
  document.querySelectorAll(`input[name="filter"]`).forEach((filter) => {
    filter.addEventListener(`click`, onCLickFilter);
  });
});
