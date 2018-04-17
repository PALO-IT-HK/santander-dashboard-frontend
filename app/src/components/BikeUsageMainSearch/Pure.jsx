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

const OverallBikeUsageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const SearchAndDateTimeOverallWrapper = styled.div`
  height: 20%;
  min-height: 120px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const RenderMapGraphDiv = styled.div`
  height: 80%;
  background: #f1f4f8;
`

const SearchBoxDiv = styled.div`
  height: 70px;
  padding: 0 5rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`

const TabsWrapper = styled.div`
  padding-left: 5rem;
  height: 30%;
`

const DateTimeSearchWrapper = styled.div`
  padding-right: 5rem;
`

const TabsAndDateTimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* margin-bottom: 40px; */
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
  currentTab,
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
  loadingBarStatus,
  bikeUsageHistoryDataArray,
  getHeatmapPointsActionSaga,
  toggleWidgetOpenStatusAction,
  isAnyWidgetOpenCurrently,
  updateMapBoundsAction,
  currentMapBounds,
  updateGraphSearchResultsAction,
  graphSearchResults,
  updateGraphSelectedDistrictAction,
  graphSelectedDistrict,
  updateGraphSearchInputValueAction,
  currentGraphInputValue,
  toggleResultsWrapperVisibilityAction,
  resultsWrapperVisibilityStatus,
  fetchDistrictSelectedActionSaga
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
    <OverallBikeUsageWrapper>
      <SearchAndDateTimeOverallWrapper>
        {currentToggledTab === 'HEAT MAP' && (
          <SearchBoxDiv>
            <SubHeader>
              {' '}
              Bike usage of
              <SearchBar
                id={'search-autocomplete'}
                changeInputFocusAction={changeInputFocusAction}
                currentFocusStatus={currentFocusStatus}
                placeholder={'all docks in London'}
                wrapperPaddingLeft={15}
                currentToggledTab={currentToggledTab}
                toggleResultsWrapperVisibilityAction={toggleResultsWrapperVisibilityAction}
                updateGraphSearchInputValueAction={updateGraphSearchInputValueAction}
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
                getBikeUsageTopLocationsActionSaga={getBikeUsageTopLocationsActionSaga}
                fetchDistrictSelectedActionSaga={fetchDistrictSelectedActionSaga}
                fetchSagaAction={getBikeUsageTopLocationsActionSaga}
                graphSelectedDistrict={graphSelectedDistrict}
              />
              <SearchBar
                id={'graph-search'}
                changeInputFocusAction={changeInputFocusAction}
                currentFocusStatus={currentFocusStatus}
                placeholder={'All of London'}
                wrapperPaddingLeft={30}
                updateGraphSearchResultsAction={updateGraphSearchResultsAction}
                graphSearchResults={graphSearchResults}
                currentToggledTab={currentToggledTab}
                updateGraphSelectedDistrictAction={updateGraphSelectedDistrictAction}
                graphSelectedDistrict={graphSelectedDistrict}
                updateGraphSearchInputValueAction={updateGraphSearchInputValueAction}
                currentGraphInputValue={currentGraphInputValue}
                toggleResultsWrapperVisibilityAction={toggleResultsWrapperVisibilityAction}
                resultsWrapperVisibilityStatus={resultsWrapperVisibilityStatus}
                fetchDistrictSelectedActionSaga={fetchDistrictSelectedActionSaga}
                fetchSagaAction={getBikeUsageTopLocationsActionSaga}
              />
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
                fetchDistrictSelectedActionSaga={fetchDistrictSelectedActionSaga}
                currentTab={currentTab}
                currentToggledTab={currentToggledTab}
                fetchSagaAction={getBikeUsageTopLocationsActionSaga}
                getPublicHolidayAction={getPublicHolidayAction}
                clickDateFromAction={clickDateFromAction}
                clickDateToAction={clickDateToAction}
                resetDateAction={resetDateAction}
                from={fromDate}
                to={toDate}
                timeFrom={timeFrom}
                timeTo={timeTo}
                enteredTo={enteredTo}
                hideDatePickerAction={hideDatePickerAction}
                toggleWidgetOpenStatusAction={toggleWidgetOpenStatusAction}
                currentMapBounds={currentMapBounds}
                getHeatmapPointsActionSaga={getHeatmapPointsActionSaga}
                graphSelectedDistrict={graphSelectedDistrict}
              />
            ) : null}
            {isTimePickerShown ? (
              <TimePicker
                fetchDistrictSelectedActionSaga={fetchDistrictSelectedActionSaga}
                currentTab={currentTab}
                currentToggledTab={currentToggledTab}
                fetchSagaAction={getBikeUsageTopLocationsActionSaga}
                getTimeTagAction={getTimeTagAction}
                filterTimeFromArrayAction={filterTimeFromArrayAction}
                filterTimeToArrayAction={filterTimeToArrayAction}
                timeToArray={timeToArray}
                totalTimeArray={totalTimeArray}
                timeFromArray={timeFromArray}
                timeFrom={timeFrom}
                timeTo={timeTo}
                fromDate={fromDate}
                toDate={toDate}
                selectTimeFromAction={selectTimeFromAction}
                selectTimeToAction={selectTimeToAction}
                hideTimePickerAction={hideTimePickerAction}
                toggleWidgetOpenStatusAction={toggleWidgetOpenStatusAction}
                currentMapBounds={currentMapBounds}
                getHeatmapPointsActionSaga={getHeatmapPointsActionSaga}
                graphSelectedDistrict={graphSelectedDistrict}
              />
            ) : null}
          </DateTimeSearchWrapper>
        </TabsAndDateTimeWrapper>
      </SearchAndDateTimeOverallWrapper>

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
            fetchDistrictSelectedActionSaga={fetchDistrictSelectedActionSaga}
            getBikeUsageTopLocationsActionSaga={getBikeUsageTopLocationsActionSaga}
            bikeUsageTopLocationsArray={bikeUsageTopLocationsArray}
            data={bikeUsageTopLocationsArray}
            loader={loadingBarStatus}
          />
        )}
      </RenderMapGraphDiv>
    </OverallBikeUsageWrapper>
  )
}

export default BikeUsageMainSearch
