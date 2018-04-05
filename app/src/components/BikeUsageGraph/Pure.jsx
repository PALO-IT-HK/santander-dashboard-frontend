import React from 'react'
import { ComposedChart, Line, Bar, Tooltip, Legend, CartesianGrid, Area, YAxis, XAxis } from 'recharts'

const BikeUsageGraph = props => {
  const {data} = props

  return (
    <div>
      <h1>Bike Usage Graph</h1>
      <ComposedChart width={1000} height={500} data={data}>
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke='#f5f5f5' />
        <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8' name='Rainfall' />
        <Bar dataKey='pv' barSize={20} fill='#413ea0' name='Temperature' />
        <Line type='monotone' dataKey='uv' stroke='#ff7300' name='Pressure' />
      </ComposedChart>
    </div>
  )
}

export default BikeUsageGraph
