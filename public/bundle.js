/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/get-task.js":
/*!*************************!*\
  !*** ./src/get-task.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (() => ({
  title: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ]),
  picture: `http://picsum.photos/100/100?r=${Math.random()}`,
  color: [
    `pink`,
    `black`,
    `yellow`,
    `blue`,
    `green`
  ][Math.floor(Math.random() * 5)],
  repeatingDays: {
    Mo: true,
    Tu: false,
    We: true,
    Th: false,
    Fr: true,
    Sa: true,
    Su: false,
  },
  isFavorite: true,
  isDone: false,
}));


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_get_task_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/get-task.js */ "./src/get-task.js");
/* harmony import */ var _src_make_filter_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/make-filter.js */ "./src/make-filter.js");
/* harmony import */ var _src_make_task_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/make-task.js */ "./src/make-task.js");





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

const renderTasks = (tasksArray) => {
  tasksArray.forEach(taskBoard.insertAdjacentHTML(`beforeend`, Object(_src_make_task_js__WEBPACK_IMPORTED_MODULE_2__["default"])()));
};

const onCLickFilter = () => {
  taskBoard.innerHTML = ``;
  let taskAmount = randomInteger(1, 10);
  while (taskAmount) {
    taskBoard.insertAdjacentHTML(`beforeend`, Object(_src_make_task_js__WEBPACK_IMPORTED_MODULE_2__["default"])(Object(_src_get_task_js__WEBPACK_IMPORTED_MODULE_0__["default"])()));
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
      mainFilter.insertAdjacentHTML(`beforeend`, Object(_src_make_filter_js__WEBPACK_IMPORTED_MODULE_1__["default"])(filterName, filterAmount, isChecked));
    });
  }

  let counter = TOTAL_CARDS;
  while (counter) {
    tasks.push(Object(_src_get_task_js__WEBPACK_IMPORTED_MODULE_0__["default"])());
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


/***/ }),

/***/ "./src/make-filter.js":
/*!****************************!*\
  !*** ./src/make-filter.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((caption, amount = 0, isChecked = false) =>
  `<input
          type="radio"
          id="filter__${caption.toLowerCase()}"
          class="filter__input visually-hidden"
          name="filter"
          ${isChecked ? ` checked` : ``}
        />
        <label for="filter__all" class="filter__label">
          ${caption.toUpperCase()} <span class="filter__${caption.toLowerCase()}-count">${amount}</span></label
          >`);


/***/ }),

/***/ "./src/make-task.js":
/*!**************************!*\
  !*** ./src/make-task.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ((task) => {
  let taskTemplate = `<article class="card card--${task.color}  card--edit}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__control">
                  <button type="button" class="card__btn card__btn--edit">
                    edit
                  </button>
                  <button type="button" class="card__btn card__btn--archive">
                    archive
                  </button>
                  <button
                    type="button"
                    class="card__btn card__btn--favorites card__btn--disabled"
                  >
                    favorites
                  </button>
                </div>

                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >
${task.title}</textarea
                    >
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">
                        date: <span class="card__date-status">${task.dueDate ? task.dueDate : `no`}</span>
                      </button>

                      <fieldset class="card__date-deadline" disabled >
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__date"
                            type="text"
                            placeholder="23 September"
                            name="date"
                          />
                        </label>
                        <label class="card__input-deadline-wrap">
                          <input
                            class="card__time"
                            type="text"
                            placeholder="11:15 PM"
                            name="time"
                          />
                        </label>
                      </fieldset>

                      <button class="card__repeat-toggle" type="button">
                        repeat:<span class="card__repeat-status">no</span>
                      </button>

                      <fieldset class="card__repeat-days" disabled>
                        <div class="card__repeat-days-inner">`;

  for (const weekDay in task.repeatingDays) {
    if ({}.hasOwnProperty.call(task.repeatingDays, weekDay)) {
      taskTemplate += `<input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-${weekDay}-2"
                            name="repeat"
                            value="${weekDay}"
                            ${task.repeatingDays[weekDay] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-${weekDay}-2">${weekDay}</label >`;
    }
  }
  taskTemplate += `</div>
                      </fieldset>
                    </div>
                    <div class="card__hashtag">`;

  taskTemplate += `<div class="card__hashtag-list">`;
  const hashtagsTemplate = [...task.tags].map((tag) => `<span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="${tag}"
                            class="card__hashtag-hidden-input"
                          />
                          <button type="button" class="card__hashtag-name">
                            #${tag}
                          </button>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>`).join(``);

  taskTemplate += hashtagsTemplate;

  taskTemplate += `</div><label>
  <input type = "text" class="card__hashtag-input"  name ="hashtag-input"  placeholder = "Type new hashtag here" />
    </label>
    </div>
    </div>

    <label class="card__img-wrap card__img-wrap--empty">

    <input  type = "file" class="card__img-input visually-hidden" name = "img" />
    <img src = "${task.picture ? task.picture : `` }" alt = "task picture" class="card__img" />
    </label>
    <div class = "card__colors-inner" >
    <h3 class= "card__colors-title" > Color </h3>
    <div class= "card__colors-wrap" >
    <input type = "radio" id = "color-black-2" class= "card__color-input card__color-input--black visually-hidden" name = "color"
  value = "black" />
    <label for= "color-black-2" class= "card__color card__color--black"> black </label>
    <input type = "radio" id = "color-yellow-2" class= "card__color-input card__color-input--yellow visually-hidden" name = "color"
  value = "yellow"  />
    <label for= "color-yellow-2" class="card__color card__color--yellow"> yellow </label>
    <input type = "radio" id = "color-blue-2" class= "card__color-input card__color-input--blue visually-hidden"  name = "color"  value = "blue" />
    <label for= "color-blue-2" class= "card__color card__color--blue"> blue </label>
    <input type = "radio" id = "color-green-2" class= "card__color-input card__color-input--green visually-hidden" name = "color"
  value = "green" />
    <label for= "color-green-2" class= "card__color card__color--green"> green </label>
    <input type = "radio" id = "color-pink-2" class= "card__color-input card__color-input--pink visually-hidden"  name = "color"
  value = "pink"  checked />
  <label for= "color-pink-2" class= "card__color card__color--pink"> pink </label>
    </div>
    </div>
    </div>

    <div class= "card__status-btns" >
    <button class= "card__save"
  type = "submit" > save </button>
    <button class= "card__delete"  type = "button" > delete </button>
    </div>
    </div>
    </form>
    </article>`;
  return taskTemplate;
});



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map