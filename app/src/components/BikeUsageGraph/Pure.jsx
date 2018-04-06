import React from 'react'
import { ComposedChart, Line, Bar, Tooltip, Legend, CartesianGrid, Area, YAxis, XAxis } from 'recharts'

const BikeUsageGraph = props => {
  const {data} = props

  return (
    <div>
      <h1>Bike Usage Graph</h1>
      <ComposedChart width={1000} height={500} data={data}>
        <XAxis dataKey={e => e.dt_txt} />
        <YAxis />
        <YAxis orientation='left' yAxisId='bar' />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke='#f5f5f5' />
        <Area type='monotone' dataKey={e => e.rain['3h']} fill='#8884d8' stroke='#8884d8' name='Rainfall' />
        <Bar yAxisId='bar' dataKey={e => e.wind.speed} barSize={20} fill='#413ea0' name='Wind Speed' />
        <Line type='monotone' dataKey={e => e.main.temp} stroke='#ff7300' name='Temperature' />
      </ComposedChart>
    </div>
  )
}

export default BikeUsageGraph
