import React from 'react';
import styled from 'styled-components';

const DivideBar = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.mainColor };
`

function Bar({ style, ...rest}) {
  return (
    <DivideBar
      style={style}
      { ...rest }
    />
  )
}

export default Bar
