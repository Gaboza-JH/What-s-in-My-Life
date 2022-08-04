const CLIENT_ID = "a187033481cf8ba76d45af5f495940e7";
const REDIRECT_URI =  "http://localhost:3000/auth/callback/kakao";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;