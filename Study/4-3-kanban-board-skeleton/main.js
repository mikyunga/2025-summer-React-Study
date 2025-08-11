// 1. 요소 가져오기
const addTodoBtn = document.getElementById('add-todo'); // 새로운 todo 생성 버튼
const todoUl = document.getElementById('todo'); // TODO
const inProgressUl = document.getElementById('inProgress'); // IN PROGRESS
const doneUl = document.getElementById('done'); // DONE

// 2. todo 카드 생성 (첫번째 칸)
function createTodo() {
  // 요소 생성하기
  const todoForm = document.createElement('form');
  const todoLi = document.createElement('li'); // li
  const todoInput = document.createElement('input'); // 제목
  const todoHr = document.createElement('hr'); // 구분선
  const todoTextarea = document.createElement('textarea'); // 본문
  const createBtn = document.createElement('button'); // 생성 버튼

  todoForm.setAttribute('id', 'trimForm');

  todoInput.setAttribute('placeholder', '제목...');
  todoInput.setAttribute('type', 'text');
  todoInput.setAttribute('id', 'todoInput');
  todoInput.setAttribute('required', '');

  todoTextarea.setAttribute('placeholder', '내용...');
  todoTextarea.setAttribute('id', 'todoTextarea');
  todoTextarea.setAttribute('required', '');

  createBtn.innerText = '추가';

  todoUl.classList.add('board__list');
  todoLi.classList.add('board__card');

  // 사용자가 작성한 값 초기화
  let textTitle = '';
  let textContents = '';

  // 새로운 todo는 앞에 생성되어야 하기 때문에 prepend
  todoUl.prepend(todoLi);
  todoLi.appendChild(todoForm);
  todoForm.append(todoInput, todoHr, todoTextarea, createBtn);

  // 제목 저장하기
  todoInput.addEventListener('change', (e) => {
    textTitle = e.target.value;
  });

  // 내용 저장하기
  todoTextarea.addEventListener('change', (e) => {
    textContents = e.target.value;
  });

  // todo 추가
  createBtn.addEventListener('click', () => {
    if (textTitle !== '' && textContents !== '') {
      // 요소 생성하기
      const todo = document.createElement('li'); // li
      const title = document.createElement('h4'); // 제목
      const todoHr = document.createElement('hr'); // 구분선
      const contents = document.createElement('p'); // 본문
      const nextBtn = document.createElement('button'); // 다음 버튼

      // 클래스 추가하기 (스타일)
      todo.classList.add('board__card');
      nextBtn.classList.add('board__next-button');
      nextBtn.innerText = '→';

      // 작성한 내용 삽입 (제목, 내용)
      title.innerText = textTitle;
      contents.innerText = textContents;

      // todo 생성
      todoLi.remove();
      todoUl.prepend(todo);
      todo.append(title, todoHr, contents, nextBtn);

      // todo 다음 단계로 넘기기 이런 방법도... 되지 않을까? 해서 parentElement 찾아봄
      // nextBtn.addEventListener("click", () => {
      //   todo.parentElement.getAttribute("id") === "todo"
      //     ? inProgressUl.prepend(todo)
      //     : doneUl.prepend(todo);
      // });

      // todo 다음 단계로 넘기기
      // 딱히 좋은 방법 같진 않은데... 제 머리에서 되는 방법이 이거 뿐...이었어요...
      nextBtn.addEventListener('click', () => {
        inProgressUl.prepend(todo);
        nextBtn.addEventListener('click', () => {
          doneUl.prepend(todo);
          nextBtn.addEventListener('click', () => {
            // todo.remove();
          });
        });
      });
    }
  });
}

// 새로운 todo 만들기
// 누르면 계속 생성되는데 작성 도중 더 중요한 todo를 만들고 싶어질 수 있으니까요!
addTodoBtn.addEventListener('click', () => {
  createTodo();
});
