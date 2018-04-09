import React from 'react'
import styled from 'styled-components'
import { DisplayAllTabs, DisplayTab } from 'components/DisplayTab/Pure'

const DateTimeSearch = ({ date, time, openDatePicker }) => {
  return (
    <DisplayAllTabs>
      <DisplayTab onClick={openDatePicker}>
        <p>{date}</p>
      </DisplayTab>
      <DisplayTab>
        <p>{time}</p>
      </DisplayTab>
    </DisplayAllTabs>
  )
}

export default DateTimeSearch
