import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Pure from './Pure'

// Import action
import { getDashboard, changeTabAction } from 'models/dashboard'

// s function
const s = state => ({
  dashboardData: state.dashboard.dashboardData,
  currentTab: state.dashboard.currentTab
})

const d = dispatch => ({
  getDashboard: bindActionCreators(getDashboard, dispatch),
  changeTabAction: bindActionCreators(changeTabAction, dispatch)
})

export default withRouter(connect(s, d)(Pure))
