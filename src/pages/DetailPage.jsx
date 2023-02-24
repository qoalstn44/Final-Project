import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  addDoc,
  getDocs,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { dbService, authService } from '../common/firebase';
import { useNavigate } from 'react-router-dom';
const DetailPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [postComment, setPostComment] = useState('');
  const [commentLists, setCommentLists] = useState([]);
  const commentCollectionRef = collection(dbService, 'comments');

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(dbService, 'posts'));
      console.log(querySnapshot);
      let PushData = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        PushData.push(doc.data());
      });
      console.log('확인', PushData);
      setUserData(PushData);
    };
    getData();
  }, []);

  //데이터에 문서를 추가
  const createComment = async () => {
    await addDoc(commentCollectionRef, {
      postComment,
      createAt: serverTimestamp(),
      author: {
        name: authService.currentUser.displayName,
        id: authService.currentUser.uid,
      },
      timeStamp: serverTimestamp(),
    });
    navigate('/Detail/:id');
  };
  // //로그인이 되어있지 않으면 로그인 페이지로 이동
  // useEffect(() => {
  //     if (!isAuth){
  //         navigate("/LoginPage")
  //     }
  // },[]);

  // 댓글 가져오기
  useEffect(() => {
    const getComments = async () => {
      const data = await getDocs(commentCollectionRef);
      setCommentLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getComments();
  });
  // 댓글 삭제하기
  const deleteComment = async (id) => {
    deleteDoc(doc(dbService, 'comments', id));
  };

  return (
    <StyledPost>
      <StyledTitle>{userData[0]?.title}</StyledTitle>
      <StyledInfo>
        <StyledId>{userData[0]?.author.name}</StyledId>
        <StyledImg src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg" />
      </StyledInfo>
      <StyledContent>{userData[0]?.contents}</StyledContent>
      <StyledImgContainer>
        <StyledImgContent src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg" />
      </StyledImgContainer>
      <CommentTag>#댕댕이</CommentTag>
      <CommentListWrap>
        {commentLists.map((comments) => {
          return (
            <div>
              <BodyDiv>
                {comments.author.name}&nbsp; &nbsp; {comments.postComment}
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
  border: 0.0625rem solid lightgray;
  padding: 1rem;
`;

const StyledTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledId = styled.p`
  font-size: 2rem;
  margin-right: 1rem;
`;

const StyledImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
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

const CommentTag = styled.span`
  position: relative;
  right: 18rem;
  bottom: 1rem;
  margin-top: 3rem;
  width: 5rem;
  font-size: 0.8rem;
  background-color: #f39340;
  padding: 0.3125rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BodyDiv = styled.div`
  width: 40rem;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  border-radius: 0.625rem;
  background-color: #eee;
  margin-bottom: 1.25rem;
`;

const DeleteBtn = styled.button`
  position: relative;
  left: 38.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 0.313rem;
  background-color: #e65925;
  color: white;
  border: none;
  &:hover {
  transform: scale(1.2);
  display: flex;
  justify-content : flex-end  
    transform: scale(1.2);
    display: flex;
    justify-content: flex-end;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const BodyInput = styled.input`
  border: none;
  width: 40rem;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  border-radius: 0.625rem;
  background-color: #eee;
  margin-bottom: 1.25rem;
`;

const CommentBtn = styled.button`
  position: relative;
  left: 19rem;
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

const Comment = styled.div`
  position: relative;
  right: 18rem;
  font-size: 2rem;
  font-color: #1b1b18;
  margin-bottom: 1rem;
`;
