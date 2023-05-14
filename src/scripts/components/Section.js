export default class Section {
  constructor({items, renderer}, selector) {
    this._initialArray = items;
    this._container = document.querySelector(selector);
    this._renderer = renderer;
  }
  renderItems() {
    this._initialArray.forEach((element) => this._container.append(this._renderer(element)));
  }

  addItem(item) {
    this._container.prepend(this._renderer(item));
  }
}
