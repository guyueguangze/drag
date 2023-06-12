import React from "react"
import styled from "styled-components"

const FooterWrapper = styled.footer`
  background-color: #333;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 208px;
`

const Link = styled.a`
  color: white;
  text-decoration: none;
  margin-left: 10px;

  &:hover {
    text-decoration: underline;
  }
`

function Footer({ children }) {
  return <FooterWrapper>{children}</FooterWrapper>
}

export default Footer
