import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/PostPage/Button';
import PostModal from '../components/PostPage/PostModal';
import { useNavigate } from 'react-router';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { Editor } from '@toast-ui/react-editor';
import { addDoc, collection } from 'firebase/firestore';
import { authService, dbService } from '../common/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const PostPage = () => {
  const navigate = useNavigate();
  const [img, setImg] = useState('');

  // 글쓰기 게시판
  const editorRef = useRef(null);
  const [title, setTitle] = useState('');
  const handleTitleInput = (event) => {
    setTitle(event.target.value);
  };

  // 데이터 베이스에 전송
  const handleFormCommunity = async () => {
    try {
      await addDoc(collection(dbService, 'communities'), {
        title,
        contents: editorRef.current?.getInstance().getHTML(),
        author: {
          name: authService.currentUser.displayName,
          id: authService.currentUser.uid,
        },
        imgUrl: img,
        createAt: new Date(),
        views: 0,
        likes: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFormItem = async () => {
    try {
      await addDoc(collection(dbService, 'items'), {
        title,
        contents: editorRef.current?.getInstance().getHTML(),
        author: {
          name: authService.currentUser.displayName,
          id: authService.currentUser.uid,
        },
        imgUrl: img,
        createAt: new Date(),
        views: 0,
        likes: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 입력 모달
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [selectModalOpen, setSelectModalOpen] = useState('');
  const openModal = (message = '작성이 완료되었습니다.') => {
    setSelectModalOpen(message);
    setPostModalOpen(true);
  };

  // 모달창 닫혔을 경우 메시지 초기화
  useEffect(() => {
    if (postModalOpen) return;
    setSelectModalOpen('');
  }, [postModalOpen]);

  // 이미지 업로드
  const storage = getStorage();
  const storageRef = ref(storage, uuidv4());
  const upload = async (blob, callback) => {
    const uploadBytesRes = await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(uploadBytesRes.ref);
    setImg(url);
    callback(url);
  };

  // 카테고리
  const categories = [
    { value: '카테고리', name: '카테고리', id: 0 },
    { value: '커뮤니티', name: '커뮤니티', id: 1 },
    { value: '제품리뷰', name: '제품리뷰', id: 2 },
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0].value);
  const [categorySelected, setCategorySelected] = useState(false);
  const categorySelect = (event) => {
    setSelectedCategory(event.target.value);
    setCategorySelected(true);
  };
  const categoryChange = () => {
    if (categories[1].value === selectedCategory) {
      return handleFormCommunity();
    } else if (categories[2].value === selectedCategory) {
      return handleFormItem();
    }
  };
  const categoryNavigate = () => {
    if (categories[1].value === selectedCategory) {
      navigate('/communitypage');
    } else if (categories[2].value === selectedCategory) {
      navigate('/itempage');
    }
  };

  return (
    <div>
      <StyledFormDiv>
        <AContainer>
          <ASelectCategory value={selectedCategory} onChange={categorySelect}>
            {categories.map((category) => (
              <option key={categories.id} value={category.value}>
                {category.name}
              </option>
            ))}
          </ASelectCategory>
        </AContainer>
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
            addImageBlobHook: upload,
          }}
        />
        <StyledButtonDiv>
          <Button
            onClick={() => {
              if (categorySelected) {
                // 카테고리 선택됨
                categoryChange();
                openModal();
                categoryNavigate();
              } else {
                // 카테고리 선택 안됨
                openModal('카테고리를 정해주세요.');
              }
            }}
          >
            입력
          </Button>
          {postModalOpen && (
            <PostModal setPostModalOpen={setPostModalOpen}>
              {selectModalOpen}
            </PostModal>
          )}
          <Button
            onClick={() => {
              navigate('/');
            }}
          >
            취소
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
  margin-top: 8rem;
  font-family: 'Noto Sans KR', sans-serif;
`;

const AContainer = styled.div`
  position: relative;
  right: 23.1rem;
  bottom: 1rem;
`;

const ASelectCategory = styled.select`
  color: #c6c6c3;
  border: 1px solid #c6c6c3;
  padding: 0.5rem 0.4rem;
  font-weight: bold;
`;

const StyledInput = styled.input`
  padding: 1rem 10rem;
  padding-right: 3rem;
  padding-left: 1rem;
  margin-bottom: 2rem;
  font-size: 1rem;
  width: 47.2rem;
  border: 1px solid #c6c6c3;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;
