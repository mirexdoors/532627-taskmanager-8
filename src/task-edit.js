import {Component} from "./component";
import flatpickr from 'flatpickr';
import moment from 'moment';

export class TaskEdit extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._title = data.title;
    this._dueDate = new Date(data.dueDate);
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._element = null;
    this._onSubmit = null;
    this._state.isDate = data.isDate;
    this._state.isRepeated = false;
    this._onChangeDate = this._onChangeDate.bind(this);
    this._onChangeRepeated = this._onChangeRepeated.bind(this);
    this._onSubmitBtnClick = this._onSubmitBtnClick.bind(this);
  }

  _onSubmitBtnClick(e) {
    e.preventDefault();

    const formData = new FormData(this._element.querySelector(`.card__form`));
    const newData = this._processForm(formData);

    if (typeof this._onSubmit === `function`) {
      this._onSubmit(newData);
    }

    this.update(newData);

    this._state.isDate = false;
  }

  _onChangeDate() {
    this._state.isDate = !this._state.isDate;
    this.unbind();
    this.uncache();
    this._partialUpdate();
    this.cache();
    this.bind();
  }

  _onChangeRepeated() {
    this._state.isRepeated = !this._state.isRepeated;
    this.unbind();
    this.uncache();
    this.cache();
    this._partialUpdate();
    this.bind();
  }

  _processForm(formData) {
    const entry = {
      title: ``,
      color: ``,
      tags: new Set(),
      dueDate: new Date(),
      repeatingDays: {
        'mo': false,
        'tu': false,
        'we': false,
        'th': false,
        'fr': false,
        'sa': false,
        'su': false,
      }
    };

    const taskEditMapper = TaskEdit.createMapper(entry);

    for (const pair of formData.entries()) {
      const [property, value] = pair;

      if (taskEditMapper[property]) {
        taskEditMapper[property](value);
      }
    }

    return entry;
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }


  get template() {
    const date = moment(this._dueDate);
    let taskTemplate = `<article class="card card--edit card--${this._color}  ${this._isRepeated() ? `card--repeat` : ``}">
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

${this._title}</textarea

                    >
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      <button class="card__date-deadline-toggle" type="button">

                        date: <span class="card__date-status">${this._state.isDate ? `yes` : `no`}</span>
                      </button>

                      <fieldset class="card__date-deadline" ${!this._state.isDate && `
  disabled`}>
                          <label class="card__input-deadline-wrap">
                            <input
                              class="card__date"
                              type="text"
                              placeholder="23 September"
                              name="date"
                              value="${date.format(`DD MMMM`)}"
                              />
                            </label>
                            <label class="card__input-deadline-wrap">
                              <input
                                class="card__time"
                                type="text"
                                placeholder="${date.format(`HH:mm A`)}"
                                  name="time"
                                />
                              </label>
                            </fieldset>
      
                            <button class="card__repeat-toggle" type="button">
      
                              repeat:<span class="card__repeat-status">${this._state.isRepeated ? `
  yes` : `no`}</span>
                              </button>
        
                              <fieldset class="card__repeat-days" ${!this._state.isRepeated && `disabled`}>
                                  <div class="card__repeat-days-inner">`;

    for (const weekDay in this._repeatingDays) {
      if ({}.hasOwnProperty.call(this._repeatingDays, weekDay)) {
        taskTemplate += `<input
                            class="visually-hidden card__repeat-day-input"
                            type="checkbox"
                            id="repeat-${weekDay}-2_${this._id}"
                            name="repeat"
                            value="${weekDay}"
                            ${this._repeatingDays[weekDay] ? `checked` : ``}
                      />
                      <label class="card__repeat-day" for="repeat-${weekDay}-2_${this._id}">${weekDay}</label >`;
      }
    }
    taskTemplate += `</div>
                      </fieldset>
                    </div>
                    <div class="card__hashtag">
                        <div class="card__hashtag-list">
${[...this._tags].map((tag) => `<span class="card__hashtag-inner">
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

                        </span>`).join(``)}
            </div>
          <label>
              <input type = "text" class="card__hashtag-input"  name ="hashtag"  placeholder = "Type new hashtag here" />
          </label>
        </div>
    </div>

    <label class="card__img-wrap card__img-wrap--empty">

    <input  type = "file" class="card__img-input visually-hidden" name = "img" />
    <img src = "${this._picture ? this._picture : `` }" alt = "task picture" class="card__img" />
    </label>
    
    
    <div class = "card__colors-inner" >
    <h3 class= "card__colors-title" > Color </h3>
    <div class= "card__colors-wrap" >
    <input type = "radio" id = "color-black-2_${this._id}" class= "card__color-input card__color-input--black visually-hidden" name = "color"
  value = "black" />
    <label for= "color-black-2_${this._id}" class= "card__color card__color--black"> black </label>
    <input type = "radio" id = "color-yellow-2_${this._id}" class= "card__color-input card__color-input--yellow visually-hidden" name = "color"
  value = "yellow"  />
    <label for= "color-yellow-2_${this._id}" class="card__color card__color--yellow"> yellow </label>
    <input type = "radio" id = "color-blue-2_${this._id}" class= "card__color-input card__color-input--blue visually-hidden"  name = "color"  value = "blue" />
    <label for= "color-blue-2_${this._id}" class= "card__color card__color--blue"> blue </label>
    <input type = "radio" id = "color-green-2_${this._id}" class= "card__color-input card__color-input--green visually-hidden" name = "color"
  value = "green" />
    <label for= "color-green-2_${this._id}" class= "card__color card__color--green"> green </label>
    <input type = "radio" id = "color-pink-2_${this._id}" class= "card__color-input card__color-input--pink visually-hidden"  name = "color"
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
    </article>`.trim();
    return taskTemplate;
  }

  cache() {
    this._form = this._element.querySelector(`.card__form`);
    this._deadlineToggle = this._element.querySelector(`.card__date-deadline-toggle`);
    this._repeatToggle = this._element.querySelector(`.card__repeat-toggle`);
  }

  uncache() {
    this._form = null;
    this._deadlineToggle = null;
    this._repeatToggle = null;
  }

  bind() {
    this._element.querySelector(`.card__form`)
    .addEventListener(`submit`, this._onSubmitBtnClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
    .addEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
    .addEventListener(`click`, this._onChangeRepeated);

    if (this._state.isDate) {
      const cardDate = this._element.querySelector(`.card__date`);
      const cardTime = this._element.querySelector(`.card__time`);
      flatpickr(cardDate,
          {
            altInput: true,
            altFormat: `j F`,
            dateFormat: `j F`
          }
      );
      flatpickr(cardTime,
          {
            enableTime: true,
            noCalendar: true,
            altInput: true,
            altFormat: `h:i K`,
            dateFormat: `h:i K`
          }
      );
    }
  }

  unbind() {
    this._element.querySelector(`.card__form`)
    .removeEventListener(`submit`, this._onSubmitBtnClick);
    this._element.querySelector(`.card__date-deadline-toggle`)
    .removeEventListener(`click`, this._onChangeDate);
    this._element.querySelector(`.card__repeat-toggle`)
    .removeEventListener(`click`, this._onChangeRepeated);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }

  static createMapper(target) {
    return {
      hashtag: (value) => target.tags.add(value),
      text: (value) => (target.title = value),
      color: (value) => (target.color = value),
      repeat: (value) => (target.repeatingDays[value] = true),
      date: (value) => (target.dueDate = moment(value, `DD MMMM`).toDate().getTime()),
      time: (value) => {
        const time = moment(value, `HH:mm A`);

        target.dueDate = moment(target.dueDate)
        .set({hour: time.hour(), minute: time.minute()}).toDate().getTime();
      }
    };
  }
}
