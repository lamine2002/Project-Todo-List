import List from "./todo";
import Repertory from "./repertory";
import { compareAsc, format } from 'date-fns';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


const globalRepertory = new Repertory();



const dateNow = format(new Date(), 'dd-MM-yyyy');

//
// let addTitle = prompt('Enter the title of the task : ');
// let addDescription = prompt('Enter the description of the task : ');
// let addDueDate = prompt('Enter the due date of the task (dd-mm-yyyy) : ');
// let addPriority = prompt('Enter the priority of the task (low, medium, high) : ');
//
// let addTodo = new List(addTitle, addDescription, addDueDate, addPriority, dateNow);
//
// console.log(addTodo);


