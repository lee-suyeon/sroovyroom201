import React from 'react';
import styled from 'styled-components';

import Logo from 'utils/Logo'
import TextLogo from 'utils/TextLogo'
import Bar from 'utils/Bar'
import { Title } from 'utils/Typo'

const StyledPageContent = styled.div`
  padding: 0.7rem 1rem;

  & .title {
    width: 70%;
    word-break: keep-all;
    line-height: 1.3;
  }

  & > .desc {
    text-align: right;
    font-size: 0.825rem;
  }
`

function PageContent({ title, desc }) {
  return(
    <React.Fragment>
      <StyledPageContent>
        <Logo size="large"/>
        <Title>
          {title}
        </Title>
          <div className="desc">{desc}</div>
      </StyledPageContent>
      <Bar />
    </React.Fragment>
  )
}

export default PageContent;