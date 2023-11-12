import { compareAsc, format } from 'date-fns';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import {
    createLocalStorage,
    addFolder,
    removeFolder,
    editFolder,
    getFolders,
    addTask,
    removeTask,
    editTask,
    getTasks,
    createFolder,
    createTask,
    changeFolder,
    getCurrentFolder
} from './localStorage';


const listContainer = document.querySelector('.taskList');
const folderList = document.getElementById('folderList');
const addRepertoryButton = document.querySelector('.btnAddRepertory');
const folderInputContainer = document.getElementById('folderInputContainer');
const folderInput = document.getElementById('folderInput');
const addForm = document.querySelector('.addForm');
const upContent = document.querySelector('.upContent');


function validation(){
    document.addEventListener('DOMContentLoaded', () => {
        const addForm = document.querySelector('.addForm');
        addForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Réinitialisez la couleur de bordure et les messages d'erreur précédents
            resetFormValidation();

            // Récupérez les valeurs du formulaire
            const titleInput = document.getElementById('title');
            const descriptionInput = document.getElementById('description');
            const dueDateInput = document.getElementById('dueDate');
            const priorityInput = document.getElementById('priority');

            const title = titleInput.value.trim();
            const description = descriptionInput.value;
            const dueDate = dueDateInput.value;
            const priority = priorityInput.value;

            // Validez les champs requis
            if (title === '') {
                displayError(titleInput, 'Champ requis');
                return;
            }

            if (dueDate === '') {
                displayError(dueDateInput, 'Champ requis');
                return;
            }

            // Ajoutez d'autres validations au besoin

            // Créez un nouvel objet de tâche avec les valeurs du formulaire
            const newTask = {
                title,
                description,
                dueDate,
                priority,
            };

            // Traitez l'ajout de la tâche dans votre application ici

            // Réinitialisez le formulaire
            addForm.reset();

            // Fermez le modal
            const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
            modal.hide();
        });

        // Fonction pour réinitialiser la couleur de bordure et les messages d'erreur
        function resetFormValidation() {
            const inputElements = addForm.querySelectorAll('input, select');
            inputElements.forEach((input) => {
                input.style.borderColor = '';
                const errorText = input.parentElement.querySelector('.error-text');
                if (errorText) {
                    input.parentElement.removeChild(errorText);
                }
            });
        }

        // Fonction pour afficher un message d'erreur sous l'input avec bordure rouge
        function displayError(inputElement, errorMessage) {
            inputElement.style.borderColor = 'red';
            const errorText = document.createElement('div');
            errorText.classList.add('error-text');
            errorText.style.color = 'red';
            errorText.textContent = errorMessage;
            inputElement.parentElement.appendChild(errorText);
        }
    });
}



const globalRepertory = getTasks();
const folders = getFolders();
let currentFolder = getCurrentFolder();



const sortList = (array) => {
    return array.reverse();
}



sortList(globalRepertory);
sortList(folders);

const displayFolders = (folders) => {
    folderList.innerHTML = '';
    folders.forEach((folder) => {
        folderList.innerHTML += `
        <div class="${folder.title}" href="#">${folder.title}</div>
    `;
    });
}

const displayList = (taskLists, currentRepertory) => {

    listContainer.innerHTML = '';

    const filteredTasks = taskLists.filter((task) => {
        return currentRepertory === 'home' || task.repertory === currentRepertory;
    });

    filteredTasks.forEach((task, index) => {
        const date = format(new Date(task.dueDate), 'dd MMMM');
        const dateEdit = format(new Date(task.dueDate), 'yyyy-MM-dd');
        const priorityClass = getPriorityClass(task.priority);
        const cleanedTaskId = task.id.replace(/[^a-zA-Z0-9-]/g, '-');
        // console.log(cleanedTaskId);

        listContainer.innerHTML += `
        <div class="cardList">
            <div class="card-body-list ${priorityClass}">
                <h5 class="card-title">${task.title}</h5>
                <div class="cardRight">
                    <p class="card-text">${date}</p>
                    <button class="btn btn-outline-info btn-sm">Détails</button>
                    <!-- Insérer ici l'icône d'édition -->
                    <button class="btn btn-warning btn-sm btnEdit" data-bs-toggle="modal" data-bs-target="#editModal${index}" data-id="buttonEdit" id="${cleanedTaskId}">Modifier</button>
                <!-- Insérer ici l'icône de suppression -->
                <button class="btn btn-danger btn-sm" data-id="buttonDelete" id="${task.id}">Supprimer</button>
                </div>
            </div>  
            
            
          
            <!-- Modal de modification -->
<div class="modal fade " id="editModal${index}" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Modifier la tâche</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
            </div>
            <div class="modal-body">
                <form class="${cleanedTaskId}">
                    <!-- Id                    -->
                    <input type="hidden" id="editId" value="${task.id}"/>
<!--                    repertory-->
                    <input type="hidden" id="editRepertory" value="${task.repertory}"/>
                    <!-- Titre -->
                    <div class="form-outline mb-2">
                        <label class="form-label" for="editTitle">Titre</label>
                        <input type="text" id="editTitle" class="form-control" value="${task.title}"/>
                    </div>

                    <!-- Description -->
                    <div class="form-outline mb-2">
                        <label class="form-label">Description</label>
                        <textarea class="form-control" id="editDescription" rows="4" >${task.description}</textarea>
                    </div>

                    <!-- Date d'échéance -->
                    <div class="form-outline mb-2">
                        <label class="form-label" for="editDueDate">Date d'échéance</label>
                        <input type="date" id="editDueDate" class="form-control" value="${dateEdit}"/>
                    </div>

                    <!-- Priorité -->
                    <div class="form-outline mb-2">
                        <label class="form-label">Priorité</label>
                        <select id="editPriority" class="form-control">
                            <option value="${task.priority}" selected>${task.priority}</option>
                            <option value="low">Faible</option>
                            <option value="medium">Moyenne</option>
                            <option value="high">Élevée</option>
                        </select>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="submit" class="btn btn-primary saveChanges" data-bs-dismiss="modal" >Enregistrer les modifications</button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
            </div>
        </div>
    </div>
</div>
<!-- Fin du modal de modification -->
        </div>
    `;

    });
}

