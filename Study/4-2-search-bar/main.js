const searchInput = document.getElementById('query');
const keyword = document.getElementById('keyword');

// 디바운스
let timeoutId;

// timeoutId가 없는 상태에서, input이 들어옴
searchInput.addEventListener('input', (event) => {
  // 맨 처음이니까 timeoutId가 없어서(setTimeout안하면 id안생김) if문 넘어감
  if (timeoutId) clearTimeout(timeoutId);
  // 그냥 3초뒤에 나옴
  timeoutId = setTimeout(() => {
    keyword.innerText = event.target.value;
  }, 300);
});
// 첫 번째 글자와 두 번째 글자를 3초 이내로 치면, if문이 적용되어서 첫 번째 글자에서 생긴 timeout은 clear되고 두 번째 글자에서 생긴 (마지막 timeout) setTimeout이 적용됨 = 마지막으로 친 글자로부터 0.3초 후
