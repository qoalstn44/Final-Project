import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  onClick: any;
}

const Button = ({ children, onClick }: Props) => {
  return (
    <div>
      <StyledButton onClick={onClick}>{children}</StyledButton>
    </div>
  );
};

export default Button;

const StyledButton = styled.button`
  padding: 0.5rem 2rem;
  background-color: #e65925;
  border-radius: 12px;
  color: white;
  margin-top: 2rem;
  border: none;
  cursor: pointer;
  margin-left: 1rem;
  position: relative;
  top: 17rem;
  left: 13rem;
  :hover {
    background-color: pink;
  }
`;
