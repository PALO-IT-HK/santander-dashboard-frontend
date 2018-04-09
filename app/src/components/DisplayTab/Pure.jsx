import React from 'react'
import styled from 'styled-components'

export const DisplayTabWrapper = styled.div`
  width: 250px;
  height: 30px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #d5dfeb;
  display: flex;
  justify-content: center;
  align-center: center;
  line-height: 20px;
  color: #748597;
  cursor: pointer;
`

const DisplayTab = ({ showDatePicker, onClick, children }) => (
  <DisplayTabWrapper showDatePicker={showDatePicker} onClick={onClick}>
    {children}
  </DisplayTabWrapper>
)

export default DisplayTab
