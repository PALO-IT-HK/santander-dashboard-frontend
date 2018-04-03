import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Pure from './Pure'

// Import action
import { getDashboard } from 'models/dashboard'

// s function
const s = state => ({
  dashboardData: state.dashboard.dashboardData,
  currentTab: state.dashboard.currentTab
})

// d function
const d = dispatch => ({
  getDashboard: () => dispatch(getDashboard())
})

export default withRouter(connect(s, d)(Pure))
