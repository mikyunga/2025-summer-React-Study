// req객체, rew객체, next함수가 들어옴
// next함수 : 다음 미들웨어로 넘어가는 함수
function logger(option) {
  return (req, res, next) => {
    console.log('==================================');
    if (option === 'simple') {
      console.log(`${req.method} ${req.url}`);
    } else if (option === 'basic') {
      console.log(`${req.method} ${req.url}`);
      console.log(req.body);
    } else {
      console.log(`${req.method} ${req.url}`);
      console.log(`Content-type: ${req.get('content-type')}`);
      console.log(req.body);
    }
    console.log('==================================');
    next();
  };
}
export default logger;
