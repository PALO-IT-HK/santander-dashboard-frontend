import React from 'react'
import styled from 'styled-components'

import { StdWrapperFlexContentCentered } from 'components/Layout'
import SButton from '../../components/Button/Pure'

const Wrap = styled.div`
  margin: 0;
  min-height: calc(100vh - 100px);
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`

const BodyWrap = styled.div`
  flex: 1;
  height: 100%;
`

const MainDiv = styled.div`
  text-align: center;
  padding: 32px;
`

const IntroButton = styled.button`
  width: 150px;
  height: 20px;

  &:hover {
    cursor: pointer;
  }
`

export default function Dashboard ({getDashboard, dashboardData}) {
  return (
    <Wrap>
      <BodyWrap>
        <MainDiv>
          <SButton onClick={getDashboard}
                   children={'Click Me'}>Click me</SButton>
          {dashboardData && 
          <StdWrapperFlexContentCentered>
            {JSON.stringify(dashboardData, 2, null)}
          </StdWrapperFlexContentCentered>
          }
        </MainDiv>
      </BodyWrap>
    </Wrap>
  )
}
