import React from 'react'
import styled from 'styled-components'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { media } from 'styledconfig'
import MenuBar from 'components/MenuBar/Pure'
import {
  StdContentCentered,
  StdWrapperFlexContentLeft
} from 'components/Layout'
import Helmet from 'react-helmet'

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

const AppLayout = ({ currentTab, changeTabAction, children }) => {
  const handleTabChange = v => changeTabAction(v)
  return (
    <div>
      <MuiThemeProvider>
        <React.Fragment>
          <Helmet title='Landing Page' titleTemplate='%s | My App' />
          <Header>
            <StdContentCentered style={{ height: '100%' }}>
              <StdWrapperFlexContentLeft style={{ height: '100%' }}>
                <MenuBar
                  value={currentTab}
                  onChange={v => handleTabChange(v)}
                />
              </StdWrapperFlexContentLeft>
            </StdContentCentered>
          </Header>
          <Content>{children}</Content>
        </React.Fragment>
      </MuiThemeProvider>
    </div>
  )
}

export default AppLayout
