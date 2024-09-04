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
function jsonMiddleware(res, status) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
}

// Route handler for GET /
function rootHandler(req, res) {
  jsonMiddleware(res, 200);
  res.end(JSON.stringify({ message: 'Welcome bro' }));
}

// Route handler for GET /api/v1/users
function getUsersHandler(req, res) {
  jsonMiddleware(res, 200);
  res.end(JSON.stringify(users));
}

// Route handler for GET /api/v1/users/:id
function getUserByIDHandler(req, res) {
  jsonMiddleware(res, 200);
  const id = req.url.split('/').pop(); // Extract the ID from the URL
  const user = users.find((user) => user.id === parseInt(id, 10));

  if (user) {
    res.end(JSON.stringify(user));
  } else {
    res.end(JSON.stringify({ message: 'User does not exist' }));
  }
}

// Route handler for POST /api/v1/users
function createUserHandler() {}

// Route handler for User Not Found
function notFoundHandler(req, res) {
  jsonMiddleware(res, 404);
  res.end(JSON.stringify({ message: 'Resource not found' }));
}

// Route handler for Server Error
function serverErrorHandler(req, res, error) {
  jsonMiddleware(res, 500);
  res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
}

// Request method checker
function action_type(req, method) {
  return req.method === method;
}

const server = createServer((req, res) => {
  logger(req, res, function next() {
    try {
      switch (true) {
        case req.url === '/' && action_type(req, 'GET'):
          return rootHandler(req, res);
        case req.url === '/api/v1/users' && action_type(req, 'GET'):
          return getUsersHandler(req, res);
        case req.url.match(/^\/api\/v1\/users\/(\d+)$/) &&
          action_type(req, 'GET'):
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
  console.log(`Server is listening on port ${PORT}`);
});
