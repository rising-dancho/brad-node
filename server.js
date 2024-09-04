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
  // const id = req.url.split('/')[4];
  // const user = users.find((user) => user.id === parseInt(id));

  const match = req.url.match(/\/api\/v1\/users\/([0-9]+)/); // used a concept called capturing group () only applicable when using .match() method
  const id = match ? parseInt(match[1]) : null;
  const user = users.find((user) => user.id === id);

  if (user) {
    res.end(JSON.stringify(user));
  } else {
    res.end(JSON.stringify({ message: 'User does not exist' }));
  }
}

// User Not Found Handler
function notFoundHandler(req, res) {
  res.end(JSON.stringify({ message: 'User does not exist' }));
}

// Server Error Handler
function serverErrorHandler(req, res, error) {
  res.end(JSON.stringify({ error: error.message || 'Interal Server Error' }));
}

const server = createServer((req, res) => {
  logger(req, res, function next() {
    jsonMiddleware(req, res, function next() {
      try {
        if (req.method === 'GET') {
          switch (true) {
            case req.url === '/':
              return rootHandler(req, res);
            case req.url === '/api/v1/users':
              return getUsersHandler(req, res);
            case req.url.match(/\/api\/v1\/users\/([0-9]+)/):
              return getUserByIDHandler(req, res);
            default:
              return notFoundHandler(req, res);
          }
        }
      } catch (error) {
        serverErrorHandler(req, res, error);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
