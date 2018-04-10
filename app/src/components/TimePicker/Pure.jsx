import React from 'react'
import styled from 'styled-components'
import TimeTagFilters from 'components/TimeTagFilters/Pure'
import { timeFilters, timings } from 'constants/index'
import SButton from 'components/Button/Pure'

const TimeWrapper = styled.div`
  width: 320px;
  margin: 0 auto;
  padding: 0.5rem;
  z-index: 99;
  border: 1px solid #e7e7e7;
  background: #ffffff;
  position: absolute;
  top: 200px;
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
    color: #A8AAB6;
  }
  & select {
    color: #D54435;
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

const TimePicker = ({hideTimePickerAction}) => {
  const getTimeTag = time => {
    this.props.getTimeTagAction(timeFilters[time])
  }

  return (
    <TimeWrapper>
      <TimeTagFilters selectTimeTag={getTimeTag} />
      <TimeDropDown>
        <TimeLabel>
          <p>FROM</p>
          <select>
            {timings.map((time, index) => <option key={index} value={time}>{time}</option>)}
          </select>
        </TimeLabel>
        <TimeLabel>
          <p>TO</p>
          <select>
            {timings.map((time, index) => <option key={index} value={time}>{time}</option>)}
          </select>
        </TimeLabel>

      </TimeDropDown>
      <DisplayButtons>
        <SButton
          type={'secondary'}
          size={'small'}
          children={'Cancel'}
        />
        <SButton
          type={'primary'}
          size={'small'}
          children={'Apply'}
          onClick={hideTimePickerAction}
        />
      </DisplayButtons>

    </TimeWrapper>
  )
}

export default TimePicker
