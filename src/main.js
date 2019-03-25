import getTask from '../src/get-task.js';
import {randomInteger, deleteElement, deleteTask} from '../src/utils.js';
import {Task} from '../src/task.js';
import {TaskEdit} from '../src/task-edit.js';
import {Filter} from "./filter";
import Chart from 'chart.js';

const TOTAL_CARDS = 4;
const mainFilter = document.querySelector(`.main__filter`);
const FILTERS = [
  {title: `All`, amount: 4},
  {title: `Overdue`, amount: 2},
  {title: `Today`, amount: 1},
  {title: `Favorites`, amount: 2},
  {title: `Repeating`, amount: 2},
  {title: `Tags`, amount: 3},
  {title: `Archive`, amount: 1}];
const taskBoard = document.querySelector(`.board__tasks`);


const createTaskList = (amount) => {
  const tasks = [];
  while (amount) {
    tasks.push(getTask());
    amount--;
  }
  return tasks;
};

const renderTasks = (amount) => {
  const tasks = createTaskList(amount);
  tasks.map((taskData) => {
    const task = new Task(taskData);
    const taskEdit = new TaskEdit(taskData);
    taskBoard.appendChild(task.render());
    task.onEdit = () => {
      taskEdit.render(taskBoard);
      taskEdit.deleteHashtag();
      taskBoard.replaceChild(taskEdit.element, task.element);
      task.unrender();
    };

    taskEdit.onSubmit = (newObject) => {
      task.update(newObject);
      task.render(taskBoard);
      taskBoard.replaceChild(task.element, taskEdit.element);
      taskEdit.unrender();
      deleteElement(`.flatpickr-calendar`);
    };
    taskEdit.onDelete = () => {
      taskEdit.element.remove();
      taskEdit.unrender();
      deleteTask(tasks, task);
    };
  });
};

const createFilters = (types) => {
  types.map((it) => {
    const filter = new Filter(it);
    if (mainFilter) {
      mainFilter.appendChild(filter.render());
    }
  });


};

document.addEventListener(`DOMContentLoaded`, function () {

  renderTasks(TOTAL_CARDS);
  createFilters(FILTERS);

  // if (mainFilter) {
  //   filterValues.forEach(function (filterName) {
  //     const filterAmount = randomInteger(0, 10);
  //     let isChecked = false;
  //     if (filterName === `All`) {
  //       isChecked = true;
  //     }
  //     // mainFilter.insertAdjacentHTML(`beforeend`, getFilterElement(filterName, filterAmount, isChecked));
  //   });
  // }
});
