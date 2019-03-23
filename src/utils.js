export const randomInteger = (min, max) => {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
};
export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};
export const COLORS = {
  blue: `card--blue`,
  black: `card--black`,
  yellow: `card--yellow`,
  green: `card--green`,
  pink: `card--pink`
};
export const deleteElement = (elementSelector) => {
  [].forEach.call(document.querySelectorAll(elementSelector), function (e) {
    e.parentNode.removeChild(e);
  });
};

