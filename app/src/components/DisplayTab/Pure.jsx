import React from 'react'
import styled from 'styled-components'

export const DisplayAllTabsWrapper = styled.div`
  display: flex;
  width: fit-content;
`

export const DisplayTabWrapper = styled.div`
  width: 250px;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #d5dfeb;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 20px;
  color: #748597;
  cursor: pointer;
  background: #ffffff;
`

export const DisplayAllTabs = ({ children }) => (
  <DisplayAllTabsWrapper>
    {React.Children.map(children, child => <child.type {...child.props} />)}
  </DisplayAllTabsWrapper>
)

export const DisplayTab = ({ children, onClick }) => (
  <DisplayTabWrapper onClick={onClick}>
    {children}
  </DisplayTabWrapper>
)
