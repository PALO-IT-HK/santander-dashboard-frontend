import React, { Component } from 'react'
import styled from 'styled-components'

import { media } from 'styledconfig'
import { StdContentCentered } from 'components/Layout'
import Helmet from 'react-helmet'

const Header = styled.div`
  width: 100%;
  top: 0;
  height: 70px;
  position: fixed;
  background-color: #000;
  z-index: 1001;

  /*
  Examples for responsive css, breakpoints defined in 'styledconfig.js'
  */
  ${media.xs`

  `}

  ${media['gt-sm']`

  `}

  ${media.sm`
  `}
`

const Content = styled.div`
  padding: 70px 16px 0 16px;
  background: #ffffff;

  ${media.sm`
    padding-top: 50px;
  `}
`

const Footer = styled.div`
  background: #333;
  color: #AAA;
  padding: 32px 16px;
  font-size: 14px;
  line-height: 1.8;
`

class AppLayout extends Component {
  render () {
    return (
      <div>
        <Helmet title='Landing Page' titleTemplate='%s | My App' />
        <Header>
          <StdContentCentered style={{height: '100%'}}>
            This is the header
          </StdContentCentered>
        </Header>
        <Content>
          {this.props.children}
        </Content>
        <Footer>
          <StdContentCentered>
            This is the footer
          </StdContentCentered>
        </Footer>
      </div>
    )
  }
}

export default AppLayout
