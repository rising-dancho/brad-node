import { createServer } from 'http';
const PORT = 4000;

const users = [
  { id: 1, name: 'tan lao' },
  { id: 2, name: 'bing long' },
  { id: 3, name: 'tang tong' },
];

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

const server = createServer((req, res) => {
  logger(req, res, function next() {
    if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(
        '<h1>Welcome bro</h1> <img src="https://p16-tm-sg.tiktokmusic.me/img/tos-alisg-v-2102/1c005cfb6b21488e8b499241530e364a~c5_500x500.image" alt="welcome bro">'
      );
    } else if (req.url === '/api/v1/users' && req.method === 'GET') {
      try {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
      }
    } else if (
      req.url.match(/\/api\/v1\/users\/([0-9]+)/) &&
      req.method === 'GET'
    ) {
      const id = req.url.split('/')[4];
      const user = users.find((user) => user.id === parseInt(id));
      // console.log('id:', id);

      if (user) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
      } else {
        res.write(404, { 'Content-Type': 'text/html' });
        res.end('<h1>User does not exist</h1>');
      }
      try {
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 Page not found</h1>');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
