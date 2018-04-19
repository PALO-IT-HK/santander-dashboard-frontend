import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'

import Pure from './Pure'
import {
  changeTabAction,
  isEmailSubscribedAction,
  handleInputChangeAction,
  postEmailSagaAction
} from 'models/dashboard'

// s function
const s = (state) => ({
  currentTab: state.dashboard.currentTab,
  loadingBarStatus: state.dashboard.loadingBarStatus,
  isEmailSubscribed: state.dashboard.isEmailSubscribed,
  email: state.dashboard.email
})

// d function
const d = dispatch => ({
  changeTabAction: bindActionCreators(changeTabAction, dispatch),
  isEmailSubscribedAction: bindActionCreators(isEmailSubscribedAction, dispatch),
  handleInputChangeAction: bindActionCreators(handleInputChangeAction, dispatch),
  postEmailSagaAction: bindActionCreators(postEmailSagaAction, dispatch)
})

export default withRouter(connect(s, d)(Pure))
