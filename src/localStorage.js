function createLocalStorage() {
    if (localStorage.getItem("folders") === null) {
        localStorage.setItem("folders", JSON.stringify([]));
    }
    if (localStorage.getItem("tasks") === null) {
        localStorage.setItem("tasks", JSON.stringify([]));
    }
    if (localStorage.getItem("currentFolder") === null) {
        localStorage.setItem("currentFolder", JSON.stringify([]));
    }
}

// Ajouter un repertoire
function addFolder(folder) {
    let folders = getFolders();
    folders.push(folder);
    localStorage.setItem("folders", JSON.stringify(folders));
}

// Supprimer un repertoire
function removeFolder(folder) {
    let folders = getFolders();
    folders.splice(folders.indexOf(folder), 1);
    localStorage.setItem("folders", JSON.stringify(folders));
}

// Modifier un repertoire
function editFolder(folder, title) {
    folder.title = title;
    localStorage.setItem("folders", JSON.stringify(getFolders()));
}

// Recuperer les repertoires
function getFolders() {
    createLocalStorage();
    return JSON.parse(localStorage.getItem("folders"));
}

// Ajouter une tache
function addTask(task) {
    let tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Supprimer une tache
function removeTask(task) {
    let tasks = getTasks();
    tasks.splice(tasks.indexOf(task), 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Modifier une tache
// Modifier une tâche
function editTask(taskId, title, description, dueDate, priority,repertory) {
    let tasks = getTasks();

    // Recherche de la tâche à modifier
    const taskIndex = tasks.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        // Mettre à jour les propriétés de la tâche
        tasks[taskIndex].title = title;
        tasks[taskIndex].description = description;
        tasks[taskIndex].dueDate = dueDate;
        tasks[taskIndex].priority = priority;
        tasks[taskIndex].repertory = repertory;

        // Mettre à jour le tableau des tâches dans le stockage local
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}


// Recuperer les taches
function getTasks() {
    createLocalStorage();
    return JSON.parse(localStorage.getItem("tasks"));
}

// Creer un repertoire
function createFolder(title) {
    return {
        id: Date.now() + title,
        title: title,
    };
}

// Creer une tache
function createTask(title, description, dueDate, priority, repertory, completed = false) {
    return {
        id: Date.now() + title,
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        emettedDate: Date.now(),
        completed: completed,
        repertory: repertory,
    };
}

// Changer de repertoire
function changeFolder(folderName) {
    createLocalStorage();
    localStorage.setItem("currentFolder", JSON.stringify(folderName));
}

// Recuperer le repertoire actuel
function getCurrentFolder() {
    return JSON.parse(localStorage.getItem("currentFolder"));
}

// Export

export {
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
    getCurrentFolder,
}

