import { Router } from 'express';

const usersRouter = Router();

// usersRouter.get('/:userId', (req, res) => {
//   console.log(req.query.page, req.query.size);
//   res.send(`Get user ${req.params.userId}`);
// });
// usersRouter.post('/create', (req, res) => {
//   res.send('콱그냥');
// });
usersRouter.post('/', (req, res) => {
  // console.log(req.body.seohyun);
  console.log(req.get('user-agent'));
  res.send(`post user`);
});

export default usersRouter;
