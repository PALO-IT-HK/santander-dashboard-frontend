import React from 'react'
import styled from 'styled-components'

import ToggleWeatherTabs from 'components/ToggleWeatherTabs/Pure'
import { formatDateBy_ddmmyyyy } from 'utils/utils'
import DateTimeSearch from 'components/DateTimeSearch/Pure'
import CalendarDatePicker from 'components/CalendarDatePicker/Pure'
import TimePicker from 'components/TimePicker/Pure'

import TemperatureGraph from 'components/TemperatureGraph/Pure'
import RainfallGraph from 'components/RainfallGraph/Pure'

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

const ToggleWeatherTabsWrapper = styled.div`
  padding: 0 5rem;
`

const DateTimeSearchWrapper = styled.div`
  width: 50%;
  padding: 0 5rem;
`

const GraphWrapper = styled.div`
  height: 300px;
`

const WeatherEffect = ({
  changeWeatherTabAction,
  currentWeatherTab,
  showErrorText,
  isLoading,
  toggleWidgetOpenStatusAction,
  showDatePicker,
  currentMarker,
  getPublicHolidayAction,
  currentDateSelection,
  fromDateWeather,
  toDateWeather,
  enteredToWeather,
  hideDatePickerAction,
  showDatePickerAction,
  clickDateFromWeatherAction,
  clickDateToWeatherAction,
  resetWeatherCalendarAction,
  isTimePickerShown,
  showTimePickerAction,
  hideTimePickerAction,
  selectTimeFromAction,
  selectTimeToAction,
  timeFrom,
  timeTo,
  timeFromArray,
  timeToArray,
  totalTimeArray,
  filterTimeToArrayAction,
  filterTimeFromArrayAction,
  getTimeTagAction,
  timeTagName,
  getBikeUsageTopLocationsActionSaga,
  bikeUsageTopLocationsArray,
  isAnyWidgetOpenCurrently,
  totalBikeUsageAndWeatherActionSaga,
  aggregatedBikeWeather
}) => {
  const handleWeatherTab = val => changeWeatherTabAction(val)

  const openDatePicker = v => {
    if (!isAnyWidgetOpenCurrently) {
      showDatePickerAction(v)
      toggleWidgetOpenStatusAction(true)
    } else {
      return null
    }
  }
  const openTimePicker = v => {
    if (!isAnyWidgetOpenCurrently) {
      showTimePickerAction(v)
      toggleWidgetOpenStatusAction(true)
    } else {
      return null
    }
  }

  const formatNewDate = () => {
    if (fromDateWeather && toDateWeather != null) {
      return `${formatDateBy_ddmmyyyy(fromDateWeather)} - ${formatDateBy_ddmmyyyy(toDateWeather)}`
    } else {
      return `Today, ${formatDateBy_ddmmyyyy(currentDateSelection)}`
    }
  }

  const formatTime = () => timeTagName || `${timeFrom} - ${timeTo}`

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
        <ToggleWeatherTabsWrapper>
          <ToggleWeatherTabs
            value={currentWeatherTab}
            onChange={handleWeatherTab} />
        </ToggleWeatherTabsWrapper>
        <DateTimeSearchWrapper>
          <DateTimeSearch
            openDatePicker={openDatePicker}
            date={formatNewDate()}
            time={formatTime()}
            isTimePickerShown={openTimePicker}
          />
          {showDatePicker ? (
            <CalendarDatePicker
              fetchSagaAction={totalBikeUsageAndWeatherActionSaga}
              getPublicHolidayAction={getPublicHolidayAction}
              clickDateFromAction={clickDateFromWeatherAction}
              clickDateToAction={clickDateToWeatherAction}
              resetDateAction={resetWeatherCalendarAction}
              from={fromDateWeather}
              to={toDateWeather}
              enteredTo={enteredToWeather}
              hideDatePickerAction={hideDatePickerAction}
              toggleWidgetOpenStatusAction={toggleWidgetOpenStatusAction}
            />
          ) : null}
          { isTimePickerShown ? (
            <TimePicker
              getTimeTagAction={getTimeTagAction}
              filterTimeFromArrayAction={filterTimeFromArrayAction}
              filterTimeToArrayAction={filterTimeToArrayAction}
              timeToArray={timeToArray}
              totalTimeArray={totalTimeArray}
              timeFromArray={timeFromArray}
              timeFrom={timeFrom}
              timeTo={timeTo}
              selectTimeFromAction={selectTimeFromAction}
              selectTimeToAction={selectTimeToAction}
              hideTimePickerAction={hideTimePickerAction}
              toggleWidgetOpenStatusAction={toggleWidgetOpenStatusAction}
            />
          ) : null}
        </DateTimeSearchWrapper>
      </FilterWrapper>
      <GraphWrapper>
        <h3>Graph lives here</h3>
        {currentWeatherTab === 'TEMPERATURE' && (
          <TemperatureGraph
            totalBikeUsageAndWeatherActionSaga={totalBikeUsageAndWeatherActionSaga}
            data={aggregatedBikeWeather}
            showErrorText={showErrorText}
            loader={isLoading}
          />)}
        {currentWeatherTab === 'RAINFALL' && (
          <RainfallGraph
            totalBikeUsageAndWeatherActionSaga={totalBikeUsageAndWeatherActionSaga}
            data={aggregatedBikeWeather}
            showErrorText={showErrorText}
            loader={isLoading}
          />)}
      </GraphWrapper>
    </div>
  )
}

export default WeatherEffect
