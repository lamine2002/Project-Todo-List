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

export {validation};