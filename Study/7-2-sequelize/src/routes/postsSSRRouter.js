import { Router } from 'express';
import posts from '../data/posts.js';

const postsSSRRouter = Router();

// Create
// 게시글 생성 페이지로 이동
postsSSRRouter.get('/create', (req, res) => {
  return res.render('posts/create');
});

// 게시글 생성 및 posts로 이동
postsSSRRouter.post('/create', (req, res) => {
  // 1단계: Req 객체의 정보를 바탕으로 필요한 작업 수행
  const { title, content } = req.body;

  // 유효성 검사 ********중요*********
  if (!title || !content)
    return res
      .status(400)
      .json(next(new Error('title and content must exist')));

  posts.push({
    id: posts[posts.length - 1].id + 1,
    title,
    content,
  });

  // 2,3단계: Res 객체에 응답 데이터를 담고, 응답 보내기
  return res.redirect('/posts');
});

// Read
// Read는 get 하나만 필요함
// 게시글 조회
postsSSRRouter.get('/', (req, res) => {
  return res.render('posts/posts', { posts });
});

// 게시글 단일 조회
postsSSRRouter.get('/:postId', (req, res) => {
  return res.render('posts/post', {
    post: posts.find((post) => post.id === parseInt(req.params.postId)),
  });
});

// Update
postsSSRRouter.get('/:postId/update', (req, res) => {
  return res.render('posts/update', {
    post: posts.find((post) => post.id === parseInt(req.params.postId)),
  });
});

postsSSRRouter.post('/:postId/update', (req, res) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  // 유효성 검사
  // postId를 보내줬는가
  if (!postId)
    return res.status(400).json({
      status: 'failed',
      message: 'postId must exist',
    });

  // title과 content가 둘 다 없으면 안됨 (한쪽만 없는건 ㄱㅊ)
  if (!title && !content)
    return res.status(400).json({
      status: 'failed',
      message: 'at least one property must exist',
    });

  // 요청한 postId가 데이터에 존재하는 id인가?
  const foundPost = posts.find((post) => post.id === parseInt(postId));
  if (!foundPost)
    return res.status(404).json({
      status: 'failed',
      message: 'post not found',
    });

  // 내용 수정
  if (title) foundPost.title = title;
  if (content) foundPost.content = content;

  return res.redirect(`/posts/${postId}`);
});

// Delete
// API가 하나만 필요함
postsSSRRouter.post('/:postId/delete', (req, res) => {
  const { postId } = req.params;

  // 유효성 검사
  // 요청에 postId가 존재하는가?
  if (!postId)
    return res.status(400).json({
      status: 'failed',
      message: 'postId must exist',
    });

  // 요청한 postId가 데이터에 존재하는 id인가?
  const foundPostIndex = posts.findIndex(
    (post) => post.id === parseInt(postId)
  );
  if (foundPostIndex === -1)
    return res.status(404).json({
      status: 'failed',
      message: 'post not found',
    });

  // 배열에서 해당 인덱스부터 1개의 요소를 삭제함
  posts.splice(foundPostIndex, 1);

  return res.redirect(`/posts`);
});
export default postsSSRRouter;
