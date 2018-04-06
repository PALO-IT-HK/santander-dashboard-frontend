import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import Pure from './Pure'
import { toggleMarkerLabelVisibilityAction, hideMarkerLabelAction } from 'models/dashboard'

// s function
const s = state => ({
  currentMarker: state.dashboard.currentMarker
})

// d function
const d = dispatch => ({
})

export default withRouter(connect(s, d)(Pure))