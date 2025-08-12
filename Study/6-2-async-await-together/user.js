const nameEl = document.getElementById('name');
const usernameEl = document.getElementById('username');
const emailEl = document.getElementById('email');
const phoneEl = document.getElementById('phone');
const websiteEl = document.getElementById('website');

// 쿼리파라미터로 URL에서 Id뽑아오기
const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
const userId = searchParams.get('userId');

async function fetchUser() {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    return await response.json();
  } catch {}
}

function render(user) {
  nameEl.innerText = user.name;
  usernameEl.innerText = user.username;
  emailEl.innerText = user.email;
  phoneEl.innerText = user.phone;
  websiteEl.innerText = user.website;
  websiteEl.setAttribute('href', 'https://www.' + user.website);
  // 새탭으로가기
  websiteEl.setAttribute('target', '_blank');
}

async function init() {
  const user = await fetchUser();
  console.log(user);
  render(user);
}
init();
