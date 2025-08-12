const postList = document.getElementById('postList');

async function fetchPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();

    return posts;
  } catch {}
}

function renderPosts(posts) {
  // 배열의 값을 하나씩 가져와 누적된 값을 생성
  const innerHTML = posts.reduce(
    (acc, post) =>
      acc +
      `
  <li><a href="post.html?postId=${post.id}">${post.title}</a></li>
  `,
    ''
  );
  postList.innerHTML = innerHTML;
}

async function init() {
  const posts = await fetchPosts();
  renderPosts(posts);
}

init();
