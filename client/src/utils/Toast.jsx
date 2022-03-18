import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast () {
  return (
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      closeOnClick
    />
  )
}

export default Toast;