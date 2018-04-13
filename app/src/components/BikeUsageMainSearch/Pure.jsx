import React from 'react'
import styled from 'styled-components'

import ToggleTabs from 'components/ToggleTabs/Pure'
import Heatmap from 'components/Heatmap/Pure'
import BikeUsageGraph from 'components/BikeUsageGraph/Pure'
import SearchBar from 'components/SearchBar/Pure'
import Dropdown from 'components/Dropdown/Pure'
import CalendarDatePicker from 'components/CalendarDatePicker/Pure'
import DateTimeSearch from 'components/DateTimeSearch/Pure'
import TimePicker from 'components/TimePicker/Pure'
import { formatDateBy_ddmmyyyy } from 'utils/utils'

const RenderMapGraphDiv = styled.div`
  height: 300px;
`

const SearchBoxDiv = styled.div`
  height: 70px;
  padding: 0 5rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  top: 40px;
`

const TabsWrapper = styled.div`
  padding: 0 5rem;
`

const DateTimeSearchWrapper = styled.div`
  width: 50%;
  padding: 0 5rem;
`

const TabsAndDateTimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 40px;
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
  timeTagName,
  changeInputFocusAction,
  currentFocusStatus,
  updateMapLocationAction,
  searchedLocation,
  mapInitialLoadStatus,
  getBikePointsActionSaga,
  currentBikePointsArray,
  dropDownDisplayStatus,
  toggleDropdownVisibilityAction,
  currentDropDownDisplayValue,
  updateDropDownDisplayValueAction,
  getBikeUsageTopLocationsActionSaga,
  bikeUsageTopLocationsArray,
  isLoading,
  bikeUsageHistoryDataArray,
  getHeatmapPointsActionSaga,
  toggleWidgetOpenStatusAction,
  isAnyWidgetOpenCurrently,
  updateMapBoundsAction,
  currentMapBounds,
  showErrorText
}) => {
  const handleTabChange = v => changeToggledTabAction(v)
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
    if (fromDate && toDate != null) {
      return `${formatDateBy_ddmmyyyy(fromDate)} - ${formatDateBy_ddmmyyyy(toDate)}`
    } else {
      return `Today, ${formatDateBy_ddmmyyyy(currentDateSelection)}`
    }
  }

  const formatTime = () => timeTagName || `${timeFrom} - ${timeTo}`

  return (
    <div>
      {isLoading ? 'THIS IS LOADING' : null}
      {currentToggledTab === 'HEAT MAP' && (
        <SearchBoxDiv>
          <SubHeader>
            {' '}
            Bike usage of
            <SearchBar
              changeInputFocusAction={changeInputFocusAction}
              currentFocusStatus={currentFocusStatus}
              updateMapLocationAction={updateMapLocationAction}
              searchedLocation={searchedLocation}
            />
          </SubHeader>
        </SearchBoxDiv>
      )
      }
      {currentToggledTab === 'GRAPH' && (
        <SearchBoxDiv>
          <SubHeader>
            {' '}
            Bike usage of
            <Dropdown
              dropDownDisplayStatus={dropDownDisplayStatus}
              toggleDropdownVisibilityAction={toggleDropdownVisibilityAction}
              currentDropDownDisplayValue={currentDropDownDisplayValue}
              updateDropDownDisplayValueAction={updateDropDownDisplayValueAction}
              onChange={getBikeUsageTopLocationsActionSaga} />

          </SubHeader>
        </SearchBoxDiv>
      )
      }
      <TabsAndDateTimeWrapper>
        <TabsWrapper>
          <ToggleTabs
            value={currentToggledTab}
            onChange={handleTabChange} />
        </TabsWrapper>
        <DateTimeSearchWrapper>
          <DateTimeSearch
            openDatePicker={openDatePicker}
            date={formatNewDate()}
            time={formatTime()}
            isTimePickerShown={openTimePicker}
          />
          {showDatePicker ? (
            <CalendarDatePicker
              getBikeUsageTopLocationsActionSaga={getBikeUsageTopLocationsActionSaga}
              getPublicHolidayAction={getPublicHolidayAction}
              clickDateFromAction={clickDateFromAction}
              clickDateToAction={clickDateToAction}
              resetDateAction={resetDateAction}
              from={fromDate}
              to={toDate}
              enteredTo={enteredTo}
              hideDatePickerAction={hideDatePickerAction}
              toggleWidgetOpenStatusAction={toggleWidgetOpenStatusAction}
              currentMapBounds={currentMapBounds}
              getHeatmapPointsActionSaga={getHeatmapPointsActionSaga}
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
              toggleWidgetOpenStatusAction={toggleWidgetOpenStatusAction}
            />
          ) : null}
        </DateTimeSearchWrapper>
      </TabsAndDateTimeWrapper>
      <RenderMapGraphDiv>
        {currentToggledTab === 'HEAT MAP' && (
          <Heatmap
            isMarkerShown
            toggleMarkerLabelVisibilityAction={
              toggleMarkerLabelVisibilityAction
            }
            hideMarkerLabelAction={hideMarkerLabelAction}
            currentMarker={currentMarker}
            mapInitialLoadStatus={mapInitialLoadStatus}
            getBikePointsActionSaga={getBikePointsActionSaga}
            currentBikePointsArray={currentBikePointsArray}
            fromDate={fromDate}
            toDate={toDate}
            timeFrom={timeFrom}
            timeTo={timeTo}
            bikeUsageHistoryDataArray={bikeUsageHistoryDataArray}
            getHeatmapPointsActionSaga={getHeatmapPointsActionSaga}
            updateMapBoundsAction={updateMapBoundsAction}
          />
        )}
        {currentToggledTab === 'GRAPH' && (
          <BikeUsageGraph
            getBikeUsageTopLocationsActionSaga={getBikeUsageTopLocationsActionSaga}
            data={bikeUsageTopLocationsArray}
            showErrorText={showErrorText}
            loader={isLoading}
          />
        )}
      </RenderMapGraphDiv>
    </div>
  )
}

export default BikeUsageMainSearch
