import React from 'react'
import styled from 'styled-components'

import { StdContentCentered } from 'components/Layout'

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

const DashboardData = styled.div`
  padding: 5px;
  border: 1px solid black;
`

const Dashboard = ({getDashboard, dashboardData}) => {
  return (
    <Wrap>
      <BodyWrap>
        <MainDiv>
          <IntroButton onClick={getDashboard}>Click me</IntroButton>
        </MainDiv>
      </BodyWrap>
    </Wrap>
  )
}

export default Dashboard
