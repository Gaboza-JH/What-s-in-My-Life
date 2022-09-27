// API 요청에 대한 코드
import baseURL from ".";

//POST Info API
export const postInfoAPI = (data) =>
  fetch(`${baseURL}/api/info/`, {
    method: "POST",
    // mode: 'no-cors',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const postImagesAPI = (data) =>
  fetch(`${baseURL}/api/images/`, {
    method: "POST",
    // mode: 'no-cors',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const getImagesAPI = () =>
  fetch(`${baseURL}/api/info/images`, {
    method: "Get",
    // mode: 'no-cors',
    headers: {
      "Content-Type": "application/json",
    },
  });
