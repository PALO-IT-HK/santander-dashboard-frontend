import React from 'react'
import styled from 'styled-components'

import ToggleTabs from 'components/ToggleTabs/Pure'
import Heatmap from 'components/Heatmap/Pure'
import BikeUsageGraph from 'components/BikeUsageGraph/Pure'
import CalendarDatePicker from 'components/CalendarDatePicker/Pure'
import DateTimeSearch from 'components/DateTimeSearch/Pure'
import TimePicker from 'components/TimePicker/Pure'
import { formatDate } from 'utils/utils'

const RenderMapGraphDiv = styled.div`
  min-height: 500px;
`

const SearchBoxDiv = styled.div`
  height: 100px;
  padding: 0 5rem;
`

const DateTimeSearchWrapper = styled.div`
  width: 50%;
`

const BikeUsageMainSearch = ({
  currentToggledTab,
  changeToggledTabAction,
  showDatePicker,
  currentMarker,
  toggleMarkerLabelVisibilityAction,
  hideMarkerLabelAction,
  data,
  getPublicHolidayAction,
  currentDateSelection,
  fromDate,
  toDate,
  enteredTo,
  hideDatePickerAction,
  showDatePickerAction,
  clickDateFromAction,
  clickDateToAction,
  resetDateAction,
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
  timeTagName
}) => {
  const handleTabChange = v => changeToggledTabAction(v)
  const openDatePicker = v => showDatePickerAction(v)
  const openTimePicker = v => showTimePickerAction(v)

  const formatNewDate = () => {
    if (fromDate && toDate != null) {
      return `${formatDate(fromDate)} - ${formatDate(toDate)}`
    } else {
      return `Today, ${formatDate(currentDateSelection)}`
    }
  }

  const formatTime = () => timeTagName || `${timeFrom} - ${timeTo}`

  return (
    <div>
      <SearchBoxDiv>
        <h2>BIKE USAGE IN LONDON (SEARCH BOX)</h2>
        <ToggleTabs value={currentToggledTab} onChange={handleTabChange} />
        <DateTimeSearchWrapper>
          <DateTimeSearch
            openDatePicker={openDatePicker}
            date={formatNewDate()}
            time={formatTime()}
            isTimePickerShown={openTimePicker}
          />
        </DateTimeSearchWrapper>
        {showDatePicker ? (
          <CalendarDatePicker
            getPublicHolidayAction={getPublicHolidayAction}
            clickDateFromAction={clickDateFromAction}
            clickDateToAction={clickDateToAction}
            resetDateAction={resetDateAction}
            from={fromDate}
            to={toDate}
            enteredTo={enteredTo}
            hideDatePickerAction={hideDatePickerAction}
          />
        ) : null}
        {isTimePickerShown ? (
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
          />
        ) : null}
      </SearchBoxDiv>
      <RenderMapGraphDiv>
        {currentToggledTab === 'HEAT MAP' && (
          <Heatmap
            isMarkerShown
            toggleMarkerLabelVisibilityAction={
              toggleMarkerLabelVisibilityAction
            }
            hideMarkerLabelAction={hideMarkerLabelAction}
            currentMarker={currentMarker}
          />
        )}
        {currentToggledTab === 'GRAPH' && <BikeUsageGraph data={data} />}
      </RenderMapGraphDiv>
    </div>
  )
}

export default BikeUsageMainSearch
