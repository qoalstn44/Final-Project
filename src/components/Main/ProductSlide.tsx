import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
import { collection, getDocs } from 'firebase/firestore';
import { dbService } from '../../common/firebase';

function ProductSlide() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(dbService, 'posts'));
      console.log(querySnapshot);
      let PushData: any = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        PushData.push(doc.data());
      });
      console.log('확인', PushData);
      setUserData(PushData);
    };
    getData();
  }, []);

  return (
    <div>
      <h1>제품리뷰</h1>
      <ProductReview>
        <DDD
          style={{
            marginTop: '0px',
          }}
        >
          <SmallBox></SmallBox>
          <div>{userData[0]?.title}</div>
        </DDD>
        <DDD>
          <SmallBox></SmallBox>
          <div>{userData[5]?.title}</div>
        </DDD>
        <DDD>
          <SmallBox></SmallBox>
          <div>{userData[3]?.title}</div>
        </DDD>
        <DDD>
          <SmallBox></SmallBox>
          <div>{userData[0]?.title}</div>
        </DDD>
        <DDD>
          <SmallBox></SmallBox>
          <div>{userData[1]?.title}</div>
        </DDD>
      </ProductReview>
      <OnclickButton onClick={() => navigate('/Itempage')}>
        더보기
      </OnclickButton>
    </div>
  );
}

export default ProductSlide;

const ProductReview = styled.div`
  width: 30%;
  height: 150rem;
  display: flex;
  flex-direction: column;
`;

const DDD = styled.div`
  width: 500px;
  height: 500px;
  background-color: black;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  color: white;
  margin-left: 50px;
`;

const OnclickButton = styled.button`
  width: 5rem;
  height: 1rem;
  border: 1px solid white;
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  margin-left: 3rem;
  margin-top: 1rem;
  background-color: white;
`;

const SmallBox = styled.div`
  width: 500px;
  height: 300px;
  background-color: green;
`;
