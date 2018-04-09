import React from 'react'
import styled from 'styled-components'
import DisplayTab from 'components/DisplayTab/Pure'

const DateTimeSearch = ({ showDatePicker, onClick, value }) => {
  return (
    <div>
      <DisplayTab showDatePicker={showDatePicker} onClick={onClick}>
        <p>{value}</p>
      </DisplayTab>
    </div>
  )
}

export default DateTimeSearch
