import React from "react";
import styled from "styled-components";

import Logo from "utils/Logo";
import Bar from "utils/Bar";
import { Title } from "utils/Typo";
import SideNav from "components/views/SideNav/SideNav";

const StyledPageContent = styled.div`
  margin-bottom: 1.5rem;

  & .wrapper {
    padding: 0 0.7rem 0.7rem;
  }

  & .title {
    width: 70%;
    word-break: keep-all;
    line-height: 1.3;
  }

  & .desc {
    text-align: right;
    font-size: 0.825rem;
  }
`;

function PageContent({ title, desc, menu = true }) {
  return (
    <StyledPageContent>
      {menu && <SideNav />}
      <div className="wrapper">
        <Logo size="large" />
        <Title>{title}</Title>
        <div className="desc">{desc}</div>
      </div>
      <Bar />
    </StyledPageContent>
  );
}

export default PageContent;
