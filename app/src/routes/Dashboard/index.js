import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Pure from './Pure'

// Import action
import { getDashboard, toggleMarkerLabelVisibilityAction, hideMarkerLabelAction } from 'models/dashboard'

// s function
const s = state => ({
  dashboardData: state.dashboard.dashboardData,
  currentTab: state.dashboard.currentTab,
  currentMarker: state.dashboard.currentMarker
})

// d function
const d = dispatch => ({
  getDashboard: () => dispatch(getDashboard()),
  toggleMarkerLabelVisibilityAction: (markerId) => dispatch(toggleMarkerLabelVisibilityAction(markerId)),
  hideMarkerLabelAction: () => dispatch(hideMarkerLabelAction())
})

export default withRouter(connect(s, d)(Pure))