const getPriorityClass = (priority) => {
    switch (priority) {
        case 'low':
            return 'low';
        case 'medium':
            return 'medium';
        case 'high':
            return 'high';
        default:
            return '';
    }
}

// Changer de répertoire
folderList.addEventListener('click', (e) => {
    currentFolder = e.target.className;
    changeFolder(currentFolder);
    displayList(globalRepertory, currentFolder);
    console.log(currentFolder);
});

upContent.addEventListener('click', (e) => {
    currentFolder = e.target.className;
    changeFolder(currentFolder);
    displayList(globalRepertory, currentFolder);
    console.log(currentFolder);
});

addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = addForm.title.value;
    const description = addForm.description.value;
    const dueDate = addForm.dueDate.value;
    const priority = addForm.priority.value;
    const newTask = createTask(title, description, dueDate, priority, currentFolder);
    addTask(newTask);
    globalRepertory.unshift(newTask);
    displayList(globalRepertory, currentFolder);
    addForm.reset();
});



addRepertoryButton.addEventListener('click', () => {
    folderInputContainer.style.display = 'block';
    folderInput.focus();
});

folderInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && folderInput.value.trim() !== '') {
        // Créez le répertoire
        const folderTitle = folderInput.value;
        const newFolder = createFolder(folderTitle);

        // Ajoutez le répertoire dans le stockage local
        addFolder(newFolder);

        // Cachez le champ d'entrée
        folderInputContainer.style.display = 'none';

        // Réinitialisez le champ d'entrée
        folderInput.value = '';

        // Ajoutez le répertoire dans la liste des répertoires
        folders.unshift(newFolder);
        displayFolders(folders);
    }
});

listContainer.addEventListener('click', (e) => {
    if (e.target.getAttribute('data-id')==='buttonDelete'){
        const id = e.target.id;
        const taskIndex = globalRepertory.findIndex((task) => task.id === id);
        removeTask(taskIndex);
        globalRepertory.splice(taskIndex, 1);
        displayList(globalRepertory, currentFolder);
    }

    if (e.target.getAttribute('data-id') === 'buttonEdit'){
        const id = e.target.id;
        const editForm = document.querySelector(`.${id}`);
        const saveChanges = document.querySelector('.saveChanges');

        saveChanges.addEventListener('click', () => {
            const editId = editForm.querySelector('#editId').value;
            const editTitle = editForm.querySelector('#editTitle').value;
            const editDescription = editForm.querySelector('#editDescription').value;
            const editDueDate = editForm.querySelector('#editDueDate').value;
            const editPriority = editForm.querySelector('#editPriority').value;
            const editRepertory = editForm.querySelector('#editRepertory').value;
            const editTaskIndex = globalRepertory.findIndex((task) => task.id === editId);
            const editedTask = createTask(editTitle, editDescription, editDueDate, editPriority, editRepertory);
            editTask(editId, editTitle, editDescription, editDueDate, editPriority, editRepertory);
            globalRepertory.splice(editTaskIndex, 1, editedTask);
            displayList(globalRepertory, currentFolder);
        });

        // const editedTask = createTask(editTitle, editDescription, editDueDate, editPriority, editRepertory);
        // editTask(editId, editTitle, editDescription, editDueDate, editPriority, editRepertory);
        // globalRepertory.splice(editTaskIndex, 1, editedTask);
        // displayList(globalRepertory, currentFolder);



    }

});



displayList(globalRepertory, currentFolder);
displayFolders(folders);
console.log(globalRepertory);

