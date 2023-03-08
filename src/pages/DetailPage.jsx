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
  const [liked, setLiked] = useState(false);

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

  const toggleLiked = () => {
    setLiked(!liked);
  };
  return (
    <Container>
      <StyledPost>
        <Contents>
          <StyledContent>{stripHtmlTags(post.contents)}</StyledContent>
          <StyledImgContainer>
            <StyledImgContent src={stripHtmlTags(post.imgUrl)} />
          </StyledImgContainer>
        </Contents>
        <StyledTotalDiv>
          <StyledTitleDiv>
            <StyledTitle>{post.title}</StyledTitle>
            <StyledInfo>
              <StyledId>{post.author && post.author.name}</StyledId>
              <LikeButton onClick={toggleLiked}>
                {liked ? (
                  <img src="/img/red.png" alt="red heart" />
                ) : (
                  <img src="/img/black.png" alt="black heart" />
                )}
              </LikeButton>
            </StyledInfo>
          </StyledTitleDiv>
          <Comment>
            댓글 <span style={{ color: 'green' }}>{commentLists.length}</span>
          </Comment>
          <StyledPostDiv>
            <CommentListWrap>
              {commentLists.map((comments) => {
                return (
                  <div key={comments.id}>
                    <BodyDiv>
                      {comments.author.name} (
                      {comments.timestamp &&
                        new Date(
                          comments.timestamp.toDate(),
                        ).toLocaleDateString()}
                      )
                      <StyledPostComment>
                        {comments.postComment}
                      </StyledPostComment>
                      <DeleteBtn
                        onClick={() => {
                          deleteComment(comments.id);
                        }}
                      >
                        삭제
                      </DeleteBtn>
                    </BodyDiv>
                  </div>
                );
              })}
            </CommentListWrap>
            <BodyInput
              maxLength={35}
              onChange={(event) => setPostComment(event.target.value)}
              placeholder="입력 (최대 35글자)"
              required
              value={postComment}
            />
            <CommentBtn onClick={createComment}>등록</CommentBtn>
          </StyledPostDiv>
        </StyledTotalDiv>
      </StyledPost>
    </Container>
  );
};

export default DetailPage;

const Container = styled.div`
  display: flex;
  background-color: #fffffc;
  height: 40rem;
  font-family: 'Noto Sans KR', sans-serif;
`;

const StyledPost = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 4rem;
  padding: 1rem;
  background-color: #fffffc;
  /* margin-bottom: 10rem; */
`;

const StyledTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  position: relative;
  bottom: 0.25rem;
  font-family: 'Noto Sans KR', sans-serif;
`;

const StyledInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledId = styled.h4`
  position: relative;
  top: 0.7rem;
  font-family: 'Noto Sans KR', sans-serif;
`;

const LikeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
  img {
    width: 3rem;
    height: 3rem;
  }
`;
const Contents = styled.div`
  width: 30rem;
  height: 38.5rem;
  border-top: #c6c6c3 0.1rem solid;
  border-bottom: #c6c6c3 0.1rem solid;
  margin-right: 6rem;
  overflow-y: scroll;
  padding: 1rem;
`;

const StyledContent = styled.p`
  font-size: 1rem;
  text-align: justify;
  margin-bottom: 1rem;
  font-family: 'Noto Sans KR', sans-serif;
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
  overflow-y: scroll;
  height: 25rem;
  position: relative;
`;

const BodyDiv = styled.div`
  position: relative; /* Make the positioning of the button relative to this div */
  width: 30rem;
  height: 5rem;
  padding: 0 1.25rem;
  border-bottom: #c6c6c3 0.05rem solid;
  background-color: transparent;
  margin-bottom: 1.25rem;
  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.5rem;
  }
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  border-radius: 0.313rem;
  background-color: #e65925;
  color: white;
  border: none;
  font-size: 0.3rem;
  width: 2rem;
  height: 1.5rem;
  bottom: 0.5rem;
  right: 0.5rem;
  cursor: pointer;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;
const BodyInput = styled.input`
  border: none;
  width: 30rem;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  border-radius: 0.625rem;
  background-color: #eee;
  margin-bottom: 1.25rem;
  outline: none;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const CommentBtn = styled.button`
  z-index: 3;
  position: absolute;
  right: 0.1rem;
  font-size: 0.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 0.313rem;
  background-color: #e65925;
  color: white;
  border: none;
  margin-bottom: 10rem;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const Comment = styled.h5`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-family: 'Noto Sans KR', sans-serif;
  color: #1b1b18;
  margin-left: 1rem;
`;

const StyledTitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #c6c6c3;
`;

const StyledPostDiv = styled.div`
  position: relative;
`;

const StyledTotalDiv = styled.div`
  margin-top: -1rem;
`;

const StyledPostComment = styled.p`
  position: absolute;
  font-family: 'Noto Sans KR', sans-serif;
  top: 2rem;
`;
