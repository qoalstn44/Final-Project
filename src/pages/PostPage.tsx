import React, { useState } from 'react';
import styled from 'styled-components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '../components/PostPage/Button';
import ReactHtmlParser from 'react-html-parser';
import { v4 as uuidv4 } from 'uuid';
import PostModal from '../components/PostPage/PostModal';
import { collection, addDoc } from 'firebase/firestore';
import { dbService } from '../common/firebase';
import './css/ckeditor.css';
import {
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
} from '@ckeditor/ckeditor5-image';

const PostPage = () => {
  // 글쓰기 게시판
  const [inputPost, setInputPost] = useState({
    title: '',
    contents: '',
    id: uuidv4(),
  });
  const [viewPost, setViewPost] = useState<any[]>([]);
  const handleForm = (event: any) => {
    event.preventDefault();
  };
  const getValue = (event: any) => {
    const { name, value } = event.target;
    setInputPost({
      ...inputPost,
      [name]: value,
    });
  };

  // 입력 모달
  const [postModalOpen, setPostModalOpen] = useState(false);
  const openModal = () => {
    setPostModalOpen(true);
  };
  // 취소 모달
  const [postModalDelete, setPostModalDelete] = useState(false);
  const deleteModal = () => {
    setPostModalDelete(true);
  };

  // database 입력
  const data = async () => {
    try {
      const docRef = await addDoc(collection(dbService, 'post'), {
        title: `${inputPost.title}`,
        contents: `${inputPost.contents}`,
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div>
      <StyledOutputDiv>
        <StyledOutput>
          {viewPost.map((item: any) => {
            return (
              <div key={item.id}>
                <h2>{item.title}</h2>
                <p>{ReactHtmlParser(item.contents)}</p>
              </div>
            );
          })}
        </StyledOutput>
      </StyledOutputDiv>
      <StyledForm onClick={handleForm}>
        <StyledInput
          name="title"
          type="text"
          placeholder="제목"
          onChange={getValue}
        />
        <StyledCKEditor>
          <CKEditor
            editor={ClassicEditor}
            config={{
              placeholder: '내용을 입력하세요.',
              plugins: [ImageToolbar, ImageCaption, ImageStyle, ImageResize],
              image: {
                toolbar: [
                  'imageStyle:block',
                  'imageStyle:side',
                  '|',
                  'toggleImageCaption',
                  'imageTextAlternative',
                  '|',
                  'linkImage',
                ],
              },
            }}
            data="<p></p>"
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
        </StyledCKEditor>
        <StyledButtonDiv>
          <Button
            onClick={() => {
              setViewPost(viewPost.concat({ ...inputPost }));
              data();
              openModal();
            }}
          >
            입력
          </Button>
          {postModalOpen && (
            <PostModal
              setPostModalOpen={setPostModalOpen}
              setPostModalDelete={undefined}
            >
              작성되었습니다.
            </PostModal>
          )}
          <Button
            onClick={() => {
              deleteModal();
            }}
          >
            취소
          </Button>
          {postModalDelete && (
            <PostModal
              setPostModalDelete={setPostModalDelete}
              setPostModalOpen={undefined}
            >
              취소 하시겠습니까?
            </PostModal>
          )}
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
  margin-bottom: 3rem;
  margin-top: 8rem;
`;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 1rem 0;
  padding-right: 28rem;
  padding-left: 1rem;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledCKEditor = styled.div`
  height: 5rem;
`;
