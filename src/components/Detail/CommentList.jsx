import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { createComment } from '../../pages/api';
import CommentItem from '../Detail/CommentItem';

const CommentList = ({ itemData, userId }) => {
  const queryClient = useQueryClient();
  const [body, setBody] = useState('');

  // 댓글 작성 mutation 사용자가 입력한 댓글을 서버로 전송하여 데이터베이스에 저장
  const { isLoading: createLoading, mutate: createMutate } =
    useMutation(createComment);

  // 내용 감지
  const onChangeBody = (event) => {
    setBody(event.target.value);
  };

  // 작성
  const submitComment = async (event) => {
    event.preventDefault();
    createMutate(
      { userId, body },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('comments');
        },
      },
    );
    setBody('');
  };

  if (createLoading) {
    return <div> 댓글을 작성중입니다.</div>;
  }

  return (
    <div>
      <Comment>댓글작성</Comment>
      <Form onSubmit={submitComment}>
        <BodyInput
          maxLength={200}
          onChange={onChangeBody}
          value={body}
          placeholder="내용 (최대 200자)"
          required
        />
        <CommentBtn>등록</CommentBtn>
      </Form>
      {itemData?.map((item) => (
        <CommentItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CommentList;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const BodyInput = styled.input`
  width: 87.5rem;
  height: 10rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.25rem;
  border-radius: 0.625rem;
  background-color: #eee;
  margin-bottom: 1.25rem;
`;

const CommentBtn = styled.button`
  height: 1.75rem;
  border-radius: 0.313rem;
  background-color: #e65925;
  color: white;
  border: none;
  margin: 0.438rem;
  &:hover {
    transform: scale(1.2);
    display: flex;
    justify-content: flex-end;
  }
`;

const Comment = styled.div`
  font-size: 2rem;
  color: #1b1b18;
  margin-bottom: 1rem;
`;
