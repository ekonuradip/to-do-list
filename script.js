function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const priority = document.getElementById('priority').value;
    
    if (taskInput.value.trim() !== "") {
        const li = document.createElement('li');
        li.className = 'task';
        li.innerHTML = `
            <span class="check" onclick="toggleComplete(this)">✔️</span>
            <span class="task-text">${taskInput.value}</span>
            <span class="task-priority">${priority}</span>
            <span class="delete" onclick="deleteTask(this)">❌</span>
        `;
        li.setAttribute('data-priority', priority);
        
        // Tambahkan berdasarkan prioritas
        let added = false;
        for (let i = 0; i < taskList.children.length; i++) {
            const currentPriority = taskList.children[i].getAttribute('data-priority');
            if (comparePriority(priority, currentPriority) < 0) {
                taskList.insertBefore(li, taskList.children[i]);
                added = true;
                break;
            }
        }
        if (!added) {
            taskList.appendChild(li);
        }
        
        taskInput.value = '';
    }
}

function toggleComplete(element) {
    const task = element.parentNode;
    task.classList.toggle('completed');
}

function deleteTask(element) {
    const task = element.parentNode;
    task.remove();
}

function comparePriority(p1, p2) {
    const priorityOrder = { 'Tinggi': 3, 'Menengah': 2, 'Rendah': 1 };
    return priorityOrder[p2] - priorityOrder[p1];
}
