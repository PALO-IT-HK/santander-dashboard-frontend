import React, { Component } from 'react'
import styled from 'styled-components'

import { media } from 'styledconfig'
import { StdContentCentered, StdWrapperFlexContentCentered } from 'components/Layout'
import Helmet from 'react-helmet'

const Header = styled.div`
  width: 100%;
  top: 0;
  height: 70px;
  position: fixed;
  background-color: #50aeeb;
  z-index: 1001;

  /*
  Examples for responsive css, breakpoints defined in 'styledconfig.js'
  */
  ${media.mobile`

  `}

  ${media['gt-mobile']`

  `}

  ${media.mobile`
  `}
`

const HeaderText = styled.div`
  font-size: 24px;
`

const Content = styled.div`
  padding: 70px 16px 0 16px;
  background: #FFFFFF;

  ${media.mobile`
    padding-top: 50px;
  `}
`

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #50aeeb;
  font-size: 24px;
  line-height: 1.8;
`

const FooterContent = styled.div`
  font-size: 24px;
`

class AppLayout extends Component {
  render () {
    return (
      <div>
        <Helmet title='Landing Page' titleTemplate='%s | My App' />
        <Header>
          <StdContentCentered style={{height: '100%'}}>
            <StdWrapperFlexContentCentered style={{height: '100%'}}>
              <HeaderText>Analytics Dashboard</HeaderText>
            </StdWrapperFlexContentCentered>
          </StdContentCentered>
        </Header>
        <Content>
          {this.props.children}
        </Content>
        <Footer>
          <StdContentCentered>
            <StdWrapperFlexContentCentered>
              <FooterContent>
                This is the footer
              </FooterContent>
            </StdWrapperFlexContentCentered>
          </StdContentCentered>
        </Footer>
      </div>
    )
  }
}

export default AppLayout
