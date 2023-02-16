import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    orderBy,
    query,
    updateDoc,
    increment,
    serverTimestamp,
    } from 'firebase/firestore'
    import { dbService } from '../common/firebase';

    // 댓글 작성
    export const createComment = async (item: CommentType) => {
    await addDoc(collection(dbService, 'comments'), {
    userId: item.userId,
    createAt: Date.now(),
    name: item.name,
    body: item.body,
    timeStamp: serverTimestamp()
    });
    };

    // 댓글 가져오기
    export const readComment = async () => {
    let getCommentData: CommentType[] = [];
    const q = query(
    collection(dbService, `comments`),
    orderBy('createAt', 'desc')
    );
    const docs = await getDocs(q);
    docs.forEach((doc) => {
    const Data = {
        id: doc.id,
        ...doc.data(),
    };
    getCommentData.push(Data);
    });
    return getCommentData;
    };

    // 댓글 삭제
    export const deleteComment = async (item: CommentType) => {
    deleteDoc(doc(dbService, `comments/${item.id}`));
    };


