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
function jsonMiddleware(status, res) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
}

// Route handler for GET /
function rootHandler(req, res) {
  jsonMiddleware(200, res);
  res.end(JSON.stringify({ message: 'Welcome bro' }));
}

// Route handler for GET /api/users
function getUsersHandler(req, res) {
  jsonMiddleware(200, res);
  res.end(JSON.stringify(users));
}

// Route handler for GET /api/users/:id
function getUserByIDHandler(req, res) {
  jsonMiddleware(200, res);
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
  jsonMiddleware(404, res);
  res.end(JSON.stringify({ message: 'User does not exist' }));
}

// Route handler Server Error
function serverErrorHandler(req, res, error) {
  jsonMiddleware(500, res);
  res.end(JSON.stringify({ error: error.message || 'Interal Server Error' }));
}

const server = createServer((req, res) => {
  logger(req, res, function next() {
    const action_type = req.method === 'GET';
    try {
      switch (true) {
        case req.url === '/' && action_type:
          return rootHandler(req, res);
        case req.url === '/api/v1/users' && action_type:
          return getUsersHandler(req, res);
        case req.url.match(/\/api\/v1\/users\/([0-9]+)/) && action_type:
          return getUserByIDHandler(req, res);
        default:
          return notFoundHandler(req, res);
      }
    } catch (error) {
      serverErrorHandler(req, res, error);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
