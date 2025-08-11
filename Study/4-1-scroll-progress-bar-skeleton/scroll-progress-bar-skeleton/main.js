const progress = document.getElementById('progress');
const progressList = document.getElementById('progress-list');

const h1 = document.querySelector('h1');
const h2s = document.querySelectorAll('h2');

const li = document.createElement('li');
li.innerText = h1.innerText;
li.classList.add('progress-bar__item');

h2s.forEach((h2) => {
  const li = document.createElement('li');
  li.innerText = h2.innerText;
  li.classList.add('progress-bar__item');
  progressList.append(li);
});

// 스크롤바 채우기 및 text 변환
window.addEventListener('scroll', () => {
  // 스크롤바 채우기
  const { scrollY, innerHeight } = window;
  // scrollY 문서기준 몇px만큼 스크롤을 내렸나?
  // innerHeight : 화면상 세로길이
  const { offsetHeight } = document.body;
  // 문서 전체의 높이

  const percentage = (scrollY / (offsetHeight - innerHeight)) * 100;
  // console.log(percentage);
  progress.style.width = `${percentage}%`;

  // text 변환
  let currentH2;
  let index = 0;
  for (const h2 of h2s) {
    const { offsetTop } = h2;

    if (offsetTop > scrollY) break;
    currentH2 = h2;
    index++;
  }
  console.log(index);
  progressList.style.top = `-${4 * index}rem`;
});

// 쓰로틀
let timeoutId;

window.addEventListener('scroll', () => {
  if (timeoutId) return;

  timeoutId = setTimeout(() => {
    console.log(window.scrollY);
    // timeout이 실행되서 null이 되기 전까지는 생성되는 timeout을 다 무시함
    //  = 처음 실행된 timeout만 살림
    timeoutId = null;
  }, 1000);
});
