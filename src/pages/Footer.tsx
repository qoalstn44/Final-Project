import React from 'react';
import styled from 'styled-components';

function Footer() {
  return (
    <div>
      <FooterBox>
        {' '}
        <img
          src="img/Petalk.png.png"
          style={{ width: '15rem', height: '3rem' }}
        />
      </FooterBox>
    </div>
  );
}

export default Footer;

const FooterBox = styled.div`
  width: 100%;
  height: 10%;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
`;
