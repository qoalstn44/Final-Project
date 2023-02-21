import React, { useState } from 'react';
import styled from 'styled-components';

const PostModal = ({ setPostModalOpen, setPostModalDelete, children }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const openPostModal = () => {
    setPostModalOpen(false);
  };

  const deletePostModalChange = () => {
    setPageNumber(1);
  };
  const deletePostModal = () => {
    setPostModalDelete(false);
  };

  return (
    <StyledPostModalBackground>
      {pageNumber === 0 && (
        <StyledPostModalDiv>
          <StyledX
            onClick={setPostModalOpen ? openPostModal : deletePostModal}
            src="img/x.png"
            alt="X"
          />
          <StyledPostP>{children}</StyledPostP>
          <StyledPostModalButton
            onClick={setPostModalOpen ? openPostModal : deletePostModalChange}
          >
            확인
          </StyledPostModalButton>
        </StyledPostModalDiv>
      )}
      {pageNumber === 1 && (
        <StyledPostModalDiv>
          <StyledPostP>취소 되었습니다.</StyledPostP>
          <StyledPostModalButton
            onClick={setPostModalOpen ? openPostModal : deletePostModal}
          >
            확인
          </StyledPostModalButton>
        </StyledPostModalDiv>
      )}
    </StyledPostModalBackground>
  );
};

export default PostModal;

const StyledPostModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const StyledPostModalDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fffffc;
  box-shadow: 0 0 30px 0 rgba(27, 27, 24, 0.7);
  border-radius: 25px;
  width: 10rem;
  height: 8rem;
  padding: 1rem 8rem;
  position: relative;
  top: 39%;
  left: 36%;
`;

const StyledX = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  width: 1.3rem;
`;

const StyledPostP = styled.p`
  font-weight: 400;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const StyledPostModalButton = styled.button`
  background-color: transparent;
  border: 1px solid #c6c6c3;
  padding: 0.5rem 1rem;
  border-radius: 3px;
  :hover {
    color: white;
    background-color: #e65925;
  }
`;
