export const OAUTH_REDIRECT_URL = "http://localhost:8080/login/oauth2/code/"

export const NAVER_CLIENT_ID = "iOmtEYOzjWoW75Mq4FlE"

// Naver
export const NAVER_AUTH_URL = "https://nid.naver.com/oauth2.0/authorize?client_id=" + NAVER_CLIENT_ID
                            + "&redirect_url=" + OAUTH_REDIRECT_URL + "naver"
                            + "&response_type=token" + "&state=state"