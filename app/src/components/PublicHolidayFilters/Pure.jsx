import React from 'react'
import styled from 'styled-components'

const PublicHolidayTags = styled.div`
  background: #ffffff;
  border-bottom: 1px solid #e7e7e7;
`

const HolidayTagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const HolidayTag = styled.div`
  border: 1px solid #e7e7e7;
  border-radius: 20px;
  color: #A8AAB6;
  width: auto;
  height: 20px;
  justify-content: center;
  padding: 0.1rem 0.5rem;
  font-size: 12px;
  margin: 5px;
  &:hover {
    color: #D54435;
    font-weight: 400;
    border: 1px solid #D54435;
  }
`

const PublicHolidayFilters = () => {
  const ph = [
    'May Bank Holiday 2017',
    'Summer bank holiday 2017',
    'Christmas Day 2017',
    'Boxing Day 2017',
    'New Year Day 2018',
    'Good Friday 2018',
    'Easter Monday 2018'
  ]
  return (
    <PublicHolidayTags>
      <HolidayTagWrapper>
        {ph.map((day, index) => <HolidayTag key={index}>{`${day}${' '}`}</HolidayTag>)}
      </HolidayTagWrapper>
    </PublicHolidayTags>
  )
}

export default PublicHolidayFilters
