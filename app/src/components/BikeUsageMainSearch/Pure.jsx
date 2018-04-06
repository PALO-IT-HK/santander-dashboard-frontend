import React from 'react'
import styled from 'styled-components'

import ToggleTabs from 'components/ToggleTabs/Pure'

const RenderMapGraphDiv = styled.div`
  min-height: 500px;
`

const SearchBoxDiv = styled.div`
  height: 200px;
  padding: 0 5rem;
`

const BikeUsageMainSearch = ({currentToggledTab, changeToggledTabAction}) => {
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
        {currentToggledTab === 'HEAT MAP' && <h3>HEAT MAP COMPONENT</h3>}
        {currentToggledTab === 'GRAPH' && <h3>GRAPH COMPONENT</h3>}
      </RenderMapGraphDiv>
    </div>
  )
}

export default BikeUsageMainSearch
