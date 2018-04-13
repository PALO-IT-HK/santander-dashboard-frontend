import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import Pure from './Pure'
import { changeTabAction } from 'models/dashboard'

// s function
const s = (state) => ({currentTab: state.dashboard.currentTab})

// d function
const d = dispatch => ({changeTabAction: bindActionCreators(changeTabAction, dispatch)})

export default withRouter(connect(s, d)(Pure))
