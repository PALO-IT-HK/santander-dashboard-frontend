import React from 'react'
import styled from 'styled-components'

import ToggleTabs from 'components/ToggleTabs/Pure'
import Heatmap from 'components/Heatmap/Pure'
import BikeUsageGraph from 'components/BikeUsageGraph/Pure'
import SearchBar from 'components/SearchBar/Pure'
import CalendarDatePicker from 'components/CalendarDatePicker/Pure'
import DateTimeSearch from 'components/DateTimeSearch/Pure'
import { formatDate } from 'utils/utils'

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

const DateTimeSearchWrapper = styled.div`
  width:50%;
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
  changeInputFocusAction,
  currentFocusStatus,
  updateMapLocationAction,
  searchedLocation,
  mapInitialLoadStatus,
  getBikePointsActionSaga,
  currentBikePointsArray
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
        <SubHeader> Bike usage of 
          <SearchBar 
              changeInputFocusAction={changeInputFocusAction} 
              currentFocusStatus={currentFocusStatus}
              updateMapLocationAction={updateMapLocationAction}
              searchedLocation={searchedLocation} />
        </SubHeader>
        <ToggleTabs value={currentToggledTab} onChange={handleTabChange} />
        <DateTimeSearchWrapper>
          <DateTimeSearch
            openDatePicker={openDatePicker}
            date={formatNewDate(currentDateSelection)}
            time={'time'}
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
      </SearchBoxDiv>
      <RenderMapGraphDiv>
        {currentToggledTab === 'HEAT MAP' && (
          <Heatmap
          isMarkerShown
          toggleMarkerLabelVisibilityAction={toggleMarkerLabelVisibilityAction}
          hideMarkerLabelAction={hideMarkerLabelAction}
          currentMarker={currentMarker}
          mapInitialLoadStatus={mapInitialLoadStatus}
          getBikePointsActionSaga={getBikePointsActionSaga}
          currentBikePointsArray={currentBikePointsArray} />
        )}
        {currentToggledTab === 'GRAPH' && <BikeUsageGraph data={data} />}
      </RenderMapGraphDiv>
    </div>
  )
}

export default BikeUsageMainSearch
