import React from 'react'
import styled from 'styled-components'

import { StdWrapperFlexContentCentered } from 'components/Layout'
import Heatmap from 'components/Heatmap/Pure'
import BikeUsageMainSearch from 'components/BikeUsageMainSearch/Pure'

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
  toggleMarkerLabelVisibilityAction, hideMarkerLabelAction, currentToggledTab, changeToggledTabAction, 
  graphData}) {
  return (
    <Wrap>
      <BodyWrap>
        <MainDiv>
          {currentTab === 'BIKE USAGE' && <BikeUsageMainSearch currentToggledTab={currentToggledTab}
                                                               changeToggledTabAction={changeToggledTabAction}
                                                               data={graphData.list}
                                                               currentMarker={currentMarker}
                                                               toggleMarkerLabelVisibilityAction={toggleMarkerLabelVisibilityAction}
                                                               hideMarkerLabelAction={hideMarkerLabelAction} />}
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
