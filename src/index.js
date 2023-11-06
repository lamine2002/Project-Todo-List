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

        listContainer.innerHTML += `
        <div class="cardList">
            <div class="card-body-list ${priorityClass}">
                <h5 class="card-title">${task.title}</h5>
                <div class="cardRight">
                    <p class="card-text">${date}</p>
                    <button class="btn btn-outline-info btn-sm">Détails</button>
                    <!-- Insérer ici l'icône d'édition -->
                    <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                    <svg class="icon btnEdit" data-bs-toggle="modal" data-bs-target="#editModal${index}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.9445 9.1875L14.9445 5.1875M18.9445 9.1875L13.946 14.1859C13.2873 14.8446 12.4878 15.3646 11.5699 15.5229C10.6431 15.6828 9.49294 15.736 8.94444 15.1875C8.39595 14.639 8.44915 13.4888 8.609 12.562C8.76731 11.6441 9.28735 10.8446 9.946 10.1859L14.9445 5.1875M18.9445 9.1875C18.9445 9.1875 21.9444 6.1875 19.9444 4.1875C17.9444 2.1875 14.9445 5.1875 14.9445 5.1875M20.5 12C20.5 18.5 18.5 20.5 12 20.5C5.5 20.5 3.5 18.5 3.5 12C3.5 5.5 5.5 3.5 12 3.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                 
                </svg>
                
                <!-- Insérer ici l'icône de suppression -->
                <!-- Comment modifier la couleur d'un icone svg               -->
                
                <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                <svg class="icon btnDelete " id="${task.id}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.5 6.5H5.5H20.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8.5 6.5V4.5C8.5 4.10218 8.65804 3.72064 8.93934 3.43934C9.22064 3.15804 9.60218 3 10 3H14C14.3978 3 14.7794 3.15804 15.0607 3.43934C15.342 3.72064 15.5 4.10218 15.5 4.5V6.5M18.5 6.5V19.5C18.5 19.8978 18.342 20.2794 18.0607 20.5607C17.7794 20.842 17.3978 21 17 21H7C6.60218 21 6.22064 20.842 5.93934 20.5607C5.65804 20.2794 5.5 19.8978 5.5 19.5V6.5H18.5Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.5 10.5V17.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M13.5 10.5V17.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                </div>
            </div>
            
            <!-- Le modal de modification de chaque tâche -->
            <!-- Bouton pour ouvrir le modal de modification -->
            <!-- Modal de modification -->
            <!-- Modal de modification -->
<div class="modal fade editModal" id="editModal${index}" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Modifier la tâche</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
            </div>
            <div class="modal-body">
                <form class="editForm">
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
    if (e.target.classList.contains('btnEdit')) {
        const index = e.target.getAttribute('data-index'); // Ajoutez un attribut data-index à vos boutons
        // Ici, vous pouvez ouvrir le modal correspondant à l'index
        const modal = document.querySelector('.editModal');
        // Faites ce que vous devez faire avec le modal
        console.log(e.target.className);
    }
});



displayList(globalRepertory, currentFolder);
displayFolders(folders);

