export default class Repertory {
    constructor() {
        this._list = [];
    }

    addList(list) {
        this._list.push(list);
    }

    removeList(list) {
        this._list.splice(this._list.indexOf(list), 1);
    }

    get getList() {
        return this._list;
    }
}