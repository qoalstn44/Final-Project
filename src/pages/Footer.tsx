import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <div>
      <FooterBox>
        <StyledFooterImg src="img/Petalk.png" />
      </FooterBox>
    </div>
  );
}

export default Footer;

const FooterBox = styled.div`
  background-color: black;
  width: 100%;
  height: 4rem;
  top: 92%;
  font-family: 'Noto Sans KR', sans-serif;
`;

const StyledFooterImg = styled.img`
  padding-left: 2rem;
  width: 15rem;
  position: relative;
  top: 0.5rem;
`;
