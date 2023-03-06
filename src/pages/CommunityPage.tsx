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

const MainContainer = styled.div``;

const CardContainer = styled.div``;
