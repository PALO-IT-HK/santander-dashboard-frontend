import React from 'react'
import styled from 'styled-components'

import CalendarDatePicker from 'components/CalendarDatePicker/Pure'

const SearchWrapper = styled.div`
  height: 70px;
  padding: 0 5rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  top: 40px;
`

const SubHeader = styled.div`
  padding: 0;
  width: fit-content;
  height: auto;
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
  justify-content: flex-start;
  align-items: center;
`

const SearchDivText = styled.div`
  font-family: Abril Fatface;
  font-size: 30px;
  color: #1dacbd;
  width: 300px;
  padding-left: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 2px dashed #1dacbd;
`

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 40px;
`

const DateTab = styled.div`
  height: 100px;
  width: auto;
`
const ToggleWeatherTabs = styled.div`
  height: 100px;
  width: auto;
`

const GraphWrapper = styled.div`
  height: 300px;
`

const WeatherEffect = ({
  state
}) => {
  return (
    <div>
      <SearchWrapper>
        <SubHeader>
          {' '}
          Weather effect of
          <SearchDivText>{' '} all docks in London</SearchDivText>
        </SubHeader>
      </SearchWrapper>
      <FilterWrapper>
        <ToggleWeatherTabs />
        <DateTab />
      </FilterWrapper>
      <GraphWrapper>
        <h3>Graph lives here</h3>
      </GraphWrapper>
    </div>
  )
}

export default WeatherEffect
