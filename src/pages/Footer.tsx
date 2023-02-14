import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <div>
      <FooterBox></FooterBox>
    </div>
  );
}

export default Footer;

const FooterBox = styled.div`
  width: 100%;
  height: 10%;
  background-color: black;
  color: white;
`;

const BigBox = styled.div`
  display: flex;
  flex-direction: column;
`;
