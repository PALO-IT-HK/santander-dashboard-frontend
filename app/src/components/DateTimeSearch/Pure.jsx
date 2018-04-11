import React from 'react'
import { DisplayAllTabs, DisplayTab } from 'components/DisplayTab/Pure'

const DateTimeSearch = ({ date, time, openDatePicker, isTimePickerShown }) => {
  return (
    <DisplayAllTabs>
      <DisplayTab onClick={openDatePicker}>
        <p>{date}</p>
      </DisplayTab>
      <DisplayTab onClick={isTimePickerShown}>
        <p>{time}</p>
      </DisplayTab>
    </DisplayAllTabs>
  )
}

export default DateTimeSearch
