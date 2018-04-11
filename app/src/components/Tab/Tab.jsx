import React from 'react'
import styled from 'styled-components'

export const TabsWrapper = styled.div`
  width: fit-content;
  background-color: #d5dfeb;
  height: 30px;
  border-radius: 5px;
  display: flex;
`
export const TabWrapper = styled.div`
  min-width: 140px;
  padding: 5px 25px;
  background-color: ${({selected}) => selected ? '#ffffff' : 'none'};
  border-radius: 5px;
  border: 1px solid #d5dfeb;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 20px;
  color: #748597;
  cursor: pointer;
  transition-duration: 0.3s;
`

export const Tabs = ({value, onChange, children}) => (
  <TabsWrapper>
    {React.Children.map(children, child => <child.type {...child.props} onChange={onChange} currentTab={value} />)}
  </TabsWrapper>
)

export const Tab = ({children, value, onChange, currentTab}) => (
  <TabWrapper onClick={() => onChange(value)} selected={currentTab === value}>
    {children}
  </TabWrapper>
)
