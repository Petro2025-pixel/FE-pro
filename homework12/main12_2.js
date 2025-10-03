let btn = "";
const handleButtonClick = (buttonNumber) => {
    btn = buttonNumber;
    showButtonNumber();
};
document
    .querySelector(".button_1")
    .addEventListener("click",  () =>
        { btn = 1; handleButtonClick(1)
        }
        );
document
        .querySelector(".button_2")
        .addEventListener(
          "click",
          () =>
            { btn = 2; handleButtonClick(2)
            })
document
        .querySelector(".button_3")
        .addEventListener(
          "click",
          () =>
            { btn = 3; handleButtonClick(3)
            }
 );
function showButtonNumber() {
const container = document.getElementById("answer_set");
container.textContent = "Клікнуто на кнопці: Кнопка " + btn; 
}
