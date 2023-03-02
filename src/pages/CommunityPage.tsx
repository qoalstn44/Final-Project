import styled from 'styled-components';
import Communityapi from '../components/Community/Communityapi';

const CommunityPage = () => {
  return (
    <MainContainer>
      <CardContainer>
        <Communityapi />
      </CardContainer>
    </MainContainer>
  );
};
export default CommunityPage;
const MainContainer = styled.div`
  margin-left: 15rem;
  margin-right: 15rem;
`;

const CardContainer = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 3.125rem;
`;
