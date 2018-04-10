import React from 'react'
import styled from 'styled-components'

const TimeTags = styled.div`
  background: #ffffff;
  border-bottom: 1px solid #e7e7e7;
  padding-bottom: 0.6rem;
`

const TimeTagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const TimeTag = styled.div`
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

const TimeTagFilters = ({children, selectTimeTag}) => {
  const timeTagsArr = [
    '24 Hours',
    'Morning Peak Hour',
    'Afternoon Peak Hour',
    'Evening Peak Hour'
  ]

  return (
    <TimeTags>
      <TimeTagWrapper>
        {timeTagsArr.map((time, index) => (
          <TimeTag key={index} onClick={() => selectTimeTag(time)}>{`${time}${' '}`}</TimeTag>
        ))}
      </TimeTagWrapper>
    </TimeTags>
  )
}

export default TimeTagFilters
