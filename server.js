import fs from 'fs';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  // res.setHeader('Content-Type', 'text/plain');
  // res.statusCode = 200;
  // res.writeHead(400, { 'Content-Type': 'text/html' });
  // res.writeHead(400, { 'Content-Type': 'application/json' });
  try {
    if (req.method === 'GET') {
      if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>Homepage</h1>');
      } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h1>About</h1>');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>Page not found</h1>');
      }
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
