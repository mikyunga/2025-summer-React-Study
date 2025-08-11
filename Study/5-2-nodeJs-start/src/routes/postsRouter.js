import { Router } from 'express';
import posts from '../data/posts';
const postsRouter = Router();

// Create
/**
 * [게시글 작성 API]
 * POST /api/posts
 * - request
 * - Body
 *    - title: str
 *    - content: str
 *
 * - response
 *
 */
postsRouter.post('/', (req, res) => {
  // 1단계: Req 객체의 정보를 바탕으로 필요한 작업 수행
  const { title, content } = req.body;

  // 유효성 검사 ********중요*********
  if (!title || !content)
    return res.status(400).json({
      status: 'failed',
      message: 'title and content must exist',
    });

  posts.push({
    id: posts[posts.length - 1].id + 1,
    title,
    content,
  });

  // 2,3단계: Res 객체에 응답 데이터를 담고, 응답 보내기
  return res.status(201).json({
    status: 'success',
    message: 'Post successfully created',
  });
});

// Read
/**
 * [게시글 전체 조회 API]
 * GET /api/posts
 *
 * - request
 *
 * - response
 *  - Body
 *      [
 *        {
 *          id: int,
 *          title: str,
 *          content: str,
 *         },
 *      ]
 */
postsRouter.get('/', (req, res) => {
  // 1단계 딱히 없음 (request에서 불러올 정보 없음)
  // 2,3단계
  return res.status(200).json({
    status: 'success',
    message: 'read successfully',
    data: posts,
  });
});

// Read
/**
 * [게시글 단일 조회 API]
 * GET /api/posts/:postId
 *
 * - request
 *  - Path Parameter
 *    - PostId: int
 *
 * - response
 *  - Body
 *      {
 *        id: int,
 *        title: str,
 *        content: str
 *       }
 */
postsRouter.get('/:postId', (req, res) => {
  // 1단계
  const { postId } = req.params;

  // 유효성 검사
  // 요청에 postId가 존재하는가?
  if (!postId)
    return res.status(400).json({
      status: 'failed',
      message: 'postId must exist',
    });

  // 요청한 postId가 데이터에 존재하는 id인가?
  const foundPost = posts.find((post) => post.id === parseInt(postId));
  if (!foundPost)
    return res.status(404).json({
      status: 'failed',
      message: 'post not found',
    });

  // 2,3단계
  return res.status(200).json({
    status: 'success',
    message: 'read successfully',
    data: foundPost,
  });
});

// Update
/**
 * [게시글 수정 API]
 * PATCH /api/posts/:postId
 *
 * - request
 *  - Path Parameter
 *    - PostId: int
 *  - Body
 *    - title: str,
 *    - content: str
 *
 * - response
 */
postsRouter.patch('/:postId', (req, res) => {
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

  return res.status(200).json({
    status: 'success',
    message: 'updated successfully',
  });
});

// Delete
/**
 * [게시글 삭제 API]
 * DELETE /api/posts/:postId
 *
 * - request
 *  - Path Parameter
 *    - PostId: int
 *
 * - response
 */
postsRouter.delete('/:postId', (req, res) => {
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

  return res.status(200).json({
    status: 'success',
    message: 'deleted successfully',
  });
});
export default postsRouter;
