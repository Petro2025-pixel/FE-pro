import { showAlert } from './showAlert.js';
import { getId } from './getId.js';
import { renderToDoList } from './renderToDoList.js';
// ----------------
let toDoList = [];

// renderToDoList(toDoList);



function showToDoText() {
    const $inputElement = $("#myInput");
    const text = $inputElement.val().trim(); 

    if (!text) {
        showAlert("Введіть текст завдання!", "warning", "#exclamation-triangle-fill");
        return;
    }

    const newId = getId();
    const newTaskData = {
        id: newId,
        text: text,
        completed: false
    };

    toDoList.push(newTaskData);
    renderToDoList(toDoList);
    $inputElement.val("");

    showAlert("Завдання успішно додано!", "success", "#check-circle-fill");
}

$(".button_add").on("click", showToDoText);

$("#todo_list").on("click", ".button_delete", function() {
    const $li = $(this).closest("li");
    const taskId = Number($li.data("id"));

    toDoList = toDoList.filter(task => task.id !== taskId); 
    renderToDoList(toDoList);
    showAlert("Завдання видалено.", "info", "#trash-fill");
});

$("#todo_list").on("click", ".todo_checkbox", function(event) {
    event.stopPropagation();

    const $li = $(this).closest("li");
    const taskId = Number($li.data("id"));
    const taskIndex = toDoList.findIndex(task => task.id === taskId); 
    
    if (taskIndex !== -1) {
        const isChecked = $(this).prop('checked');
        
        toDoList[taskIndex].completed = isChecked;
        renderToDoList(toDoList);
        
    const alertMessage = isChecked ? "Завдання завершено! 🎉" : "Завдання відновлено.";
    const alertType = isChecked ? "success" : "info";
    const alertIcon = isChecked ? "#check-circle-fill" : "#info-fill";
    showAlert(alertMessage, alertType, alertIcon);
    }
});

$("#open-save").on("click", ".button_save", function() {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    showAlert("Список збережено!", "success", "#check-circle-fill");
});


$("#open-save").on("click", ".button_open", function() {
    const storedList = localStorage.getItem('toDoList');
    if (storedList) {
        toDoList = JSON.parse(storedList);
        
        renderToDoList(toDoList); 
        
        showAlert("Список завантажений!", "warning", "#info-fill");
    } else {
        showAlert("Немає збережених даних!", "danger", "#exclamation-triangle-fill");
    }
});

$("#todo_list").on("click", "li", function(event) {
    if ($(event.target).is(".todo_checkbox, .button_delete")) {
        return; 
    }

    const $li = $(this);
    const taskId = Number($li.data("id"));

    const task = toDoList.find(t => t.id === taskId);

    if (task) {
        const statusText = task.completed ? "Завершено ✅" : "Активно ⏳";
        
        $("#modalTaskText").text(task.text);
        $("#modalTaskStatus").text(statusText);

        const modalTitle = task.completed ? "Деталі завершеного завдання" : "Деталі активного завдання";
        $("#taskDetailsModalLabel").text(modalTitle);

        const taskModal = new bootstrap.Modal(document.getElementById('taskDetailsModal'));
        taskModal.show();
    }
});

$(function() {
    const storedList = localStorage.getItem('toDoList');
    if (storedList) {
        toDoList = JSON.parse(storedList);
        renderToDoList(toDoList);
    }
});