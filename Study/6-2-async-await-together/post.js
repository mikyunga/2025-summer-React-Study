const titleEl = document.getElementById('title');
const userEl = document.getElementById('user');
const bodyEl = document.getElementById('body');
const commentsList = document.getElementById('commentsList');

// 쿼리파라미터로 URL에서 Id뽑아오기
const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
const postId = searchParams.get('postId');

async function fetchPost() {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    return await response.json();
  } catch {}
}

async function fetchComments() {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    return await response.json();
  } catch {}
}

async function fetchUser(userId) {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return await response.json();
  } catch {}
}

function render(post, comments, user) {
  titleEl.innerText = post.title;

  userEl.innerText = user.username;
  userEl.setAttribute('href', `user.html?userId=${user.id}`);

  bodyEl.innerText = post.body;

  commentsList.innerHTML = comments.reduce(
    (acc, comment) =>
      acc +
      `
  <li>${comment.name}|${comment.body}</li>
  `,
    ''
  );
}

async function init() {
  const post = await fetchPost();
  const comments = await fetchComments();
  const user = await fetchUser(post.userId);
  render(post, comments, user);
}

init();
