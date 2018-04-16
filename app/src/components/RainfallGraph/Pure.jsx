import React from 'react'
import { ComposedChart, Bar, Line, Tooltip, CartesianGrid, YAxis, XAxis, ResponsiveContainer } from 'recharts'
import moment from 'moment'

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
  const {date, totalBikesOut, total_prcp_amt} = payload[0].payload
  const formattedDate = moment(date).format('dddd, DD, MMMM YYYY')
  return (
    <div style={customToolTipStyles}>
      <p style={{fontSize: 10, fontWeight: 400}}>{formattedDate}</p>
      <span style={{color: '#D54435'}}>
        {`${totalBikesOut} Total Usage`}
      </span>
      <span style={{color: '#A8AAB6'}}>{`${' '}|`}</span>
      <span style={{color: '#1dacbd'}}>{`${' '}${total_prcp_amt}mm`}</span>
    </div>
  )
}

class RainfallGraph extends React.Component {
  componentDidMount () {
    this.props.totalBikeUsageAndWeatherActionSaga()
  }
  render () {
    const {data, loader} = this.props
    return (
      <div>
        <div style={{height: '500px', padding: '0 20px', background: '#f1f4f8'}}>
          { data.length !== 0
            ? (<ResponsiveContainer minWidth={1024}>
              <ComposedChart data={data} margin={{bottom: 100}}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey={v => v.date} tick={<CustomizedAxisTick />} interval={0} />
                <YAxis yAxisId='bar' tick={{fontFamily: 'Rubik', fontSize: 12}} orientation='right' />
                <YAxis yAxisId='line' tick={{fontFamily: 'Rubik', fontSize: 12}} />
                {data.length > 0 && <Tooltip content={customToolTip} />}
                <Bar
                  yAxisId='bar'
                  dataKey={v => v.totalBikesOut}
                  maxBarSize={50}
                  fill='#D54435'
                />
                <Line
                  yAxisId='line'
                  dataKey={v => v.total_prcp_amt}
                  type='monotone'
                  stroke='#1dacbd'
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ stroke: '#1dacbd', r: 6 }}
                />
              </ComposedChart>
            </ResponsiveContainer>)
            : (!loader && <p>Sorry there is no data for this date range, please refine your parameters</p>)
          }
        </div>
      </div>
    )
  }
}

export default RainfallGraph
