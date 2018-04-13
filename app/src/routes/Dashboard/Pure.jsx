import React from 'react'
import styled from 'styled-components'

import { StdWrapperFlexContentCentered } from 'components/Layout'
import BikeUsageMainSearch from 'components/BikeUsageMainSearch'
import WeatherEffect from 'components/WeatherEffect/Pure'

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
  margin-top: 80px;
  padding: 0;
`

export default function Dashboard ({getDashboard, dashboardData, value, currentTab}) {
  return (
    <Wrap>
      <BodyWrap>
        <MainDiv>
          {currentTab === 'BIKE USAGE' && (
            <BikeUsageMainSearch />)}
          {currentTab === 'WEATHER EFFECT' && (
            <WeatherEffect />
          )}
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
