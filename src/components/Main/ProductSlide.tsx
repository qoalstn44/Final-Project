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
      const querySnapshot = await getDocs(collection(dbService, 'items'));
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
    <div>
      <h1
        style={{
          marginLeft: '50px',
        }}
      >
        제품 추천
      </h1>
      <ProductReview>
        {userData.slice(0, 6).map((data: any, index: any) => (
          <DDD
            key={index}
            onClick={() => navigate(`/DetailPage/${data.author.id}`)}
          >
            <Stimage src={data?.imgUrl} />
            <StTitle>{data.title}</StTitle>
          </DDD>
        ))}
        <OnclickButton onClick={() => navigate('/Itempage')}>
          더보기
        </OnclickButton>
      </ProductReview>
    </div>
  );
}

export default ProductSlide;

const ProductReview = styled.div`
  width: 30%;
  height: 115rem;
  display: flex;
  flex-direction: column;
`;

const DDD = styled.div`
  width: 20rem;
  height: 16rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  color: black;
  margin-left: 20px;
  border-radius: 12%;
  box-shadow: 3px 3px 3px 3px #d2d2d2;
  margin-top: 1rem;
`;

const OnclickButton = styled.button`
  width: 5rem;
  height: 1rem;
  border: 1px solid white;
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  margin-left: 2rem;
  margin-top: 1rem;
  background-color: white;
`;

const Stimage = styled.img`
  width: 100%;
  height: 12rem;
  border-top-left-radius: 10%;
  border-top-right-radius: 10%;
`;

const StTitle = styled.div`
  font-size: 1.2rem;
  position: relative;
  bottom: 0.2rem;
  color: black;
  margin-top: 0.5rem;
  margin-left: 2rem;
  font-weight: bolder;
`;
