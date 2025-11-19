import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style23.css";

let toDoList = [];
let alertTimeoutId;

const alertElement = document.getElementById("appAlert");
const alertTextElement = document.getElementById("alertText");
const modalTaskText = document.getElementById("modalTaskText");
const modalTaskStatus = document.getElementById("modalTaskStatus");
const modalTitleElement = document.getElementById("taskDetailsModalLabel");
const myModal = new bootstrap.Modal(document.getElementById("taskDetailsModal"));

function getId() {
    return Date.now();
}

function showAlert(message, type = 'success') {
    alertTextElement.innerHTML = message;

    alertElement.classList.remove("alert-success", "alert-danger", "alert-warning", "alert-info");
    alertElement.classList.add(`alert-${type}`);

    alertElement.classList.remove('d-none');
    alertElement.classList.remove('show');
    setTimeout(() => alertElement.classList.add('show'), 10);

    if (alertTimeoutId) clearTimeout(alertTimeoutId);

    alertTimeoutId = setTimeout(() => {
        alertElement.classList.remove('show');
        setTimeout(() => {
            alertElement.classList.add('d-none');
            alertTimeoutId = null; 
        }, 300);
    }, 2000);
}

function renderToDoList() {
    const container = document.getElementById("todo_list");
    container.innerHTML = "";

    toDoList.forEach(task => {
        const li = document.createElement("li");
        li.dataset.id = task.id;
        if (task.completed) li.classList.add("completed");

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

async function showToDoText() {
    const input = document.getElementById("myInput");
    const text = input.value.trim();
    if (!text) {
        showAlert("Введіть текст завдання!", "warning");
        return;
    }

    const newTask = { id: getId(), text, completed: false };

    try {
        const res = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newTask)
        });

        if (!res.ok) throw new Error();

        const saved = await res.json();
        newTask.id = saved.id; 

        toDoList.push(newTask);
        renderToDoList();
        input.value = "";
        showAlert("Завдання додано та збережено!", "success");
    } catch {
        toDoList.push(newTask);
        renderToDoList();
        input.value = "";
        showAlert("Додано локально (сервер недоступний)", "warning");
    }
}

async function deleteTaskFromServer(id) {
    try {
        const res = await fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
        return res.ok;
    } catch {
        return false;
    }
}

async function loadTasksFromServer() {
    try {
        const res = await fetch("http://localhost:3000/tasks");
        if (!res.ok) throw new Error();
        toDoList = await res.json();
        renderToDoList();
        showAlert("Завдання завантажено з сервера!", "success");
    } catch {
        showAlert("Не вдалося підключитися до сервера. Працюємо офлайн.", "danger");
    }
}

async function saveAllToServer() {
    try {
        await fetch("http://localhost:3000/tasks", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(toDoList)
        });
        showAlert("Усі завдання збережено на сервері!", "success");
    } catch {
        showAlert("Не вдалося зберегти на сервер", "danger");
    }
}

function customConfirm(message) {
    document.getElementById("confirmText").textContent = message;
    const modal = new bootstrap.Modal(document.getElementById("customConfirmModal"));
    return new Promise(resolve => {
        const ok = document.getElementById("confirmOkBtn");
        const cancel = document.getElementById("confirmCancelBtn");
        const yes = () => { ok.removeEventListener("click", yes); cancel.removeEventListener("click", no); modal.hide(); resolve(true); };
        const no = () => { ok.removeEventListener("click", yes); cancel.removeEventListener("click", no); modal.hide(); resolve(false); };
        ok.addEventListener("click", yes);
        cancel.addEventListener("click", no);
        modal.show();
    });
}

document.getElementById("open-save").addEventListener("click", async e => {
    if (e.target.classList.contains("button_save_server")) {
        await saveAllToServer();
    }
    if (e.target.classList.contains("button_open_server")) {
        const confirmed = await customConfirm("Оновити список із сервера?\nЛокальні незбережені зміни буде втрачено.");
        if (confirmed) await loadTasksFromServer();
    }
});

document.getElementById("todo_list").addEventListener("click", async e => {
    const li = e.target.closest("li");
    if (!li) return;

    const taskId = Number(li.dataset.id);
    const task = toDoList.find(t => t.id === taskId);
    if (!task) return;

  
    if (e.target.classList.contains("button_delete")) {
        const confirmed = await customConfirm(`Видалити завдання "${task.text}"?`);
        if (!confirmed) return;

        const deleted = await deleteTaskFromServer(taskId);


        let finalDelete = deleted;
        if (!deleted) {
            finalDelete = await customConfirm("Сервер недоступний. Видалити локально?");
        }

        if (finalDelete) {
            toDoList = toDoList.filter(t => t.id !== taskId);
            renderToDoList();
            showAlert(`Завдання "${task.text}" видалено`, "info");
        } else if (!deleted) {
            showAlert("Видалення скасовано.", "warning");
        }
    }
   
    if (e.target.classList.contains("todo_checkbox")) {
        task.completed = e.target.checked;
        renderToDoList();

        try {
            await fetch(`http://localhost:3000/tasks/${taskId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: task.completed })
            });
        } catch {
            console.log("Не вдалося оновити статус на сервері");
        }
    }
    
    if (e.target.classList.contains("task_text")) {
        modalTaskText.textContent = task.text;
        modalTitleElement.textContent = task.completed ? "Деталі завершеного завдання" : "Деталі активного завдання";
        modalTaskStatus.textContent = task.completed ? "Завершено ✅" : "Активно ⏳";
        myModal.show();
    }
});

document.querySelector(".button_add").addEventListener("click", showToDoText);

loadTasksFromServer();