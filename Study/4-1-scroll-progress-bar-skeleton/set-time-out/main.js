const clearBtn = document.getElementById('clearBtn');

const timeout = setTimeout(() => {
  console.log('hello world');
}, 5000);

const interval = setInterval(() => {
  console.log('bye');
}, 1000);

clearBtn.addEventListener('click', () => {
  // timeout, interval 예약해놓은 것을 삭제(중단)
  // 지금까지 나온것만 유지하고, 이후의 timeout이나 interval은 실행하지X
  clearTimeout(timeout);
  clearInterval(interval);
});

// setTimeout을 setInterval처럼 쓰는 방법
// 실제론 interval은 잘 안쓰고 timeout을 이런식으로 쓰는 경우가 많다고 함
function sayYo() {
  setTimeout(() => {
    console.log('yo');
    sayYo();
  }, 1000);
}
sayYo();

// 타이머함수 활용 예제
let currentNumber = 0;
const numberEl = document.getElementById('number');
numberEl.innerText = currentNumber;

function timer() {
  setTimeout(() => {
    currentNumber++;
    numberEl.innerText = currentNumber;
    timer();
  }, 1000);
}
timer();
