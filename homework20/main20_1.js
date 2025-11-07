/**
 * Отображает Bootstrap Alert с заданным текстом, типом (классом) и иконкой.
 * NOTE: Требует наличия элемента <div id="appAlert"> в HTML и SVG-спрайта Bootstrap Icons.
 * * @param {string} message - Текст сообщения.
 * @param {string} type - Класс Bootstrap alert (success, warning, danger, info).
 * @param {string} iconHref - Идентификатор иконки SVG (например, '#check-circle-fill').
 */
function showAlert(message, type, iconHref) {
    const $alert = $("#appAlert");
    const $alertText = $("#alertText");
    const $alertIcon = $("#alertIcon");

    $alert.removeClass("alert-success alert-warning alert-danger alert-info").addClass(`alert-${type}`);
    
    $alertText.text(message);
    $alertIcon.attr("xlink:href", iconHref);

    $alert.removeClass('d-none').hide().fadeIn(400);

    clearTimeout($alert.data('timer')); 
    const timer = setTimeout(() => {
        $alert.fadeOut(500, function() {
            $(this).addClass('d-none'); 
        });
    }, 3000);
    $alert.data('timer', timer); 
}
// ----------------
let toDoList = [];

function getId() {
    return new Date().getTime();
}

function renderToDoList() {
    const $container = $("#todo_list");
    $container.empty();

    toDoList.forEach(task => {
        const $li = $("<li>").data("id", task.id);
        
        if (task.completed) {
            $li.addClass("completed");
        }

        const $checkBox = $("<input>")
            .attr("type", "checkbox")
            .addClass("todo_checkbox")
            .prop("checked", task.completed);

        const $taskTextSpan = $("<span>")
            .text(task.text)
            .addClass("task_text clickable-text"); 

        const $delBtn = $("<button>")
            .text("Delete task")
            .addClass("button_delete");

        $li.append($checkBox, $taskTextSpan, $delBtn);
        $container.append($li);
    });
}

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
    renderToDoList(); 
    $inputElement.val("");

    showAlert("Завдання успішно додано!", "success", "#check-circle-fill");
}

$(".button_add").on("click", showToDoText);

$("#todo_list").on("click", ".button_delete", function() {
    const $li = $(this).closest("li");
    const taskId = Number($li.data("id"));

    toDoList = toDoList.filter(task => task.id !== taskId); 
    renderToDoList();
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
        renderToDoList(); 
        
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
        
        renderToDoList(); 
        
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
        renderToDoList();
    }
});