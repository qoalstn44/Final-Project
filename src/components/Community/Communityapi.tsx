import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { dbService } from '../../common/firebase';
import styled from 'styled-components';

function Communityapi() {
  const [userData, setUserData] = useState<any>([]);
  const navigate = useNavigate();

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
    <ProductContainer>
      <CardBox
        onClick={() => {
          navigate('/detailpage/:id');
        }}
      >
        <CardImg></CardImg>
        <CardName>
          <CardTitle>{userData[0]?.title}</CardTitle>
          <CardContent>{userData[0]?.author.name}</CardContent>
        </CardName>
      </CardBox>
      <CardBox>
        <CardImg></CardImg>
        <CardName>
          <CardTitle>{userData[1]?.title}</CardTitle>
          <CardContent>{userData[1]?.author.name}</CardContent>
        </CardName>
      </CardBox>
      <CardBox>
        <CardImg></CardImg>
        <CardName>
          <CardTitle>{userData[2]?.title}</CardTitle>
          <CardContent>{userData[2]?.author.name}</CardContent>
        </CardName>
      </CardBox>
      <CardBox>
        <CardImg></CardImg>
        <CardName>
          <CardTitle>{userData[3]?.title}</CardTitle>
          <CardContent>{userData[3]?.author.name}</CardContent>
        </CardName>
      </CardBox>
      <CardBox>
        <CardImg></CardImg>
        <CardName>
          <CardTitle>{userData[4]?.title}</CardTitle>
          <CardContent>{userData[4]?.author.name}</CardContent>
        </CardName>
      </CardBox>
      <CardBox>
        <CardImg></CardImg>
        <CardName>
          <CardTitle>{userData[5]?.title}</CardTitle>
          <CardContent>{userData[5]?.author.name}</CardContent>
        </CardName>
      </CardBox>
      <CardBox>
        <CardImg></CardImg>
        <CardName>
          <CardTitle>{userData[6]?.title}</CardTitle>
          <CardContent>{userData[6]?.author.name}</CardContent>
        </CardName>
      </CardBox>
      <CardBox>
        <CardImg></CardImg>
        <CardName>
          <CardTitle>{userData[7]?.title}</CardTitle>
          <CardContent>{userData[7]?.author.name}</CardContent>
        </CardName>
      </CardBox>
      <CardBox>
        <CardImg></CardImg>
        <CardName>
          <CardTitle>{userData[8]?.title}</CardTitle>
          <CardContent>{userData[8]?.author.name}</CardContent>
        </CardName>
      </CardBox>
    </ProductContainer>
  );
}
export default Communityapi;

const ProductContainer = styled.div`
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  margin-top: 3.125rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin-top: 0px;
`;

const CardBox = styled.div`
  width: 20rem;
  height: 20rem;
  border: 0.0625rem solid #e5e5e5;
  border-radius: 2rem;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  margin-bottom: 2rem;
  text-align: center;
  cursor: pointer;
`;

const CardTitle = styled.h2`
  font-size: 1.2rem;
`;

const CardContent = styled.div`
  position: relative;
  top: 1.1rem;
`;

const CardImg = styled.div`
  background-color: #f39340;
  width: 100%;
  height: 14rem;
  object-fit: cover;
`;

const CardName = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
