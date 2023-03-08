import React, { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router';
import CommunitySlide from './CommunitySlide';
import NewspidSlide from './NewspidSlide';
import ProductSlide from './ProductSlide';
import Footer from '../../pages/Footer';

interface CardProps {
  title: string;
  image: string;
}

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
};

const CardSlide: React.FC = () => {
  const Card: React.FC<CardProps> = ({ title, image }) => {
    return (
      <CardContainer style={{ backgroundImage: `url(${image})` }}>
        {title}
      </CardContainer>
    );
  };
  const [cards] = useState<CardProps[]>([
    {
      title: '',
      image: 'img/main1.jpg',
    },
    {
      title: '',
      image: 'img/main2.avif',
    },
    {
      title: '',
      image: 'img/main3.avif',
    },
    {
      title: '',
      image: 'img/main7.avif',
    },
    {
      title: '',
      image: 'img/main8.avif',
    },
  ]);

  return (
    <div>
      <BigBox>
        <SmallBox>
          <Slider {...settings}>
            {cards.map((card, index) => (
              <Card key={index} title={card.title} image={card.image} />
            ))}
          </Slider>
        </SmallBox>
        <SSBox>
          <LeftImage src="img/IconLeft.png"></LeftImage>
          <Stimage src="img/LOGO_OR.png"></Stimage>

          <StText>안녕하세요.펫톡입니다.</StText>
          <RightImage src="img/IconRight.png"></RightImage>
        </SSBox>
      </BigBox>
      <CpSlide>
        <CommunitySlide />
        <ProductSlide />
      </CpSlide>

      <NewspidSlide />
      <Footer />
    </div>
  );
};

export default CardSlide;

const CardContainer = styled.div`
  width: 100rem;
  height: 50rem;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  margin-top: 3%;
  background-size: cover;
  background-position: center;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const BigBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 60rem;
`;

const SmallBox = styled.div`
  width: 70%;
  height: 60rem;
  display: flex;
  flex-direction: column;
`;

const SSBox = styled.div`
  width: 100rem;
  height: 50rem;
  margin-top: 2.1%;
  background-color: #fff3d4;
  display: flex;
  flex-direction: column;
`;

const CpSlide = styled.div`
  width: 100%;
  height: 55rem;
  display: flex;
  flex-direction: row;
  margin: auto;
`;

const StText = styled.h4`
  color: black;
  margin-left: 10rem;
  font-family: 'Noto Sans KR', sans-serif;
`;

const Stimage = styled.img`
  width: 15rem;
  height: 4rem;
  margin-left: 11rem;
`;

const LeftImage = styled.img`
  width: 3rem;
  height: 3rem;
  margin-top: 10rem;
  margin-left: 5rem;
`;

const RightImage = styled.img`
  width: 3rem;
  height: 3rem;
  margin-left: 27rem;
`;
