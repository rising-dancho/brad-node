import { createServer } from 'http';
const PORT = process.env.PORT;

const users = [
  { id: 1, name: 'ben lao' },
  { id: 2, name: 'tan lao' },
  { id: 3, name: 'ting lao' },
];

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
