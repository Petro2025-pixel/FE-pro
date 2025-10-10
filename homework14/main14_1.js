
const images = [
    "0.jpg", "1.jpg", "2.jpg", "3.jpg", "4.jpg",
    "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"
];
let currentIndex = 0; 
const slideContainer = document.querySelector(".slide");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const sliderContainer = document.querySelector(".slider-wrapper"); 
const bulletsSet = document.getElementById("bullets_set"); 

function updateSlide() {
    slideContainer.innerHTML = "";
    const currentImage = images[currentIndex];
    const img = document.createElement("img");
    img.src = "images/" + currentImage;
    img.style.width = "500px";
    slideContainer.appendChild(img);
    btnPrev.style.visibility = (currentIndex === 0) ? "hidden" : "visible";
    btnNext.style.visibility = (currentIndex === images.length - 1) ? "hidden" : "visible";
    updateDots(); 
}

function showPrevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlide();
    }
}

function showNextSlide() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        updateSlide();
    }
}

function updateDots() {
    bulletsSet.innerHTML = "";

    for (let i = 0; i < images.length; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === currentIndex) {
            dot.classList.add("active");
        }
        dot.addEventListener("click", () => {
            currentIndex = i; 
            updateSlide();
        });
        bulletsSet.appendChild(dot);
    }
}

sliderContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-prev")) { 
        showPrevSlide(); 
    }
    if (event.target.classList.contains("btn-next")) { 
        showNextSlide(); 
    }
});

updateSlide();