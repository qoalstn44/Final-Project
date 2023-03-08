import styled from 'styled-components';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { dbService } from '../../common/firebase';
import { useEffect, useState } from 'react';
import { authService } from '../../common/firebase';

const MyPageCommunities = () => {
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    if (!authService?.currentUser) {
      return;
    }
    const q = query(
      collection(dbService, 'communities'),
      where('author.id', '==', authService.currentUser.uid),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const post: any = [];
      querySnapshot.forEach((doc) => {
        post.push({ id: doc.id, ...doc.data() });
      });
      setUserData(post);
    });
    return () => unsubscribe();
  }, [authService?.currentUser]);

  const deleteButton = async (id: any) => {
    await deleteDoc(doc(dbService, `communities/${id}`));
  };

  return (
    <StyledContainerDiv>
      <Container>내가 작성한 커뮤니티</Container>
      {userData.map((data: any) => (
        <DataContainer key={data.id}>
          <DataTitle>{data.title}</DataTitle>
          <DataDiv>
            <DataTime>
              {data.createAt &&
                new Date(data.createAt.toDate()).toLocaleDateString()}
            </DataTime>
            <DeletButton
              onClick={() => {
                deleteButton(data.id);
              }}
            >
              <DeletButtonImg src="img/x.png" />
            </DeletButton>
          </DataDiv>
        </DataContainer>
      ))}
    </StyledContainerDiv>
  );
};

export default MyPageCommunities;

const StyledContainerDiv = styled.div`
  /* z-index: -1; */
`;

const DataContainer = styled.div`
  width: 27rem;
  height: 5rem;
  margin-bottom: 1rem;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3f3030;
  font-weight: 400;
`;

const Container = styled.h1`
  text-align: center;
  font-size: 1.3rem;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const DataTitle = styled.h4`
  font-size: 1.1rem;
  padding-left: 1rem;
  color: #545451;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 18ch;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const DataTime = styled.p`
  font-size: 1.1rem;
  color: #545451;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const DeletButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const DeletButtonImg = styled.img`
  width: 1rem;
  height: 1rem;
  margin-left: 1.2rem;
`;

const DataDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 1rem;
`;
