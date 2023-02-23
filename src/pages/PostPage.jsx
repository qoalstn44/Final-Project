import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/PostPage/Button';
import PostModal from '../components/PostPage/PostModal';
import { dbService } from '../common/firebase';
import { useNavigate } from 'react-router';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { Editor } from '@toast-ui/react-editor';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../common/firebase';

const PostPage = () => {
  const navigate = useNavigate();
  // 글쓰기 게시판
  const [title, setTitle] = useState('');
  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  };
  const editorRef = useRef(null);
  const handleText = () => {
    const test = editorRef.current?.getInstance().getHTML();
    console.log(test);
  };

  // 데이터 베이스에 전송
  const handleForm = async () => {
    await addDoc(collection(dbService, 'posts'), {
      title,
      contents: editorRef.current?.getInstance().getHTML(),
      timeStamp: serverTimestamp(),
      uid: authService.currentUser.uid,
    });
    console.log(title);
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

  // const onUploadImage = async (blob, callback) => {
  //   const url = await uploadImage(blob);
  //   callback(url, 'alt text');
  //   return false;
  // };

  return (
    <div>
      <StyledOutputDiv>
        <StyledOutput></StyledOutput>
      </StyledOutputDiv>
      <StyledFormDiv>
        <StyledInput
          name="title"
          type="text"
          placeholder="제목"
          value={title}
          onChange={handleTitleInput}
        />
        <Editor
          initialValue=""
          placeholder="글을 작성해주세요."
          previewStyle="vertical"
          height="25rem"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          language="ko-KR"
          previewHighlight={false}
          hideModeSwitch={true}
          ref={editorRef}
          theme="dark"
          // hooks={{
          //   addImageBlobHook: onUploadImage,
          // }}
        />
        <StyledButtonDiv>
          <Button
            onClick={() => {
              handleForm();
              handleText();
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
          <Button
            onClick={() => {
              navigate('/dummyPage');
            }}
          >
            네비게이터
          </Button>
        </StyledButtonDiv>
      </StyledFormDiv>
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
  width: 39.5rem;
  border: 1px solid #333;
  padding: 10px 0 30px 0;
  border-radius: 5px;
  margin-bottom: 3rem;
  margin-top: 8rem;
`;

const StyledFormDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  padding: 1rem 0;
  padding-right: 39.8rem;
  padding-left: 1rem;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;
