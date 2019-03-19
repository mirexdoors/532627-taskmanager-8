import {Component} from './component';
import {COLORS} from "./utils";
import moment from 'moment';

export class Task extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._onEdit = null;
    this._onEditBtnClick = this._onEditBtnClick.bind(this);
  }

  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onEditBtnClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    const date = moment(this._dueDate);

    let taskTemplate = `<article class="card ${COLORS[this._color]}  ${this._isRepeated() ? `card--repeat` : ``}">
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
                    >${this._title}</textarea>
                  </label>
                </div>


                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                    <button class="card__date-deadline-toggle" type="button">
                      date: <span class="card__date-status">${this._isRepeated() ? `yes` : `no`}</span>
                        </button>
                        <fieldset class="card__date-deadline" ${!this._isRepeated() ? `disabled` : ``} >
                            <label class="card__input-deadline-wrap">
                              <input
                                class="card__date"
                                type="text"
                                name="date"
                                value="${date.format(`DD MMMM`)}"
                            />
                          </label>
                          <label class="card__input-deadline-wrap">
                            <input
                              class="card__time"
                              type="text"
                              name="time"
                              value="${date.format(`HH:mm A`)}"
                            />
                          </label>                   
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
                    </div>
                   </div>


          <label class="card__img-wrap card__img-wrap--empty">
              <input  type = "file" class="card__img-input visually-hidden" name = "img" />
              <img src = "${this._picture ? this._picture : `` }" alt = "task picture" class="card__img" />
          </label>    
        </div>
    </div>
    </form>
    </article>`;
    return taskTemplate;
  }

  bind() {
    this._element.querySelector(`.card__btn--edit`)
      .addEventListener(`click`, this._onEditBtnClick);
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onEditBtnClick);
  }

  update(data) {
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._dueDate = data.dueDate;
  }
}
