import styled from 'styled-components';
import Productapi from '../components/Item/Productapi';

const ItemPage = () => {
  return (
    <MainContainer>
      <CardContainer>
        <Productapi />
      </CardContainer>
    </MainContainer>
  );
};
export default ItemPage;
const MainContainer = styled.div`
  margin-left: 15rem;
  margin-right: 15rem;
`;

const CardContainer = styled.div`
  justify-content: center;
  align-items: center;
  margin-top: 3.125rem;
`;
