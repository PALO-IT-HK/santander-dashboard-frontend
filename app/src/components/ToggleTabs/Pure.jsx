import React from 'react'
import {Tabs, Tab} from 'components/Tab/Tab'

const ToggleTabs = ({value, onChange}) => {
  return (
    <Tabs value={value} onChange={onChange}>
      <Tab value='HEAT MAP'>
        <p>HEAT MAP</p>
      </Tab>
      <Tab value='GRAPH'>
        <p>GRAPH</p>
      </Tab>
    </Tabs>
  )
}

export default ToggleTabs
