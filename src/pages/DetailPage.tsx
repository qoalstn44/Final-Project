import React, { useEffect, useState } from 'react';
import { authService } from '../common/firebase';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import styled from 'styled-components';

//카테고리 설정 강아지 고양이
const categories = [
  { value: '강아지', label: '강아지' },
  { value: '고양이', label: '고양이' },
];

const DetailPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].value);
  const database = getDatabase();
  const [comment, setComment] = useState('');
  const [newcomment, setNewComment] = useState([]);

  useEffect(() => {});
  //댓글기능 구현 사용자가 로그인 되어 있는 경우 파이어베이스 데이터 베이스에 댓글 저장
  const onSubmit = async (
    userId: string | undefined | null,
    name: string | undefined | null,
    email: string | undefined | null,
    imageUrl: string | undefined | null,
  ) => {
    if (userId && name && email && imageUrl) {
      await set(ref(database, 'comments/' + comment), {
        comment,
        userId,
        name,
        email,
        imageUrl,
      });
      setComment('');
    } else {
      console.error('user is not signed in');
    }
  };
  // 사용자가 댓글을 작성할떄 발생 코멘트 값을 업데이트
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };
  //이벤트 감지 로그인이 되어있지 않으면 알럿창 띄우기
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (authService.currentUser) {
      onSubmit(
        authService.currentUser.uid,
        authService.currentUser.displayName,
        authService.currentUser.email,
        authService.currentUser.photoURL,
      );
    } else {
      alert('로그인을 먼저 해주세요!');
    }
  };

  return (
    <StyledPost>
      <StyledTitle>여기는 글 제목 입니다. </StyledTitle>
      <StyledInfo>
        <StyledId>ID</StyledId>
        <StyledImg src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg" />
      </StyledInfo>
      <StyledContent>
        여기는 게시글 입니다 이러쿵 저러쿵 궁시렁 궁시렁{' '}
      </StyledContent>
      <StyledImgContainer>
        <StyledImgContent src="https://blog.kakaocdn.net/dn/tEMUl/btrDc6957nj/NwJoDw0EOapJNDSNRNZK8K/img.jpg" />
      </StyledImgContainer>
      <div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
        <form onSubmit={handleSubmit}>
          <p>댓글작성</p>
          <input
            value={comment}
            onChange={onChange}
            placeholder="여기에 댓글을 작성해 주세요"
            maxLength={200}
            required
          />
          <button type="submit">등록</button>
        </form>
      </div>
    </StyledPost>
  );
};
export default DetailPage;

const StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 10rem auto;
  border: 1px solid lightgray;
  padding: 1rem;
`;

const StyledTitle = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StyledId = styled.p`
  font-size: 2rem;
  margin-right: 1rem;
`;

const StyledImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
`;

const StyledContent = styled.p`
  font-size: 2rem;
  text-align: justify;
  margin-bottom: 1rem;
`;

const StyledImgContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const StyledImgContent = styled.img`
  width: 40%;
  height: auto;
  margin-bottom: 1rem;
`;
