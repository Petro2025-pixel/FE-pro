let toDoList = [];

function getId() {
    return new Date().getTime();
}

function renderToDoList() {
    const container = document.getElementById("todo_list");
    container.innerHTML = ""; 

    toDoList.forEach(task => {
        const li = document.createElement("li");
        li.dataset.id = task.id; 

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.classList.add("todo_checkbox");
        checkBox.checked = task.completed;

        const taskTextSpan = document.createElement("span");
        taskTextSpan.textContent = task.text;
        taskTextSpan.classList.add("task_text");

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete task";
        delBtn.classList.add("button_delete");

        li.appendChild(checkBox);
        li.appendChild(taskTextSpan);
        li.appendChild(delBtn);

        container.appendChild(li);
    });
}

function showToDoText() {
    const inputElement = document.getElementById("myInput");
    const text = inputElement.value.trim();

    if (!text) return;

    const newId = getId();
    const newTaskData = {
        id: newId,
        text: text,
        completed: false
    };

    toDoList.push(newTaskData);
    renderToDoList(); 
    inputElement.value = "";
}

document.querySelector(".button_add").addEventListener("click", showToDoText);

document.getElementById("todo_list").addEventListener("click", (event) => {
    if (event.target.classList.contains("button_delete")) {
        const li = event.target.closest("li");

      const taskId = Number(li.dataset.id); 

        toDoList = toDoList.filter(task => task.id !== taskId); 
        renderToDoList();
    }

    if (event.target.classList.contains("todo_checkbox")) {
        const li = event.target.closest("li");

        const taskId = Number(li.dataset.id); 

        const taskIndex = toDoList.findIndex(task => task.id === taskId); 

        if (taskIndex !== -1) {
            toDoList[taskIndex].completed = event.target.checked;
            renderToDoList();
        }
    }
});

document.getElementById("open-save").addEventListener("click", (event) => {
    if (event.target.classList.contains("button_save")) {
        localStorage.setItem('toDoList', JSON.stringify(toDoList));
        alert("Список збережено!");
    }

    if (event.target.classList.contains("button_open")) {
        const storedList = localStorage.getItem('toDoList');
        if (storedList) {
            toDoList = JSON.parse(storedList);
            renderToDoList(); 
            alert("Список завантажений!");
        } else {
            alert("Немає збережених даних!");
        }
    }
});

(function initialize() {
    const storedList = localStorage.getItem('toDoList');
    if (storedList) {
        toDoList = JSON.parse(storedList);
        renderToDoList();
    }
})();