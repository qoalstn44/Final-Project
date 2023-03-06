import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  addDoc,
  getDocs,
  collection,
  deleteDoc,
  doc,
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
      author: {
        name: authService.currentUser.displayName,
        id: authService.currentUser.uid,
      },
      timestamp: new Date(),
    });
    navigate('/DetailPage/:id');
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
  }, []);
  // 댓글 삭제하기
  const deleteComment = async (item) => {
    deleteDoc(doc(dbService, `comments/${item}`));
  };

  return (
    <StyledPost>
      <StyledTitle>{userData[0]?.title}</StyledTitle>
      <StyledInfo>
        <StyledId>{userData[0]?.author.name}</StyledId>
        <StyledImg src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg" />
      </StyledInfo>
      <Contents>
        <StyledContent>{userData[0]?.contents}</StyledContent>
        <StyledImgContainer>
          <StyledImgContent src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg" />
        </StyledImgContainer>
      </Contents>
      <CommentListWrap>
        <TotalComments>댓글 {commentLists.length}</TotalComments>
        {commentLists.map((comments) => {
          return (
            <div key={comments.id}>
              <BodyDiv>
                {comments.author.name} {comments.postComment} (
                {new Date(comments.timestamp.seconds * 1000).toLocaleString()})
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  border-top: #c6c6c3 0.05rem solid;
  border-bottom: #c6c6c3 0.05rem solid;
  background-color: transparent;
  margin-bottom: 1.25rem;
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

// form
// form 안에 있는 input, button 얘네가 form 묶임
// button > submit (제출)
// 새로고침 > 데이터 값이 서버에 보내지고, 화면에 있는 건 새로고침.
// 화면에 보이는건 결국 없음.

// prevent.default() 를 쓰면
// 버튼을 눌러도 안 사라져요.
