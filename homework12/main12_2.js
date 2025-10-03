let btn = "";
const handleButtonClick = (buttonNumber) => {
    btn = buttonNumber;
    showButtonNumber();
};
document.querySelector(".btn_set").addEventListener("click", (event) => {
  if (event.target.classList.contains("button_1")) handleButtonClick(1);
  if (event.target.classList.contains("button_2")) handleButtonClick(2);
  if (event.target.classList.contains("button_3")) handleButtonClick(3);  
});

function showButtonNumber() {
const container = document.getElementById("answer_set");
container.textContent = "Клікнуто на кнопці: Кнопка " + btn; 
}