let toDo = "";

const handleButtonClick = (buttonTask) => {
  toDo = buttonTask;
  showToDoText();
};

document.querySelector(".button_add").addEventListener("click", () => {
  handleButtonClick("addTask");
});

function showToDoText() {
  const container = document.getElementById("todo_list");
  const inputElement = document.getElementById("myInput");
  const text = inputElement.value.trim();

  if (!text) return;

  if (toDo === "addTask") {
    const li = document.createElement("li");
    li.textContent = text + " "; 

    
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete task";
    delBtn.classList.add("button_delete");

    li.appendChild(delBtn);
    container.appendChild(li);
  }

  inputElement.value = ""; 
}


document.getElementById("todo_list").addEventListener("click", (event) => {
  if (event.target.classList.contains("button_delete")) {
    const li = event.target.closest("li"); 
    li.remove(); 
  }
});



