import React from 'react'
import styled from 'styled-components'

import ToggleTabs from 'components/ToggleTabs/Pure'
import Heatmap from 'components/Heatmap/Pure'
import BikeUsageGraph from 'components/BikeUsageGraph/Pure'

const RenderMapGraphDiv = styled.div`
  min-height: 500px;
`

const SearchBoxDiv = styled.div`
  height: 100px;
  padding: 0 5rem;
`

const BikeUsageMainSearch = ({currentToggledTab, changeToggledTabAction, currentMarker, toggleMarkerLabelVisibilityAction, hideMarkerLabelAction, data}) => {
  const handleTabChange = v => changeToggledTabAction(v)

  return (
    <div>
      <SearchBoxDiv>
        <h2>BIKE USAGE IN LONDON (SEARCH BOX)</h2>
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
          currentMarker={currentMarker} />}
        {currentToggledTab === 'GRAPH' &&
          <BikeUsageGraph data={data} />}
      </RenderMapGraphDiv>
    </div>
  )
}

export default BikeUsageMainSearch
