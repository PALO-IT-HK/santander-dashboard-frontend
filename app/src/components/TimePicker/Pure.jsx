import React from 'react'
import styled from 'styled-components'
import TimeTagFilters from 'components/TimeTagFilters/Pure'
import { timeFilters } from 'constants/index'
import SButton from 'components/Button/Pure'

const TimeWrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 0.5rem;
  z-index: 99;
  border: 1px solid #e7e7e7;
  background: #ffffff;
  position: absolute;
  top: 32%;
  left: 70.3%;
`

const TimeDropDown = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 1rem 0;
`

const TimeLabel = styled.div`
  padding: 0 0.5rem;
  text-align: left;
  margin-right: 5rem;
  & p {
    font-size: 10px;
    color: #a8aab6;
  }
  & select {
    color: #d54435;
    background: #ffffff;
    border: 0;
    font-size: 18px;
    -webkit-appearance: none;
    -moz-appearance: none;
  }
`

const DisplayButtons = styled.div`
  border-top: 1px solid #e7e7e7;
  padding-top: 0.8rem;
  display: flex;
  justify-content: flex-end;
`

const TimePicker = ({
  currentTab,
  currentToggledTab,
  hideTimePickerAction,
  timeFrom,
  timeTo,
  fromDate,
  toDate,
  selectTimeFromAction,
  selectTimeToAction,
  timeFromArray,
  timeToArray,
  totalTimeArray,
  filterTimeToArrayAction,
  filterTimeFromArrayAction,
  getTimeTagAction,
  toggleWidgetOpenStatusAction,
  fetchSagaAction,
  currentMapBounds,
  getHeatmapPointsActionSaga,
  fetchDistrictSelectedActionSaga,
  graphSelectedDistrict
}) => {
  const getTimeTag = tag => {
    getTimeTagAction([tag, timeFilters[tag]])
  }

  const getTimeFromValue = event => {
    const getTimeValue = event.target.value
    selectTimeFromAction(getTimeValue)
    // filter valid timeTo list when a timeFrom is selected
    const getTimeFromIndex = totalTimeArray.indexOf(getTimeValue)
    timeToArray = totalTimeArray.slice(getTimeFromIndex + 1)
    filterTimeToArrayAction(timeToArray)
  }
  const getTimeToValue = event => {
    const getTimeValue = event.target.value
    selectTimeToAction(getTimeValue)
    // filter valid timeFrom list when a timeTo is selected
    const getTimeToIndex = totalTimeArray.indexOf(getTimeValue)
    timeFromArray = totalTimeArray.slice(0, getTimeToIndex)
    filterTimeFromArrayAction(timeFromArray)
  }

  const handleApplyOnClick = () => {
    const currTab = currentTab
    const currSubTab = currentToggledTab
    if (currTab === 'BIKE USAGE' && currSubTab === 'HEAT MAP') {
      const payload = {
        widget: 'TIME',
        ne: {
          neLat: currentMapBounds.ne.neLat,
          neLng: currentMapBounds.ne.neLng
        },
        sw: {
          swLat: currentMapBounds.sw.swLat,
          swLng: currentMapBounds.sw.swLng
        },
        date: {
          fromDate: fromDate,
          toDate: toDate
        },
        time: {
          timeFrom: timeFrom,
          timeTo: timeTo
        }
      }
      getHeatmapPointsActionSaga(payload)
    }
    (currentTab !== 'WEATHER EFFECT' && graphSelectedDistrict !== 'All of London')
      ? fetchDistrictSelectedActionSaga()
      : fetchSagaAction()
    toggleWidgetOpenStatusAction(false)
    hideTimePickerAction()
  }

  const handleCancelOnClick = () => {
    toggleWidgetOpenStatusAction(false)
    hideTimePickerAction()
  }

  return (
    <TimeWrapper>
      <TimeTagFilters selectTimeTag={getTimeTag} />
      <TimeDropDown>
        <TimeLabel>
          <p>FROM</p>
          <select
            name='selectTimeFrom'
            value={timeFrom}
            onChange={getTimeFromValue}>
            {timeFromArray.map((time, index) => (
              <option defaultValue key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </TimeLabel>
        <TimeLabel>
          <p>TO</p>
          <select
            name='selectTimeTo'
            value={timeTo}
            onChange={getTimeToValue}>
            {timeToArray.map((time, index) => (
              <option defaultValue key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </TimeLabel>
      </TimeDropDown>
      <DisplayButtons>
        <SButton
          type={'secondary'}
          size={'small'}
          children={'Cancel'}
          onClick={() => handleCancelOnClick()}
        />
        <SButton
          type={'primary'}
          size={'small'}
          children={'Apply'}
          onClick={() => handleApplyOnClick()}
        />
      </DisplayButtons>
    </TimeWrapper>
  )
}

export default TimePicker
