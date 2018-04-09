import React from 'react'
import styled from 'styled-components'

import ToggleTabs from 'components/ToggleTabs/Pure'
import Heatmap from 'components/Heatmap/Pure'
import BikeUsageGraph from 'components/BikeUsageGraph/Pure'
import CalendarDatePicker from 'components/CalendarDatePicker/Pure'
import DateTimeSearch from 'components/DateTimeSearch/Pure'
import { formatDate } from 'utils/utils'

const RenderMapGraphDiv = styled.div`
  min-height: 500px;
`

const SearchBoxDiv = styled.div`
  height: 100px;
  padding: 0 5rem;
`

const DateTimeSearchWrapper = styled.div`
  width:50%;
`

const BikeUsageMainSearch = ({
  currentToggledTab,
  changeToggledTabAction,
  showDatePicker,
  currentMarker,
  toggleMarkerLabelVisibilityAction,
  hideMarkerLabelAction,
  data,
  currentDateSelection,
  fromDate,
  toDate,
  enteredTo,
  hideDatePickerAction,
  showDatePickerAction,
  clickDateFromAction,
  clickDateToAction,
  resetDateAction
}) => {
  const handleTabChange = v => changeToggledTabAction(v)
  const openDatePicker = v => showDatePickerAction(v)
  const formatNewDate = () => {
    if (fromDate && toDate != null) {
      return `${formatDate(fromDate)} - ${formatDate(toDate)}`
    } else {
      return `Today, ${formatDate(currentDateSelection)}`
    }
  }
  return (
    <div>
      <SearchBoxDiv>
        <h2>BIKE USAGE IN LONDON (SEARCH BOX)</h2>
        <ToggleTabs value={currentToggledTab} onChange={handleTabChange} />
        <DateTimeSearchWrapper>
          <DateTimeSearch
            showDatePicker={showDatePicker}
            onClick={openDatePicker}
            value={formatNewDate(currentDateSelection)}
          />
        </DateTimeSearchWrapper>
        {showDatePicker ? (
          <CalendarDatePicker
            clickDateFromAction={clickDateFromAction}
            clickDateToAction={clickDateToAction}
            resetDateAction={resetDateAction}
            from={fromDate}
            to={toDate}
            enteredTo={enteredTo}
            hideDatePickerAction={hideDatePickerAction}
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
