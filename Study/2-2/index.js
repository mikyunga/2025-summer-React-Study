const post1 = {
  id: 1,
  title: '제곧내',
  contents: '배고파',
  user: {
    name: 'Jungmin',
    age: 24,
    password: 'abcd',
  },
};
const arr1 = ['a', 'b', 23, false];
const arr2 = ['c', 'E'];

//spread
console.log({ ...post1 }); //간단한 형태의 깊은 복사
console.log({ date: '2025/07/10', ...post1 }); //속성 추가
console.log({ ...post1, title: '안녕' }); //속성 수정
console.log({ title: '안녕', ...post1 }); //잘못된 방식임

//배열의 경우 수정할 땐 spread를 쓸 수 없음 (key가 없으므로)
console.log([...arr1]);
console.log([...arr1, 'hi']);
console.log([...arr1, ...arr2]); //concatenate (이어붙임)
