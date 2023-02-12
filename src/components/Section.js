class Section {
  constructor( { renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) { 
    items.reverse().forEach((item) => { //reverse
      this.addItem(this._renderer(item));
    });
  }
  addItem(element) {
    this._container.prepend(element);
  }
}

export { Section };
