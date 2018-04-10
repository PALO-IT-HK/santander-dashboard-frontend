import React from 'react'
import styled from 'styled-components'

import ToggleTabs from 'components/ToggleTabs/Pure'
import Heatmap from 'components/Heatmap/Pure'
import BikeUsageGraph from 'components/BikeUsageGraph/Pure'
import SearchBar from 'components/SearchBar/Pure'

const RenderMapGraphDiv = styled.div`
  height: 300px;
`

const SearchBoxDiv = styled.div`
  height: 150px;
  padding: 0 5rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`

const SubHeader = styled.div`
  padding: 30px 30px 20px 0px;
  font-size: 36px;
  color: #748597;
  font-family: Abril Fatface;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: 0.5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`


const BikeUsageMainSearch = ({currentToggledTab, changeToggledTabAction, changeInputFocusAction, 
  currentFocusStatus, currentMarker, toggleMarkerLabelVisibilityAction, hideMarkerLabelAction, 
  data, updateMapLocationAction, searchedLocation, mapInitialLoadStatus, getBikePointsActionSaga,
  currentBikePointsArray}) => {
  const handleTabChange = v => changeToggledTabAction(v)
  return (
    <div>
      <SearchBoxDiv>
        <SubHeader> Bike usage of 
          <SearchBar 
            changeInputFocusAction={changeInputFocusAction} 
            currentFocusStatus={currentFocusStatus}
            updateMapLocationAction={updateMapLocationAction}
            searchedLocation={searchedLocation} />
        </SubHeader>
        <ToggleTabs
          value={currentToggledTab}
          onChange={handleTabChange}
        />
      </SearchBoxDiv>
      <RenderMapGraphDiv>
        {currentToggledTab === 'HEAT MAP' &&
          <Heatmap
            isMarkerShown
            toggleMarkerLabelVisibilityAction={toggleMarkerLabelVisibilityAction}
            hideMarkerLabelAction={hideMarkerLabelAction}
            currentMarker={currentMarker}
            mapInitialLoadStatus={mapInitialLoadStatus}
            getBikePointsActionSaga={getBikePointsActionSaga}
            currentBikePointsArray={currentBikePointsArray} />}
        {currentToggledTab === 'GRAPH' &&
          <BikeUsageGraph data={data} />}
      </RenderMapGraphDiv>
    </div>
  )
}

export default BikeUsageMainSearch
