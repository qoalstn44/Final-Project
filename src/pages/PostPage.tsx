import React, { useState } from 'react';
import styled from 'styled-components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '../components/PostPage/Button';

const PostPage = () => {
  const [inputPost, setInputPost] = useState({
    title: '',
    contents: '',
  });
  const [viewPost, setViewPost] = useState([]);
  const handleForm = (event: any) => {
    event.preventDefault();
  };
  const getValue = (event: any) => {
    const { name, value } = event.target;
    setInputPost({
      ...inputPost,
      [name]: value,
    });
    console.log(inputPost);
  };
  return (
    <div>
      <StyledOutputDiv>
        <StyledOutput>
          <h1>제목</h1>
          <p>내용</p>
        </StyledOutput>
      </StyledOutputDiv>
      <StyledForm onClick={handleForm}>
        <StyledInput
          name="title"
          type="text"
          placeholder="제목"
          onChange={getValue}
        />
        <CKEditor
          editor={ClassicEditor}
          data="<p>여기에 글을 작성해주세요.</p>"
          onReady={(editor: any) => {
            // console.log('Editor is ready to use!', editor);
          }}
          onChange={(event: any, editor: any) => {
            const data = editor.getData();
            // console.log({ event, editor, data });
            setInputPost({
              ...inputPost,
              contents: data,
            });
            console.log(inputPost);
          }}
          onBlur={(event: any, editor: any) => {
            // console.log('Blur.', editor);
          }}
          onFocus={(event: any, editor: any) => {
            // console.log('Focus.', editor);
          }}
        />
        <StyledButtonDiv>
          <Button
            onClick={() => {
              setViewPost(viewPost.concat({ ...inputPost }));
            }}
          >
            완료
          </Button>
          {/* <Button>취소</Button> */}
        </StyledButtonDiv>
      </StyledForm>
    </div>
  );
};

export default PostPage;

const StyledOutputDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledOutput = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;
  border: 1px solid #333;
  padding: 10px 0 30px 0;
  border-radius: 5px;
  margin-bottom: 50px;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 1rem 0;
  padding-right: 20rem;
  padding-left: 1rem;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;
