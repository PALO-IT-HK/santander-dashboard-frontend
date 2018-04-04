import React from 'react'
import styled from 'styled-components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { media } from 'styledconfig'
import NavBarTabs from 'components/Tabs/Pure'
import { StdContentCentered, StdWrapperFlexContentLeft } from 'components/Layout'
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

const Content = styled.div`
  padding: 0;
  background: #FFFFFF;

  ${media.mobile`
    padding-top: 50px;
  `}
`

const AppLayout = ({currentTab, changeTabAction, children}) => {
  const handleTabChange = v => changeTabAction(v)
  return (
    <div>
      <MuiThemeProvider>
        <React.Fragment>
          <Helmet title='Landing Page' titleTemplate='%s | My App' />
          <Header>
            <StdContentCentered style={{height: '100%'}}>
              <StdWrapperFlexContentLeft style={{height: '100%'}}>
                <NavBarTabs
                  value={currentTab}
                  onChange={(v) => handleTabChange(v)}
                />
              </StdWrapperFlexContentLeft>
            </StdContentCentered>
          </Header>
          <Content>
            {children}
          </Content>
        </React.Fragment>
      </MuiThemeProvider>
    </div>
  )
}

export default AppLayout
