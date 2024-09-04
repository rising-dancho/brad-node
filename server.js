import { createServer } from 'http';
const PORT = 4000;

const users = [
  { id: 1, name: 'tan lao' },
  { id: 2, name: 'bing long' },
  { id: 3, name: 'tang tong' },
];

// Logger middleware
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

// JSON middleware
function jsonMiddleware(req, res, next) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  next();
}

// Route handler for GET /
function rootHandler(req, res) {
  res.end(JSON.stringify({ message: 'Welcome bro' }));
}

// Route handler for GET /api/users
function getUsersHandler(req, res) {
  res.end(JSON.stringify(users));
}

// Route handler for GET /api/users/:id
function getUserByIDHandler(req, res) {
  const id = req.url.split('/')[4];
  const user = users.find((user) => user.id === parseInt(id));

  if (user) {
    res.end(JSON.stringify(user));
  } else {
    res.end(JSON.stringify({ message: 'User does not exist' }));
  }
}

// Route handler for User Not Found
function notFoundHandler(req, res) {
  res.write(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'User does not exist' }));
}

const server = createServer((req, res) => {
  logger(req, res, function next() {
    jsonMiddleware(req, res, function next() {
      if (req.url === '/' && req.method === 'GET') {
        rootHandler(req, res);
      } else if (req.url === '/api/v1/users' && req.method === 'GET') {
        getUsersHandler(req, res);
      } else if (
        req.url.match(/\/api\/v1\/users\/([0-9]+)/) &&
        req.method === 'GET'
      ) {
        getUserByIDHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
