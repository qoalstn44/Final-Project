import React, { useState } from "react";
import {authService} from '../common/firebase';
import Router from '../shared/Router';
import styled from "styled-components";
import { getDatabase, ref, set} from "firebase/database";

const DetailPage = () => {
  // 로그인 체크 기능
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  
  const [comment,setComment] = useState("");
  const onSubmit  = async (event:any) => {
    event.preventDefault();
  await getDatabase.ref("comment").push({
      comment,
      createdAt:Date.now(),
    });
  };
  const onChange = (event: any) => {
    const { target: { value } } = event;
    setComment(value);
  };
  return <div>   
    {/* <Router isLoggedIn={isLoggedIn}/> */}
    <form onSubmit={onSubmit}>
      <p>댓글작성</p>
      <input value={comment} onChange={onChange} placeholder='여기에 작성해 주세요' maxLength={200} required/>
      <input type="submit" value="작성완료"/>
    </form>
  </div>;
}

export default DetailPage;


