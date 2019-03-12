import getTask from '../src/get-task.js';
import getFilterElement from '../src/make-filter.js';
import getTaskCard from '../src/make-task.js';
import {Task} from '../src/task.js';
import {TaskEdit} from '../src/task-edit.js';

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

// const renderTask = (task) => {
//   taskBoard.insertAdjacentHTML(`beforeend`, getTaskCard(task));
// };

const onCLickFilter = () => {
  taskBoard.innerHTML = ``;
  let taskAmount = randomInteger(1, 10);
  while (taskAmount) {
    taskBoard.insertAdjacentHTML(`beforeend`, getTaskCard(getTask()));
    --taskAmount;
  }
};

document.addEventListener(`DOMContentLoaded`, function () {

  const taskComponent = new Task(getTask());
  taskComponent.render(taskBoard);
  const taskEditComponent = new TaskEdit(getTask());
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

  // собираем таски в массив
  let counter = TOTAL_CARDS;
  while (counter) {
    tasks.push(getTask());
    --counter;
  }

  // рендерим таски
  // if (tasks.length > 0 && taskBoard) {
  //   tasks.forEach(function (task) {
  //     renderTask(task);
  //   });
  // }


  // ex7
  document.querySelectorAll(`input[name="filter"]`).forEach((filter) => {
    filter.addEventListener(`click`, onCLickFilter);
  });
});
