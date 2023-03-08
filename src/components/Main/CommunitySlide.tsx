import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { dbService } from '../../common/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  QuerySnapshot,
} from 'firebase/firestore';

function CommunitySlide() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(dbService, 'communities'));
      console.log(querySnapshot);
      let PushData: any = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        PushData.push(doc.data());
      });
      // console.log('확인', PushData);
      setUserData(PushData);
    };
    getData();
  }, []);
  return (
    <BigDiv>
      <IconImage src="img/BigIconRight.png"></IconImage>
      <BoxTitle>커뮤니티 게시글</BoxTitle>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {userData.slice(0, 3).map((data: any, index: any) => (
          <DDD
            key={index}
            onClick={() => navigate(`/DetailPage/${data.author.id}`)}
          >
            <SmallBox>
              <Stimage
                src={data.imgUrl}
                alt="이미지를 불러오는 과정에서 오류가 발생했습니다."
              />
            </SmallBox>
            <StTitle>{data.title}</StTitle>
            <CardContent>{data.author.name}</CardContent>
          </DDD>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '3rem' }}>
        {userData.slice(3, 6).map((data: any, index: any) => (
          <DDD
            key={index}
            onClick={() => navigate(`/DetailPage/${data.author.id}`)}
          >
            <SmallBox>
              <Stimage src={data.imgUrl} />
            </SmallBox>
            <StTitle>{data.title}</StTitle>
            <CardContent>{data.author.name}</CardContent>
          </DDD>
        ))}
      </div>
      <OnclickButton onClick={() => navigate('/NewsPage')}>
        더보기
      </OnclickButton>
      <IconImage2 src="img/BigIconRight.png"></IconImage2>
      <IconImage3 src="img/BigIconLeft.png"></IconImage3>
    </BigDiv>
  );
}

export default CommunitySlide;

const BigDiv = styled.div`
  width: 90rem;
  margin-left: 5rem;
  position: relative;
  height: 60rem;
  margin-bottom: 0rem;
`;

const BoxTitle = styled.h1`
  color: gray;
  margin-left: 6rem;
  font-family: 'Noto Sans KR', sans-serif;
`;

const DDD = styled.div`
  width: 20rem;
  height: 20rem;
  background-color: white;
  margin-top: 1rem;
  margin-left: 5rem;
  display: flex;
  flex-direction: column;
  color: black;

  border-radius: 10%;
  box-shadow: 3px 3px 3px 3px #d2d2d2;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const OnclickButton = styled.button`
  width: 5rem;
  height: 1rem;
  border: 1px solid white;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  margin-left: 3rem;
  margin-top: 1rem;
  background-color: white;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const SmallBox = styled.div`
  width: 20rem;
  height: 15rem;
  background-color: green;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
  box-shadow: 1px 1px 1px grey;
`;

const Stimage = styled.img`
  width: 100%;
  height: 100%;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
`;

const StTitle = styled.div`
  font-size: 1.2rem;
  position: relative;
  bottom: 0.2rem;
  color: black;
  margin-top: 1rem;
  margin-left: 4rem;
  font-weight: bolder;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const IconImage = styled.img`
  width: 20rem;
  height: 20rem;
  z-index: -999;
  margin-left: 70rem;
  position: absolute;
  top: 0;
`;

const IconImage2 = styled.img`
  width: 20rem;
  height: 20rem;
  z-index: -999;
  margin-left: 5rem;
  position: absolute;
  top: 70rem;
`;
const IconImage3 = styled.img`
  width: 20rem;
  height: 20rem;
  z-index: -999;
  margin-left: 80rem;
  position: absolute;
  top: 40rem;
`;

const CardContent = styled.p`
  position: relative;
  font-size: 0.8rem;
  margin-left: 15rem;
  bottom: 2rem;
  text {
    font-family: 'Noto Sans KR', sans-serif;
  }
`;
