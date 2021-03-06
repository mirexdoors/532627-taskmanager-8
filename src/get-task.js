import {randomInteger} from "./utils";

export default () => ({
  id: randomInteger(0, 999),
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
    mo: true,
    tu: false,
    we: true,
    th: false,
    fr: true,
    sa: true,
    su: false,
  }
});
