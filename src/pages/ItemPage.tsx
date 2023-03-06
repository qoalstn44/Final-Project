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
const MainContainer = styled.div``;

const CardContainer = styled.div``;
