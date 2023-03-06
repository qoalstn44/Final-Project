import styled from 'styled-components';
import Communityapi from '../components/Community/Communityapi';

const CommunityPage = () => {
  return (
    <Conatiner>
      <MainContainer>
        <CardContainer>
          <Communityapi />
        </CardContainer>
      </MainContainer>
    </Conatiner>
  );
};
export default CommunityPage;
const Conatiner = styled.div`
  background-color: #fffffc;
`;

const MainContainer = styled.div`
  /* margin-left: 15rem;
  margin-right: 15rem; */
`;

const CardContainer = styled.div`
  /* justify-content: center;
  align-items: center;
  margin-top: 3.125rem; */
`;
