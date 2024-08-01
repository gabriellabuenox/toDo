document.getElementById('add-task-button').addEventListener('click', addTask);

document.getElementById('task-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function loadTasks() {
    const storedTasks = localStorage.getItem('todos');
    if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            createTaskElement(task.text, task.completed);
        });
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
        const text = taskItem.childNodes[1].nodeValue;
        const completed = taskItem.querySelector('.checkbox').checked;
        tasks.push({ text, completed });
    });
    localStorage.setItem('todos', JSON.stringify(tasks));
}

function createTaskElement(taskText, completed = false) {
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            taskItem.classList.add('completed');
        } else {
            taskItem.classList.remove('completed');
        }
        saveTasks();
    });

    taskItem.appendChild(checkbox);
    taskItem.appendChild(document.createTextNode(taskText));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        saveTasks();
    });

    taskItem.appendChild(deleteButton);
    if (completed) {
        taskItem.classList.add('completed');
    }

    taskList.appendChild(taskItem);
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    createTaskElement(taskText);
    taskInput.value = '';
    saveTasks();
}

// Load tasks from localStorage when the page loads
loadTasks();
