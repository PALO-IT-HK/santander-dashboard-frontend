import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Pure from './Pure'

// Import action
import { getDashboard, changeTabAction, changeToggledTabAction } from 'models/dashboard'

// s function
const s = state => ({
  dashboardData: state.dashboard.dashboardData,
  currentTab: state.dashboard.currentTab,
  currentToggledTab: state.dashboard.currentToggledTab
})

// d function
// const d = dispatch => ({
//   getDashboard: () => dispatch(getDashboard())
// })

const d = dispatch => ({
  changeTabAction: bindActionCreators(changeTabAction, dispatch),
  getDashboard: bindActionCreators(getDashboard, dispatch),
  changeToggledTabAction: bindActionCreators(changeToggledTabAction, dispatch)
})

export default withRouter(connect(s, d)(Pure))
