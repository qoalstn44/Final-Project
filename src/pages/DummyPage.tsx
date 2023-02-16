import { collection, getDocs } from 'firebase/firestore';
import styled from 'styled-components';
import { dbService } from '../common/firebase';

interface forEach {
  forEach: any;
}

const DummyPage = () => {
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(dbService, 'post'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };
  return (
    <StyledDummyDiv>
      <div>
        <StyledDummyImg src="img/cat.jpeg" alt="cat" />
      </div>
      <div>
        <h3>제목은 여기로 들어갑니다.</h3>
        <p>글쓴이</p>
        <p>내용은 여기로</p>
      </div>
    </StyledDummyDiv>
  );
};

export default DummyPage;

const StyledDummyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: pink;
  width: 30rem;
  height: 20rem;
  position: relative;
  top: 10rem;
  left: 30rem;
`;

const StyledDummyImg = styled.img`
  width: 10rem;
  height: 10rem;
`;
