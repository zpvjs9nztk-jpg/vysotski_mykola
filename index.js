// index.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const PORT = 3000;

// Налаштування PostgreSQL з environment variables
const client = new Client({
  host: process.env.PGHOST || 'localhost',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  database: process.env.PGDATABASE || 'mydb',
  port: process.env.PGPORT || 5432,
});

client.connect()
  .then(() => console.log('✅ Підключення до PostgreSQL успішне'))
  .catch(err => console.error('❌ Помилка підключення до PostgreSQL:', err));

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'dist', 'index.html');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>Помилка сервера</h1>');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}`);
});

