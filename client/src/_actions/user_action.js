import axios from 'axios';

export const LOGIN_USER = "LOGIN_USER";

export const loginUser = (userData) => {
  
  const request = axios.post('/api/users/login', userData)
    .then(response => response.data );

  return {
    type: LOGIN_USER,
    payload: request
  }
}