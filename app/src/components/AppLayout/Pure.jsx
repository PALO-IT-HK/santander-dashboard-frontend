import React, { Component } from 'react'
import styled from 'styled-components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { media } from 'styledconfig'
import NavBarTabs from 'components/Tabs/Pure'
import { StdContentCentered, StdWrapperFlexContentCentered } from 'components/Layout'
import Helmet from 'react-helmet'

const Header = styled.div`
  width: 100%;
  top: 0;
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
  padding: 0;
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
  handleTabChange = v => this.props.changeTabAction(v)
  render () {
    return (
      <div>
        <MuiThemeProvider>
          <React.Fragment>
            <Helmet title='Landing Page' titleTemplate='%s | My App' />
            <Header>
              <StdContentCentered style={{height: '100%'}}>
                <StdWrapperFlexContentCentered style={{height: '100%'}}>
                  <NavBarTabs
                    value={this.props.currentTab}
                    onChange={this.handleTabChange}
                  />
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
          </React.Fragment>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default AppLayout
