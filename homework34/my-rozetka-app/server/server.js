const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = 'rozetka_super_secret_key'; 
const DB_FILE = path.join(__dirname, 'products.json');

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const readData = () => {
  try {
    if (!fs.existsSync(DB_FILE)) return [];
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123') {
    const token = jwt.sign({ username, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ success: true, token });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});


app.get('/products', authenticateToken, (req, res) => {
  res.json(readData());
});


app.post('/products', authenticateToken, (req, res) => {
  const products = readData();
  const newProduct = { ...req.body, id: Date.now() };
  products.push(newProduct);
  writeData(products);
  res.status(201).json(newProduct);
});


app.put('/products/:id', authenticateToken, (req, res) => {
  let products = readData();
  const id = parseInt(req.params.id);
  products = products.map(p => p.id === id ? { ...p, ...req.body } : p);
  writeData(products);
  res.json({ success: true });
});


app.delete('/products/:id', authenticateToken, (req, res) => {
  let products = readData();
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  writeData(products);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));