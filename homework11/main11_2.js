let originalColor = null;
let isRed = false;

function changeText(IdElement) {
    let element = document.getElementById(IdElement);

    if (!isRed) {
        originalColor = window.getComputedStyle(element).color; 
        element.style.color = "red";
        isRed = true;
    } else {
        element.style.color = originalColor; 
        isRed = false;
    }
}