     
window.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('close-btn');

    closeBtn.addEventListener('click', () => {
        window.electronAPI.closeWindow();
    });

    const input = document.getElementById('new-task')
    const taskcontainer = document.getElementById('tasks')

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function render() {
        taskcontainer.innerHTML = ""; //clears existing 'li' items
        tasks.forEach((task,i) => { 
            const li = document.createElement("li");
            li.textContent = task.text;
            if (task.completed) li.classList.add('done');

            li.addEventListener('click', () => {
                task.completed =!task.completed;
                li.classList.toggle('done');
                saveTasks();
            });

            li.addEventListener('dblclick', () => {
            tasks.splice(i, 1);
            render();
            });

            taskcontainer.appendChild(li); //appends node and returns it
        });
    }

    function addTask(text){
        if (!text.trim()) return; //ignores empty input?
        tasks.push({text, completed: false});
        render();
        saveTasks();
        input.value = ''; //clears text box
    }

    function saveTasks() {
        const uncompletedTasks = tasks.filter(t => !t.completed).map(t => ({ text: t.text }));
        localStorage.setItem('tasks', JSON.stringify(uncompletedTasks));
    }

    input.addEventListener('keydown', e => {
        if (e.key === 'Enter') addTask(input.value);
    }); //inputs task when enter key is pressed 

    closeBtn.addEventListener('click', () => {
        window.electronAPI.closeWindow();
    });

    render();
});
