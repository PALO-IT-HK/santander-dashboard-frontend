import React from 'react'
import {Tabs, Tab} from 'components/Tab/Tab'

const ToggleWeatherTabs = ({value, onChange}) => {
  return (
    <Tabs value={value} onChange={onChange}>
      <Tab value='TEMPERATURE'>
        <p>TEMPERATURE</p>
      </Tab>
      <Tab value='RAINFALL'>
        <p>RAINFALL</p>
      </Tab>
    </Tabs>
  )
}

export default ToggleWeatherTabs
