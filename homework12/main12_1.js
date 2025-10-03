let enteredLink = "";
document
    .querySelector(".button_1")
    .addEventListener(
        "click",
        () =>
        { enteredLink = prompt("Введить посилання");
               if (enteredLink === null) {
                enteredLink = ""; 
            }
        }
        );
document
        .querySelector(".button_2")
        .addEventListener(
          "click",
          () =>
            {if (enteredLink) { 
                location.href = enteredLink;
            } else {
                 alert("Спочатку введить посилання, натиснувши кнопку 1");
            }
        }
        );