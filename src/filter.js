import {Component} from "./component";

export class Filter extends Component {

  constructor(data) {
    super();
    this._title = data.title;
    this._amount = data.amount;
    this._onFilter = null;
    this._isActive = true;
    this._onFilterClick = this._onFilterClick.bind(this);
  }

  set onFilter(fn) {
    this._onFilter = fn;
  }

  _onFilterClick() {
    if (typeof this._onFilter === `function`) {
      this._onFilter();
    }
  }

  get template() {
    return `<div><input
          type="radio"
          id="filter__${this._title}"
          class="filter__input visually-hidden"
          name="filter"
          ${this._isActive ? ` checked` : ``}
        />
        <label for="filter__${this._title}" class="filter__label">
          ${this._title.toUpperCase()} <span class="filter__${this._title.toLowerCase()}-count">${this._amount}</span></label
          ></div>`;
  }

  cache() {
    this._label = this.element.querySelector(`.filter__label`);
  }

  uncache() {
    this._label = null;
  }

  bind() {
  //  this._label.addEventListener(`click`, this._onFilterClick);
  }

  unbind() {
    this._label.removeEventListener(`click`, this._onFilterClick);
  }

  update(amount) {
    this.tasksAmount = amount;
  }
}
