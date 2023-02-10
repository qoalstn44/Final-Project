import React from 'react';
import styled from 'styled-components';

const PostPage = () => {
  return (
    <div>
      <StyledOutputDiv>
        <StyledOutput>
          <h1>제목</h1>
          <p>내용</p>
        </StyledOutput>
      </StyledOutputDiv>
      <StyledForm>
        <StyledInput type="text" placeholder="제목" />
        <StyledTextarea placeholder="내용"></StyledTextarea>
        <div>
          <button>입력</button>
        </div>
      </StyledForm>
    </div>
  );
};

export default PostPage;

const StyledOutputDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledOutput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;
  border: 1px solid #333;
  padding: 10px 0 30px 0;
  border-radius: 5px;
  margin-bottom: 50px;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 1rem 0;
  padding-right: 20rem;
  margin-bottom: 2rem;
`;

const StyledTextarea = styled.textarea`
  padding: 1rem 0;
  padding-right: 17.8rem;
`;
