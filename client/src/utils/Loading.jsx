import React from 'react';
import Loader from 'react-loader-spinner';

function Loading({ ...rest}) {
  return (
    <Loader
      type="Oval"
      color="#779482"
      height={70}
      width={70}
      />
  )
}

export default Loading
