  import styled from 'styled-components';

  function CommentItem({ item }: { item: CommentType }) {

    return (
      <Wrap>
        <Container>

          <ContentBox>
            <NameDiv>
              &nbsp; {item?.name}
            </NameDiv>
            <BodyDiv>{item?.body}</BodyDiv>
          </ContentBox>
        </Container>
      </Wrap>
    );
  }

  export default CommentItem;

  const Wrap = styled.div`
  margin-top: 1.25rem;
`;

const Container = styled.div`
  width: 87.5rem;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;

  border-radius: 0.625rem;

  background-color: #eee;
  margin-bottom: 1.25rem;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
`;

const NameDiv = styled.div`
  margin: 0.625rem;
  width: 12.5rem;
  font-size: 1.125rem;
  border-right: 0.0625rem solid #333;
  display: flex;
  align-items: center;
`;

const BodyDiv = styled.div`
  margin: 0.625rem;
  font-size: 1.125rem;
`;
