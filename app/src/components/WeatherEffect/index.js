import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Pure from './Pure'
import { changeWeatherTabAction } from 'models/dashboard'

// s function
const s = state => ({
  currentWeatherTab: state.dashboard.currentWeatherTab
})

// d function
const d = dispatch => ({
  changeWeatherTabAction: bindActionCreators(changeWeatherTabAction, dispatch)
})

export default withRouter(connect(s, d)(Pure))
