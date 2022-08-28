// API 요청에 대한 코드
import baseURL from "."; // .으로 지정하면 index.js import 한다는 의미


//POST Info API
export const postInfoAPI = (data) => fetch(`${baseURL}/api/info/`, {
    method: 'POST',
    // mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
});

export const postImagesAPI = (data) => fetch(`${baseURL}/api/images/`, {
    method: 'POST',
    // mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)

});

export const getImagesAPI = () => fetch(`${baseURL}/api/info/images`, {
    method: 'Get',
    // mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json'
    },

});