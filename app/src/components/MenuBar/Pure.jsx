import React from 'react'
// import {Tabs, Tab} from 'material-ui/Tabs'
import {MenuTabs, MenuTab} from 'components/MenuBarTab/Pure'

const MenuBar = ({value, onChange}) => {
  return (
    <MenuTabs value={value} onChange={onChange}>
      <MenuTab value='BIKE USAGE'>
        <p>BIKE USAGE</p>
      </MenuTab>
      <MenuTab value='WEATHER EFFECT'>
        <p>WEATHER EFFECT</p>
      </MenuTab>
    </MenuTabs>
  )
}

export default MenuBar
