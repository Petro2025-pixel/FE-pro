export function renderToDoList(list) {
    const $container = $("#todo_list");
    $container.empty();

   list.forEach(task => {
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