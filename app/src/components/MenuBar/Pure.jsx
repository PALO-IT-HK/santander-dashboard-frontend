import React from 'react'
import {MenuTabs, MenuTab} from 'components/MenuBarTab/Pure'

const MenuBar = ({value, onChange, loadingBarStatus}) => {
  return (
    <MenuTabs
      value={value}
      onChange={onChange}
      loadingBarStatus={loadingBarStatus}>
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
