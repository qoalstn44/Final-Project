import React from 'react';
import styled from 'styled-components';

interface props {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, onClick }: props) => {
  return (
    <StyledButtonDiv>
      <StyledButton onClick={onClick}>{children}</StyledButton>
    </StyledButtonDiv>
  );
};

export default Button;

const StyledButtonDiv = styled.div`
  position: relative;
  right: 1.8rem;
  bottom: 0.7rem;
`;

const StyledButton = styled.button`
  padding: 0.5rem 2rem;
  background-color: #fffffc;
  border-radius: 3px;
  color: #8d8d8a;
  margin-top: 2rem;
  border: 1px solid #c6c6c3;
  cursor: pointer;
  margin-right: 1rem;
  position: relative;
  left: 22rem;
  :hover {
    background-color: #e65925;
    color: #fffffc;
  }
  @media screen and (max-width: 768px) {
    position: relative;
    left: 2.5rem;
  }
`;
