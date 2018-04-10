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
  color: #a8aab6;
  width: auto;
  height: 20px;
  justify-content: center;
  padding: 0.1rem 0.5rem;
  font-size: 10px;
  margin: 5px;
  cursor: pointer;
  text-transform: uppercase;
  &:hover {
    color: #d54435;
    font-weight: 400;
    border: 1px solid #d54435;
  }
`

const PublicHolidayFilters = ({children, selectPublicHoliday}) => {
  const publicHolidays = [
    'Early May Bank Holiday 2017',
    'Spring Bank Holiday 2017',
    'Summer Bank holiday 2017',
    'Christmas Day 2017',
    'Boxing Day 2017',
    'New Year\'s Day 2018',
    'Good Friday 2018',
    'Easter Monday 2018'
  ]

  return (
    <PublicHolidayTags>
      <HolidayTagWrapper>
        {publicHolidays.map((day, index) => (
          <HolidayTag key={index} onClick={() => selectPublicHoliday(day)}>{`${day}${' '}`}</HolidayTag>
        ))}
      </HolidayTagWrapper>
    </PublicHolidayTags>
  )
}

export default PublicHolidayFilters
