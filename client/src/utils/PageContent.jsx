import React from 'react';
import styled from 'styled-components';

import Logo from 'utils/Logo'
import TextLogo from 'utils/TextLogo'
import Bar from 'utils/Bar'
import { Title } from 'utils/Typo'

const StyledPageContent = styled.div`
  padding: 1rem;

  & .title {
    width: 60%;
  }

  & > .desc {
    text-align: right;
  }
`

function PageContent({ title, desc }) {
  return(
    <StyledPageContent>
      <Logo size="large"/>
      <Title>
        <TextLogo size="large"/><br />
        <div className="title">{title}</div>
      </Title>
        <div className="desc">{desc}</div>
    </StyledPageContent>
  )
}

export default PageContent;