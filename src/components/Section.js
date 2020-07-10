export class Section {
    constructor({items, renderer}, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    renderItems() { //берет массив и рендерит каждый его элемент
        this._items.forEach(item => {
            this.addItem(this._renderer(item));
        })
    }
    
    addItem(element) { //добавляет в разметку
        this._containerSelector.prepend(element);
    }
}