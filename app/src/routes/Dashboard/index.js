import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Pure from './Pure'

// Import action
import { getDashboard, toggleMarkerLabelVisibilityAction, hideMarkerLabelAction,
  changeTabAction, changeToggledTabAction, changeInputFocusAction, updateMapLocationAction } from 'models/dashboard'

// s function
const s = state => ({
  dashboardData: state.dashboard.dashboardData,
  currentTab: state.dashboard.currentTab,
  currentMarker: state.dashboard.currentMarker,
  currentFocusStatus: state.dashboard.currentFocusStatus,
  currentToggledTab: state.dashboard.currentToggledTab,
  graphData: state.dashboard.graphData,
  searchedLocation: state.dashboard.searchedLocation
})

const d = dispatch => ({
  getDashboard: bindActionCreators(getDashboard, dispatch),
  toggleMarkerLabelVisibilityAction: bindActionCreators(toggleMarkerLabelVisibilityAction, dispatch),
  hideMarkerLabelAction: bindActionCreators(hideMarkerLabelAction, dispatch),
  changeTabAction: bindActionCreators(changeTabAction, dispatch),
  changeToggledTabAction: bindActionCreators(changeToggledTabAction, dispatch),
  changeInputFocusAction: bindActionCreators(changeInputFocusAction, dispatch),
  updateMapLocationAction: bindActionCreators(updateMapLocationAction, dispatch)
})

export default withRouter(connect(s, d)(Pure))
