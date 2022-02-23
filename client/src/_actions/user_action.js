import axios from 'axios';

export const TEMPORARY_USER = "TEMPORARY_USER";
export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const AUTH_USER = "AUTH_USER";


export const temporaryUser = (userName) => {
  return {
    type: TEMPORARY_USER,
    payload: userName
  }
}

const host = "http://localhost:5000";
// 랩핑 한다.
export const ApiService = async (headers, url, body, method) => {

  // 확장성
  // 공통처리

  // 로그찍는것 끝.
  log(body);

  if (url.test(/google.api/)) {
    headers = {...headers, key: "google-key"};
  }


  if (method === "GET") {
    return await axios.get(headers, url, body);
  } else if (method === "POST") {
    return await axios.post(headers, url, body);
  }
}


const log = console.log;
export const loginUser = (userData) => {

  const headers = {
    "x-token" : "12312312123",
    "user-login-yn" : "y"
  }

  const result = ApiService(headers, "/api/users/login", userData, "POST");

  log(userData);

  const request = axios.post(headers,  host + '/api/users/login', userData)
    .then(response => response.data );

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export const registerUser = (userData) => {

  log(userData);
  
  const request = axios.post('/api/users/register', userData)
    .then(response => response.data );

  return {
    type: REGISTER_USER,
    payload: request
  }
}

export const auth = () => {
  
  const request = axios.get('/api/users/auth')
    .then(response => response.data );

  return {
    type: AUTH_USER,
    payload: request,
  }
}
