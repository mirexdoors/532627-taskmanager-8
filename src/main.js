import getTask from '../src/get-task.js';
import getFilterElement from '../src/make-filter.js';
import {randomInteger} from '../src/utils.js';
import {Task} from '../src/task.js';
import {TaskEdit} from '../src/task-edit.js';

const TOTAL_CARDS = 4;
const mainFilter = document.querySelector(`.main__filter`);
const filterValues = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];
const taskBoard = document.querySelector(`.board__tasks`);

const onCLickFilter = () => {
  taskBoard.innerHTML = ``;
  let taskAmount = randomInteger(1, 10);
  renderTasks(taskAmount);
};

const renderTasks = (amount) => {
  while (amount) {
    const task = new Task(getTask());
    const taskEdit = new TaskEdit(getTask());
    task.render(taskBoard);
    task.onEdit = () => {
      taskEdit.render(taskBoard);
      taskBoard.replaceChild(taskEdit.element, task.element);
      task.unrender();
    };

    taskEdit.onSubmit = () => {
      task.render(taskBoard);
      taskBoard.replaceChild(task.element, taskEdit.element);
      taskEdit.unrender();
    };
    --amount;
  }
};

document.addEventListener(`DOMContentLoaded`, function () {

  renderTasks(TOTAL_CARDS);

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

  document.querySelectorAll(`input[name="filter"]`).forEach((filter) => {
    filter.addEventListener(`click`, onCLickFilter);
  });
});
