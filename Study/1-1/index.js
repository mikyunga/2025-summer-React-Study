// console.log('Hello Browser');
// document.getElementById('button').addEventListener('click', () => {
//   console.log('clicked');
// });

const a = 30;
const b = 30;

// console.log(a === b);

const obj1 = {
  name: 'sejin',
};
const obj2 = {
  name: 'sejin',
};

// 얕은 비교
console.log(obj1 === obj2);

// 깊은 비교
let isSame = false;
if (obj1.name === obj2.name) isSame = true;
console.log(isSame);
