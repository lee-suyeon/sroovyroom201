import axios from 'axios';

export const LOGIN_USER = "LOGIN_USER";
export const REGISTER_USER = "REGISTER_USER";
export const AUTH_USER = "AUTH_USER"

export const loginUser = (userData) => {
  
  const request = axios.post('/api/users/login', userData)
    .then(response => response.data );

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export const registerUser = (userData) => {
  
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