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

    // 댓글 가져오기
    export const readComment = async () => {
    let getCommentData= [];
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


