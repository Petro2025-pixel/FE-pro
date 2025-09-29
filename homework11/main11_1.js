const container = document.getElementById("container");
for (let i = 1; i <= 10; i++) {
  const row = document.createElement("div");
  row.style.display = "flex";   
  for (let j = 1; j <= 10; j++) {
    const cell = document.createElement("div");
    cell.textContent = i * j;
    cell.style.fontSize = "20px";
    cell.style.border = "1px solid black";
    cell.style.width = "60px";
    cell.style.height = "60px";
    cell.style.display = "flex";
    cell.style.alignItems = "center";
    cell.style.justifyContent = "center";
    row.appendChild(cell);
  }
  container.appendChild(row);
}