import http from 'http';
import fs from 'fs/promises';
import url from 'url';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log('__filename', __filename);
// console.log('__dirname', __dirname);

const server = http.createServer(async (req, res) => {
  // res.setHeader('Content-Type', 'text/plain');
  // res.statusCode = 200;
  // res.writeHead(400, { 'Content-Type': 'text/html' });
  // res.writeHead(400, { 'Content-Type': 'application/json' });
  try {
    if (req.method === 'GET') {
      let filepath;
      if (req.url === '/') {
        filepath = path.join(__dirname, 'public', 'home.html');
      } else if (req.url === '/about') {
        filepath = path.join(__dirname, 'public', 'about.html');
      } else {
        filepath = path.join(__dirname, 'public', 'notFound.html');
      }
      const data = await fs.readFile(filepath);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    } else {
      throw new Error('Method not allowed');
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end("<h1>'Server Error'</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
