export default class List {
    static nextId = 1;
    constructor(title, description, dueDate, priority, emettedDate, completed = false) {
        this._id = List.nextId++;
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._emettedDate = emettedDate;
        this._completed = completed;
    }

    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get dueDate() {
        return this._dueDate;
    }

    get priority() {
        return this._priority;
    }

    get emettedDate() {
        return this._emettedDate;
    }



    set title(value) {
        this._title = value;
    }

    set description(value) {
        this._description = value;
    }

    set dueDate(value) {
        this._dueDate = value;
    }

    set priority(value) {
        this._priority = value;
    }

    set emettedDate(value) {
        this._emettedDate = value;
    }

    get completed() {
        return this._completed;
    }

    set completed(value) {
        this._completed = value;
    }


    editTitle(value) {
        this._title = value;
    }

    editDescription(value) {
        this._description = value;
    }

    editDueDate(value) {
        this._dueDate = value;
    }

    editPriority(value) {
        this._priority = value;
    }

    editNotes(value) {
        this._notes = value;
    }

}

