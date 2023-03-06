import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const PostModal = ({ setPostModalOpen, setPostModalDelete, children }) => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);

  const openPostModal = () => {
    setPostModalOpen(false);
    navigate('/');
  };

  const deletePostModalChange = () => {
    setPageNumber(1);
  };
  const deletePostModal = () => {
    setPostModalDelete(false);
  };

  // 카테고리
  const categories = [
    { value: '카테고리', name: '카테고리', id: 0 },
    { value: '커뮤니티', name: '커뮤니티', id: 1 },
    { value: '제품리뷰', name: '제품리뷰', id: 2 },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0].value);
  const categorySelect = (event) => {
    return setSelectedCategory(event.target.value);
  };
  const categoryNavigate = () => {
    console.log('1번', categories[1].value);
    console.log('2번', selectedCategory);
    console.log('3번', categories[2].value);
    if (categories[1].value === selectedCategory) {
      navigate('/communitypage');
    } else if (categories[2].value === selectedCategory) {
      navigate('/itempage');
    }
  };

  return (
    <StyledPostModalBackground>
      {pageNumber === 0 && (
        <StyledPostModalDiv>
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
