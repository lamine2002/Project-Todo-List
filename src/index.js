import List from "./todo";
import Repertory from "./repertory";
import { compareAsc, format } from 'date-fns';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


const globalRepertory = new Repertory();

const dateNow = format(new Date(), 'dd-MM-yyyy');
let list1 = new List('List 1', 'Description 1', '01-01-2021', 'low', dateNow);
let list2 = new List('List 2', 'Description 2', '02-01-2021', 'medium', dateNow);
let list3 = new List('List 3', 'Description 3', '03-01-2021', 'high', dateNow);
let list4 = new List('List 4', 'Description 4', '04-01-2021', 'low', dateNow);
let list5 = new List('List 5', 'Description 5', '05-01-2021', 'medium', dateNow);
let list6 = new List('List 6', 'Description 6', '06-01-2021', 'high', dateNow);
let list7 = new List('List 7', 'Description 7', '07-01-2021', 'low', dateNow);
let list8 = new List('List 8', 'Description 8', '08-01-2021', 'medium', dateNow);
let list9 = new List('List 9', 'Description 9', '09-01-2021', 'high', dateNow);
let list10 = new List('List 10', 'Description 10', '10-01-2021', 'low', dateNow);
let list11 = new List('List 11', 'Description 11', '11-01-2021', 'medium', dateNow);

globalRepertory.addList(list1);
globalRepertory.addList(list2);
globalRepertory.addList(list3);
globalRepertory.addList(list4);
globalRepertory.addList(list5);
globalRepertory.addList(list6);
globalRepertory.addList(list7);
globalRepertory.addList(list8);
globalRepertory.addList(list9);
globalRepertory.addList(list10);
globalRepertory.addList(list11);


const listContainer = document.querySelector('.taskList');

const displayList = () => {
listContainer.innerHTML = '';
    globalRepertory.getList.forEach((list) => {
        let className = '';
        if (list.priority === 'low') {
             className = 'low';
        }else if (list.priority === 'medium') {
             className = 'medium';
        }else if (list.priority === 'high') {
             className = 'high';
        }
        listContainer.innerHTML += `
        <div class="cardList">
            <div class="card-body-list ${className}">
                <h5 class="card-title">${list.title}</h5>
                <p class="card-text">${list.description}</p>
                <p class="card-text">${list.dueDate}</p>
                <p class="card-text">${list.priority}</p>
                <p class="card-text">${list.emettedDate}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        `;

    });
}

displayList();
//
// let addTitle = prompt('Enter the title of the task : ');
// let addDescription = prompt('Enter the description of the task : ');
// let addDueDate = prompt('Enter the due date of the task (dd-mm-yyyy) : ');
// let addPriority = prompt('Enter the priority of the task (low, medium, high) : ');
//
// let addTodo = new List(addTitle, addDescription, addDueDate, addPriority, dateNow);
//
// console.log(addTodo);


