const posts = [
  { id: 1, title: 'Post one' },
  { id: 2, title: 'Post two' },
];

function getPosts() {
  return posts;
}

export function getPostLength() {
  return posts.length;
}

export default getPosts;
