import { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { authService, dbService } from '../common/firebase';

const DetailPage = () => {
  const [userData, setUserData] = useState({});
  const [postComment, setPostComment] = useState('');
  const [commentLists, setCommentLists] = useState([]);
  const commentCollectionRef = collection(dbService, 'comments');

  // HTML 이상한 태그들 제거
  const stripHtmlTags = (html) => {
    let doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };
  //데이터 가져오기
  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(
        query(collection(dbService, 'communities')),
      );
      let PushData;
      querySnapshot.forEach((doc) => {
        PushData = doc.data();
      });
      setUserData({
        ...PushData,
        contents: stripHtmlTags(PushData.contents),
      });
    };
    getData();
  }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     const querySnapshot = await getDocs(
  //       query(collection(dbService, 'items')),
  //     );
  //     let PushData;
  //     querySnapshot.forEach((doc) => {
  //       PushData = doc.data();
  //     });
  //     setUserData({
  //       ...PushData,
  //       contents: stripHtmlTags(PushData.contents),
  //     });
  //   };
  //   getData();
  // }, []);

  // 데이터에 문서를 추가
  const createComment = async () => {
    await addDoc(commentCollectionRef, {
      postComment,
      author: {
        name: authService.currentUser.displayName,
        id: authService.currentUser.uid,
      },
      timestamp: serverTimestamp(),
    });
    setCommentLists((prevCommentLists) => [
      ...prevCommentLists,
      {
        postComment,
        author: {
          name: authService.currentUser.displayName,
          id: authService.currentUser.uid,
        },
        timestamp: serverTimestamp(),
      },
    ]);
    setPostComment('');
  };

  // 댓글 가져오기
  useEffect(() => {
    const getComments = async () => {
      const q = query(commentCollectionRef);
      const data = await getDocs(q);
      setCommentLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getComments();
  }, []);
  // 댓글 삭제하기
  const deleteComment = async (item) => {
    await deleteDoc(doc(dbService, `comments/${item}`));
    setCommentLists((prevCommentLists) =>
      prevCommentLists.filter((comment) => comment.id !== item),
    );
  };

  return (
    <StyledPost>
      <StyledTitle>{userData.title}</StyledTitle>
      <StyledInfo>
        <StyledId>
          <StyledImg src={userData.author && userData.author.profileImage} />
          {userData.author && userData.author.name}(
          {new Date(userData.createdAt).toLocaleDateString()})
        </StyledId>
      </StyledInfo>
      <Contents>
        <StyledContent>{userData.contents}</StyledContent>
        <StyledImgContainer>
          <StyledImgContent src={userData.imgUrl} />
        </StyledImgContainer>
      </Contents>
      <CommentListWrap>
        <TotalComments>댓글 {commentLists.length}</TotalComments>
        {commentLists.map((comments) => {
          return (
            <div key={comments.id}>
              <BodyDiv>
                <img src={userData.author && userData.author.profileImage} />
                {comments.author.name} (
                {new Date(
                  comments.timestamp.seconds * 1000,
                ).toLocaleDateString()}
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
        placeholder="내용 (최대 200자)"
        required
        value={postComment}
      />
      <CommentBtn onClick={createComment}>등록</CommentBtn>
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
