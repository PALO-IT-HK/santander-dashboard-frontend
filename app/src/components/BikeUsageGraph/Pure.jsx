import React from 'react'
import { BarChart, Bar, Tooltip, CartesianGrid, YAxis, XAxis, ResponsiveContainer } from 'recharts'

const customToolTipStyles = {
  width: '180px',
  height: 'auto',
  fontFamily: 'Rubik',
  letterSpacing: '0.8px',
  borderRadius: '5px',
  backgroundColor: '#f1f4f8',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
  textAlign: 'left',
  padding: '0.5rem',
  zIndex: '99',
  fontSize: '10px',
  fontWeight: '400',
  lineHeight: '1.5'
}

const CustomizedAxisTick = props => {
  const {x, y, payload} = props

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor='end' fill='#666' style={{fontFamily: 'Rubik', fontSize: 12}} transform='rotate(-35)'>{payload.value}</text>
    </g>
  )
}

const customToolTip = ({label, payload}) => {
  if (!payload.length) return
  const {value} = payload[0]
  return (
    <div style={customToolTipStyles}>
      <p>{label}</p>
      <span style={{color: '#D54435'}}>{`${value} Total Usage`}</span>
    </div>
  )
}

class BikeUsageGraph extends React.Component {
  componentDidMount () {
    this.props.getBikeUsageTopLocationsActionSaga()
  }
  render () {
    const {data, loader} = this.props

    return (
      <div>
        <div style={{height: '500px', padding: '0 20px', background: '#f1f4f8'}}>
          { data.length !== 0
            ? (<ResponsiveContainer minWidth={1024}>
              <BarChart data={data} margin={{bottom: 100}}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey={v => v.location} tick={<CustomizedAxisTick />} interval={0} />
                <YAxis orientation='left' yAxisId='bar' tick={{fontFamily: 'Rubik', fontSize: 12}} />
                { data.length > 0 && <Tooltip content={customToolTip} />}
                <Bar yAxisId='bar'
                  dataKey={v => v.totalBikesOut}
                  maxBarSize={50}
                  fill='#D54435'
                />
              </BarChart>
            </ResponsiveContainer>)
            : (!loader && <p>Sorry there is no data for this date range, please refine your parameters</p>)
          }
        </div>
      </div>
    )
  }
}

export default BikeUsageGraph
