// 요소 가져오기
const addTodo = document.getElementById('add-todo');

const todo = document.getElementById('todo');
todo.classList.add('board__list');

const inProgress = document.getElementById('inProgress');
inProgress.classList.add('board__list');

const done = document.getElementById('done');
done.classList.add('board__list');

// addTodo 클릭 시 li요소생성
// addButton이 존재하면 클릭불가능
let canClick = 1;
addTodo.addEventListener('click', () => {
  if (canClick === 1) addChartCard();
});

function addChartCard() {
  canClick = 0;
  const boardCard = document.createElement('li');
  boardCard.classList.add('board__card');

  const form = document.createElement('form');

  const input = document.createElement('input');
  input.setAttribute('placeholder', '제목...');
  input.setAttribute('type', 'text');
  input.setAttribute('name', '제목');
  input.required = true;

  const hr = document.createElement('hr');

  const textarea = document.createElement('textarea');
  textarea.setAttribute('placeholder', '내용...');
  textarea.setAttribute('name', '내용');
  textarea.required = true;
  // required 어케넣는지 몰라서 지피티의 힘을 빌림

  const addButton = document.createElement('button');
  addButton.innerText = '추가';
  addButton.setAttribute('type', 'submit');

  // 추가버튼 클릭 시
  addButton.addEventListener('click', () => {
    // 값이 비어있으면 안되게.. 근데 required를 설정해줬는데 왜 이것도 이중으로 해야 적용이 되는건지?? ㅠㅠ..
    if (input.value !== '') {
      const h4 = document.createElement('h4');
      h4.innerText = input.value;

      const p = document.createElement('p');
      p.innerText = textarea.value;

      form.replaceChild(h4, input);
      form.replaceChild(p, textarea);

      addButton.remove();
      canClick = 1;
      const nextButton = document.createElement('button');
      nextButton.classList.add('board__next-button');
      nextButton.classList.add('todoNextButton');
      nextButton.innerText = '→';

      boardCard.append(nextButton);

      // 화살표 버튼 클릭 시
      nextButton.addEventListener('click', () => {
        if (nextButton.classList.contains('todoNextButton')) {
          boardCard.prepend(form);
          inProgress.prepend(boardCard);
          // todo.removeChild(boardCard);
          // 왜 지우지않아도 전 과정에서의 boardCard가 사라지는지? 그리고 이건 왜 오류가나는건지?
          nextButton.classList.remove('todoNextButton');
          nextButton.classList.add('inProgressNextButton');
        } else if (nextButton.classList.contains('inProgressNextButton')) {
          done.prepend(boardCard);
          // inProgress.removeChild(boardCard);
          nextButton.classList.remove('inProgressNextButton');
          nextButton.classList.add('doneNextButton');
        }
        // else if (nextButton.classList.contains('doneNextButton'))
        //   done.removeChild(boardCard);
      });
    }
  });
  form.append(input, hr, textarea, addButton);
  boardCard.appendChild(form);
  todo.prepend(boardCard);
}
