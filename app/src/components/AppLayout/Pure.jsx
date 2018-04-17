import React from 'react'
import styled from 'styled-components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { media } from 'styledconfig'
import MenuBar from 'components/MenuBar/Pure'
import { StdWrapperFlexContentLeft } from 'components/Layout'
import Helmet from 'react-helmet'

const RootAppContainer = styled.div`

`

const Header = styled.div`
  width: 100%;
  top: 0;
  position: fixed;
  background-color: #ffffff;
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
  background: #f1f4f8;
  ${media.mobile`
    padding-top: 50px;
  `};
`

const AppLayout = ({ currentTab, changeTabAction, loadingBarStatus, children }) => {
  const handleTabChange = v => changeTabAction(v)
  return (
    <RootAppContainer>
      <MuiThemeProvider>
        <React.Fragment>
          <Helmet title='Landing Page' titleTemplate='%s | My App' />
          <Header>
            <StdWrapperFlexContentLeft>
              <MenuBar
                value={currentTab}
                onChange={v => handleTabChange(v)}
                loadingBarStatus={loadingBarStatus}
              />
            </StdWrapperFlexContentLeft>
          </Header>
          <Content>{children}</Content>
        </React.Fragment>
      </MuiThemeProvider>
    </RootAppContainer>
  )
}

export default AppLayout
