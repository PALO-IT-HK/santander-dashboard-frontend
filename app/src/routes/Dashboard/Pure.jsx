import React from 'react'
import styled from 'styled-components'

import { StdWrapperFlexContentCentered } from 'components/Layout'
<<<<<<< HEAD
// import SButton from 'components/Button/Pure'
import Heatmap from 'components/Heatmap/Pure'
=======
import SButton from 'components/Button/Pure'
import BikeUsageMainSearch from 'components/BikeUsageMainSearch/Pure'
>>>>>>> f692c00bb6756e476ad32550ad109cc8c8279fba

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

export default function Dashboard ({getDashboard, dashboardData, value, currentTab, currentMarker,
  toggleMarkerLabelVisibilityAction, hideMarkerLabelAction, currentToggledTab, changeToggledTabAction}) {
  return (
    <Wrap>
      <BodyWrap>
        <MainDiv>
          {currentTab === 'BIKEUSAGE' &&
            <Heatmap
              isMarkerShown
              toggleMarkerLabelVisibilityAction={toggleMarkerLabelVisibilityAction}
              hideMarkerLabelAction={hideMarkerLabelAction}
              currentMarker={currentMarker} />
          }
          {currentTab === 'BIKE USAGE' && <BikeUsageMainSearch currentToggledTab={currentToggledTab} changeToggledTabAction={changeToggledTabAction} />}
          {currentTab === 'WEATHER EFFECT' && <h1>WEATHER EFFECT</h1>}
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
