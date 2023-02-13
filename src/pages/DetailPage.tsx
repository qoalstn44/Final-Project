import React, { useState } from 'react';
import { authService } from '../common/firebase';
import { getDatabase, ref, set } from 'firebase/database';

const DetailPage = () => {
  // 로그인 체크 기능

  const database = getDatabase();
  const [comment, setComment] = useState('');
  const onSubmit = async (
    userId: any,
    name: any,
    email: any,
    imageUrl: any,
  ) => {
    await set(ref(database, 'comments/' + comment), {
      comment,
      userId,
      name,
      email,
      imageUrl,
    });
    setComment('');
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setComment(value);
  };
  return (
    <div>
      <div
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(
            authService.currentUser?.uid,
            authService.currentUser?.displayName,
            authService.currentUser?.email,
            authService.currentUser?.photoURL,
          );
        }}
      >
        <p>댓글작성</p>
        <input
          value={comment}
          onChange={onChange}
          placeholder="여기에 작성해 주세요"
          maxLength={200}
          required
        />
        <button type="submit">작성완료</button>
      </div>
    </div>
  );
};
export default DetailPage;
