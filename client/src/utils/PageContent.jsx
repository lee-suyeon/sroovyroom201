import React from 'react';
import styled from 'styled-components';

import Logo from 'utils/Logo'
import TextLogo from 'utils/TextLogo'
import Bar from 'utils/Bar'
import { Title } from 'utils/Typo'

const StyledPageContent = styled.div`
  padding: 0.7rem 1rem;

  & .title {
    width: 60%;
  }

  & > .desc {
    text-align: right;
    font-size: 0.9rem;
  }
`

function PageContent({ title, desc }) {
  return(
    <React.Fragment>
      <StyledPageContent>
        <Logo size="large"/>
        <Title>
          <TextLogo size="large"/><br />
          <div className="title">{title}</div>
        </Title>
          <div className="desc">{desc}</div>
  
      </StyledPageContent>
      <Bar />
    </React.Fragment>
  )
}

export default PageContent;