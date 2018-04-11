import React from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'

const NavBarTabs = props => {
  const {value, onChange} = props
  return (
    <Tabs
      style={{width: '50%'}}
      value={value}
      onChange={onChange}
    >
      <Tab label='BIKE USAGE' value='BIKE USAGE' />
      <Tab label='WEATHER EFFECT' value='WEATHER EFFECT' />
    </Tabs>
  )
}

export default NavBarTabs
