// PostPage.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '../components/PostPage/Button';
import ReactHtmlParser from 'react-html-parser';
import { v4 as uuidv4 } from 'uuid';
import PostModal from '../components/PostPage/PostModal';

const PostPage = () => {
  const [inputPost, setInputPost] = useState({
    title: '',
    contents: '',
    id: uuidv4(),
  });
  const [viewPost, setViewPost] = useState<any[]>([]);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postModalDelete, setPostModalDelete] = useState(false);
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

  const openModal = () => {
    setPostModalOpen(true);
  };
  const deleteModal = () => {
    setPostModalDelete(true);
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
        <CKEditor
          editor={ClassicEditor}
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
        <StyledButtonDiv>
          <Button
            onClick={() => {
              setViewPost(viewPost.concat({ ...inputPost }));
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
              작성이 되었습니다.
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
              작성이 취소 되었습니다.
            </PostModal>
          )}
        </StyledButtonDiv>
      </StyledForm>
    </div>
  );
};

export default PostPage