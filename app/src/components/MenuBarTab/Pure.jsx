import React from 'react'
import styled from 'styled-components'

export const MenuTabsWrapper = styled.div`
  width: fit-content;
  height: 60px;
  display: flex;
`
export const TabWrapper = styled.div`
  min-width: 140px;
  padding: 1rem 2rem;
  letter-spacing: 1px;
  font-weight: 400;
  background-color: #ffffff
  color: ${({selected}) => selected ? '#D54435' : '#748597'};
  border-bottom: ${({selected}) => selected ? '3px solid #D54435' : 'none'};
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 20px;
  cursor: pointer;
  transition-duration: 0.2s;
`

export const MenuTabs = ({value, onChange, children}) => (
  <MenuTabsWrapper>
    {React.Children.map(children, child => <child.type {...child.props} onChange={onChange} currentTab={value} />)}
  </MenuTabsWrapper>
)

export const MenuTab = ({children, value, onChange, currentTab}) => (
  <TabWrapper onClick={() => onChange(value)} selected={currentTab === value}>
    {children}
  </TabWrapper>
)
