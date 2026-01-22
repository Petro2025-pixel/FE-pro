const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = 'rozetka_super_secret_key';
const DB_FILE = path.join(__dirname, 'products.json');

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true
}));

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const generateNextId = (products) => {
  if (products.length === 0) return 1;
  
  const numericIds = products
    .map(p => p.id)
    .filter(id => typeof id === 'number' && Number.isInteger(id))
    .sort((a, b) => a - b);
  
  if (numericIds.length === 0) return 1;
  
  const maxId = numericIds[numericIds.length - 1];
  
  for (let i = 1; i <= maxId; i++) {
    if (!numericIds.includes(i)) {
      return i;
    }
  }
  
  return maxId + 1;
};

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
  
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '123') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Incorrect username or password' });
});

app.get('/products', authenticateToken, (req, res) => {
  const products = readData();
  res.json(products);
});

app.post('/products', authenticateToken, (req, res) => {
  const products = readData();
  
  const nextId = generateNextId(products);
  
  const newProduct = { 
    ...req.body, 
    id: nextId 
  };
  
  products.push(newProduct);
  writeData(products);
  res.status(201).json(newProduct);
});

app.put('/products/:id', authenticateToken, (req, res) => {
  let products = readData();
  const id = Number(req.params.id);
  
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  products[index] = { ...products[index], ...req.body, id };
  writeData(products);
  res.json({ success: true });
});

app.delete('/products/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  
  let products = readData();
  
  const exists = products.find(p => p.id === id);
  if (!exists) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const filteredProducts = products.filter(p => p.id !== id);
  writeData(filteredProducts);
  
  res.json({ message: 'The item has been successfully removed', id });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));