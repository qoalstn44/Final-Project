import { useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/PostPage/Button';
import PostModal from '../components/PostPage/PostModal';
import { useNavigate } from 'react-router';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { Editor } from '@toast-ui/react-editor';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { authService, dbService } from '../common/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const PostPage = () => {
  const navigate = useNavigate();
  // 글쓰기 게시판
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  };

  // 데이터 베이스에 전송
  const handleForm = async () => {
    try {
      await addDoc(collection(dbService, 'posts'), {
        title,
        contents: editorRef.current?.getInstance().getHTML(),
        timeStamp: serverTimestamp(),
        uid: authService.currentUser.uid,
      });
    } catch (error) {
      console.log(error);
    }
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

  // 이미지 업로드
  const storage = getStorage();
  const storageRef = ref(storage, uuidv4());
  return (
    <div>
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
          hooks={{
            addImageBlobHook: async (blob, callback) => {
              callback(
                uploadBytes(storageRef, blob).then((snapshot) => {
                  console.log('Uploaded a blob or file!');
                }),
              );
            },
          }}
        />
        <StyledButtonDiv>
          <Button
            onClick={() => {
              handleForm();
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

const StyledFormDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
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
