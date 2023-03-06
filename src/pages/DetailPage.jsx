import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { authService, dbService } from '../common/firebase';
import { useLocation } from 'react-router';

const DetailPage = () => {
  const [postComment, setPostComment] = useState('');
  const [commentLists, setCommentLists] = useState([]);
  const commentCollectionRef = collection(dbService, 'comments');
  const location = useLocation();
  const post = location.state.data;

  // HTML 이상한 태그들 제거
  const stripHtmlTags = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  // 데이터를 문서에 추가
  const createCommentObject = () => ({
    postComment,
    author: {
      name: authService.currentUser?.displayName,
      id: authService.currentUser?.uid,
    },
    timestamp: serverTimestamp(),
  });

  // 댓글작성
  const createComment = async () => {
    await addDoc(commentCollectionRef, createCommentObject());
    setPostComment('');
  };

  // 댓글 불러오기
  const fetchComments = () => {
    console.log('댓글 로딩중...');
    const unsubscribe = onSnapshot(commentCollectionRef, (snapshot) => {
      setCommentLists(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })),
      );
    });
    return unsubscribe;
  };

  // 댓글 삭제
  const deleteComment = async (id) => {
    await deleteDoc(doc(dbService, `comments/${id}`));
    setCommentLists((prevCommentLists) =>
      prevCommentLists.filter((comment) => comment.id !== id),
    );
  };

  useEffect(() => {
    const unsubscribe = fetchComments();
    return () => unsubscribe();
  }, []);
  return (
    <StyledPost>
      <StyledTitle>{post.title}</StyledTitle>
      <StyledInfo>
        <StyledId>
          <StyledImg src={post.author && post.author.profileImage} />
          {post.author && post.author.name}
        </StyledId>
      </StyledInfo>
      <Contents>
        <StyledContent>{stripHtmlTags(post.contents)}</StyledContent>
        <StyledImgContainer>
          <StyledImgContent src={stripHtmlTags(post.imgUrl)} />
        </StyledImgContainer>
      </Contents>
      <div>
        <CommentListWrap>
          <TotalComments>댓글{commentLists.length}</TotalComments>
          {commentLists.map((comments) => {
            return (
              <div key={comments.id}>
                <BodyDiv>
                  <img src={post.author && post.author.profileImage} />
                  {comments.author.name} (
                  {comments.timestamp &&
                    new Date(comments.timestamp.toDate()).toLocaleDateString()}
                  )<p>{comments.postComment}</p>
                </BodyDiv>
                <DeleteBtn
                  onClick={() => {
                    deleteComment(comments.id);
                  }}
                >
                  &#128465;
                </DeleteBtn>
              </div>
            );
          })}
        </CommentListWrap>
        <Comment>댓글작성</Comment>
        <BodyInput
          maxLength={200}
          onChange={(event) => setPostComment(event.target.value)}
          placeholder="입력 (최대 200글자)"
          required
          value={postComment}
        />
        <CommentBtn onClick={createComment}>등록</CommentBtn>
      </div>
    </StyledPost>
  );
};

export default DetailPage;

const StyledPost = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 10rem auto;
  padding: 1rem;
`;

const StyledTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const StyledInfo = styled.div`
  font-size: 1rem;
`;

const StyledId = styled.p`
  font-size: 1rem;
`;

const StyledImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.5rem;
`;
const Contents = styled.div`
  width: 40rem;
  border-top: #c6c6c3 0.1rem solid;
  border-bottom: #c6c6c3 0.1rem solid;
`;

const StyledContent = styled.p`
  font-size: 2rem;
  text-align: justify;
  margin-bottom: 1rem;
`;

const StyledImgContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const StyledImgContent = styled.img`
  width: 40%;
  height: auto;
  margin-bottom: 1rem;
`;

const CommentListWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TotalComments = styled.p`
  font-size: 1rem;
  margin-top: 1rem;
`;

const BodyDiv = styled.div`
  width: 40rem;
  height: 5rem;
  padding: 0 1.25rem;
  border-top: #c6c6c3 0.05rem solid;
  border-bottom: #c6c6c3 0.05rem solid;
  background-color: transparent;
  margin-bottom: 1.25rem;
  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.5rem;
  }
`;

const DeleteBtn = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 0.313rem;
  background-color: #e65925;
  color: white;
  border: none;
  &:hover {
    transform: scale(1.2);
    display: flex;
    justify-content: flex-end;
  }
`;

const BodyInput = styled.input`
  border: none;
  width: 40rem;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  border-radius: 0.625rem;
  background-color: #eee;
  margin-bottom: 1.25rem;
`;

const CommentBtn = styled.button`
  font-size: 0.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 0.313rem;
  background-color: #e65925;
  color: white;
  border: none;
  &:hover {
    transform: scale(1.2);
  }
`;

const Comment = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-color: #1b1b18;
`;
