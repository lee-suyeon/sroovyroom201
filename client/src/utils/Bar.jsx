import React from 'react';
import styled, { css } from 'styled-components';

const DivideBar = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.mainColor };
  margin-bottom: 2rem;
`

function Bar() {
  return (
    <DivideBar />
  )
}

export default Bar
