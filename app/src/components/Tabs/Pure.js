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
      <Tab label='BIKE USAGE' value='BIKEUSAGE' />
      <Tab label='WEATHER' value='WEATHER' />
    </Tabs>
  )
}

export default NavBarTabs
