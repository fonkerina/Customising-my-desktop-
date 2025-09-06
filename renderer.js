     
window.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('close-btn');

    closeBtn.addEventListener('click', () => {
        window.electronAPI.closeWindow();
    });

    const input = document.getElementById('new-task')
    const tasksList = document.getElementById('tasks');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function render() {
        tasksList.innerHTML = '' ;
        tasks.forEach((task,i) => { 
            const li = document.createElement("li");
            li.textContent = task.text;
            if (task.completed) li.classList.add('completed');

            li.addEventListener('click', () => {
                task.completed =!task.completed;
                li.classList.toggle('completed');
                saveTasks();
            });

            li.addEventListener('dblclick', () => {
            tasks.splice(i, 1);
            render();
            saveTasks();
            });

            tasksList.appendChild(li);
        });
    }

    function saveTasks() {
        const uncompletedTasks = tasks.filter(t => !t.completed).map(t => ({ text: t.text }));
        localStorage.setItem('tasks', JSON.stringify(uncompletedTasks));
    }

    function addTask(text){
        if (!text.trim()) return; //ignores empty input
        tasks.push({text, completed: false});
        render();
        saveTasks();
        input.value = ''; //clears text box
    }

    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') addTask(input.value);
    }); //inputs task when enter key is pressed 

    render();
});
