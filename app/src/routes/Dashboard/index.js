import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Pure from './Pure'

// Import action
<<<<<<< HEAD
import { getDashboard, toggleMarkerLabelVisibilityAction, hideMarkerLabelAction } from 'models/dashboard'
=======
import { getDashboard, changeTabAction, changeToggledTabAction } from 'models/dashboard'
>>>>>>> f692c00bb6756e476ad32550ad109cc8c8279fba

// s function
const s = state => ({
  dashboardData: state.dashboard.dashboardData,
  currentTab: state.dashboard.currentTab,
<<<<<<< HEAD
  currentMarker: state.dashboard.currentMarker
=======
  currentToggledTab: state.dashboard.currentToggledTab
>>>>>>> f692c00bb6756e476ad32550ad109cc8c8279fba
})

// d function
// const d = dispatch => ({
//   getDashboard: () => dispatch(getDashboard())
// })

const d = dispatch => ({
<<<<<<< HEAD
  getDashboard: () => dispatch(getDashboard()),
  toggleMarkerLabelVisibilityAction: (markerId) => dispatch(toggleMarkerLabelVisibilityAction(markerId)),
  hideMarkerLabelAction: () => dispatch(hideMarkerLabelAction())
=======
  changeTabAction: bindActionCreators(changeTabAction, dispatch),
  getDashboard: bindActionCreators(getDashboard, dispatch),
  changeToggledTabAction: bindActionCreators(changeToggledTabAction, dispatch)
>>>>>>> f692c00bb6756e476ad32550ad109cc8c8279fba
})

export default withRouter(connect(s, d)(Pure))
