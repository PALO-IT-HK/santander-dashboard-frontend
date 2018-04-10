import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import Pure from './Pure'
import { updateMapLocationAction } from 'models/dashboard'

// s function
const s = state => ({
  currentLocation: state.dashboard.currentLocation
})

// d function
const d = dispatch => ({updateMapLocationAction: bindActionCreators(updateMapLocationAction, dispatch)})

export default withRouter(connect(s, d)(Pure))