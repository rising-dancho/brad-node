import http from 'http';
import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  // res.setHeader('Content-Type', 'text/plain');
  // res.statusCode = 200;
  // res.writeHead(400, { 'Content-Type': 'text/html' });
  // res.writeHead(400, { 'Content-Type': 'application/json' });

  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Homepage</h1>');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
