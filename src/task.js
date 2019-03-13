import {createElement} from '../src/utils.js';

export class Task {
  constructor(data) {
    this._title = data.title;
    this._dueDate = data.dueDate;
    this._tags = data.tags;
    this._picture = data.picture;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
    this._state = {};
    this._onEdit = null;
  }


  _isRepeated() {
    return Object.values(this._repeatingDays).some((it) => it === true);
  }

  _onEditBtnClick() {
    if (typeof this._onEdit === `function`) {
      this._onEdit();
    }
  }

  get element() {
    return this._element;
  }

  set onEdit(fn) {
    this._onEdit = fn;
  }

  get template() {
    let taskTemplate = `<article class="card card--${this._color}  ${this._isRepeated() ? `card--repeat` : ``}">
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
      .addEventListener(`click`, this._onEditBtnClick.bind(this));
  }

  unbind() {
    this._element.removeEventListener(`click`, this._onEditBtnClick);
  }

  render(container) {
    this._element = createElement(this.template);
    container.appendChild(this._element);
    this.bind();
  }

  unrender() {
    this.unbind();
    this._element = null;
  }
}
