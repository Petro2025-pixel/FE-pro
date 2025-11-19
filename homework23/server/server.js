const express = require("express");
const cors = require("cors");
const fs = require("fs").promises;
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;
const DATA_FILE = path.join(__dirname, "data.json");

let serverTasks = [];

async function loadTasks() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf8");
    serverTasks = JSON.parse(data);
    console.log(`Завантажено ${serverTasks.length} задач із data.json`);
  } catch (err) {
    if (err.code === "ENOENT") {
      serverTasks = [];
      await saveTasks();
      console.log("Створено новий data.json");
    } else {
      console.error("Помилка завантаження:", err);
      serverTasks = [];
    }
  }
}

async function saveTasks() {
  await fs.writeFile(DATA_FILE, JSON.stringify(serverTasks, null, 2));
}

app.get('/', (req, res) => {
  res.send("ToDo Server працює! Документація: /tasks");
});

// Отримати всі завдання
app.get('/tasks', (req, res) => {
  res.json(serverTasks);
});

// Додати ОДНЕ нове завдання
app.post('/tasks', async (req, res) => {
  const task = req.body;

  // Перевірка формату
  if (!task || typeof task.text !== "string" || task.text.trim() === "") {
    return res.status(400).json({ error: "Поле 'text' обов'язкове і має бути непорожнім" });
  }

  const newTask = {
    id: Date.now(), 
    text: task.text.trim(),
    completed: task.completed ?? false
  };

  serverTasks.push(newTask);
  await saveTasks();

  console.log("Додано завдання:", newTask.text);
  res.status(201).json(newTask); // повертаємо створене завдання
});

// Видалити завдання за id
app.delete('/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);
  const index = serverTasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Завдання не знайдено" });
  }

  const [deletedTask] = serverTasks.splice(index, 1);
  await saveTasks();

  console.log("Видалено завдання:", deletedTask.text);
  res.json({ message: "Завдання видалено", deletedTask });
});

// Оновити завдання (наприклад, статус completed)
app.patch('/tasks/:id', async (req, res) => {
  const id = Number(req.params.id);
  const task = serverTasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Завдання не знайдено" });
  }

  if (typeof req.body.completed === "boolean") {
    task.completed = req.body.completed;
  }
  if (req.body.text && typeof req.body.text === "string") {
    task.text = req.body.text.trim();
  }

  await saveTasks();
  console.log("Оновлено завдання:", task.text, "completed:", task.completed);
  res.json(task);
});

// === Повна заміна списку (залишаємо для кнопки "Зберегти все") ===
app.put('/tasks', async (req, res) => {
  const tasks = req.body;
  if (!Array.isArray(tasks)) {
    return res.status(400).json({ error: "Очікується масив" });
  }

  serverTasks = tasks;
  await saveTasks();
  console.log(`Повна заміна: тепер ${serverTasks.length} завдань`);
  res.json({ message: "Список повністю оновлено", count: serverTasks.length });
});

// === Запуск сервера ===
loadTasks().then(() => {
  app.listen(port, () => {
    console.log(`Сервер запущено на http://localhost:${port}`);
  });
});