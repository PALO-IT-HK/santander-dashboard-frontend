import React from 'react'
import styled from 'styled-components'

import ToggleWeatherTabs from 'components/ToggleWeatherTabs/Pure'
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
  line-height: normal;
  letter-spacing: 0.5px;
  display: flex;
`

const SearchDivText = styled.div`
  font-size: 30px;
  color: #1dacbd;
  width: 300px;
  margin-left: 1rem;
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

const GraphWrapper = styled.div`
  height: 300px;
`

const WeatherEffect = ({
  changeWeatherTabAction,
  currentWeatherTab
}) => {
  const handleWeatherTab = val => changeWeatherTabAction(val)

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
        <ToggleWeatherTabs
          value={currentWeatherTab}
          onChange={handleWeatherTab} />
        <CalendarDatePicker />
      </FilterWrapper>
      <GraphWrapper>
        <h3>Graph lives here</h3>
        {currentWeatherTab === 'TEMPERATURE' && (
          <h4>Temperature</h4>)}
        {currentWeatherTab === 'RAINFALL' && (
          <h4>Rainfall</h4>)}
      </GraphWrapper>
    </div>
  )
}

export default WeatherEffect
