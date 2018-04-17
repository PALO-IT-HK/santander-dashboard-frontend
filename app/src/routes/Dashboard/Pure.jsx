import React from 'react'
import styled from 'styled-components'

import { StdWrapperFlexContentCentered } from 'components/Layout'
import BikeUsageMainSearch from 'components/BikeUsageMainSearch'
import WeatherEffect from 'components/WeatherEffect'

const MainDiv = styled.div`
  text-align: center;
  margin-top: 60px;
  padding: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 63px);
`

export default function Dashboard ({getDashboard, dashboardData, value, currentTab}) {
  return (
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
  )
}
