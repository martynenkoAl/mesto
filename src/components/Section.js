export default class Section {
  constructor(renderer, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }
  renderItems(cards) {
    cards.forEach((element) => this._renderer(element));
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
