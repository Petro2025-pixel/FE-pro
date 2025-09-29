const images = [
  "0.jpg","1.jpg","2.jpg","3.jpg","4.jpg",
  "5.jpg","6.jpg","7.jpg","8.jpg","9.jpg"
];
const container = document.getElementById("container");

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function showRandomImage() {
  container.innerHTML = "";

  const randomImage = getRandomItem(images);
  const img = document.createElement("img");
  img.src = "images/" + randomImage;
  img.style.width = "500px";
  container.appendChild(img);
}