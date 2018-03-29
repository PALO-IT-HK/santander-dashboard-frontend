import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Pure from './Pure'

import {
  updateIntroMessage
} from 'models/home'

// s function
const s = state => {
  const introMessage = state.home.introMessage
  const tileContents = state.home.sampleTileContents

  return {
    introMessage,
    tileContents
  }
}

// d function
const d = dispatch => ({
  updateIntroMessage (open) {
    dispatch(updateIntroMessage(open))
  }
})

export default withRouter(connect(s, d)(Pure))
