import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast () {
  return (
    <ToastContainer
      autoClose={2000}
      hideProgressBar={false}
      position="bottom-left"
      closeOnClick
    />
  )
}

export default Toast;