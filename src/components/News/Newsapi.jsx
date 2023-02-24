import axios from "axios";

const Kakao = axios.create({
    baseURL: "https://dapi.kakao.com", // 공통 요청 경로를 지정해준다.
    headers: {
        Authorization: "KakaoAK 911791e381ad6686e6bfce2722152146" // 공통으로 요청 할 헤더
    }
});

// search news api
export const newsSearch = params => {
    return Kakao.get("/v2/search/blog", { params });
};
