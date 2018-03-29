import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Pure from './Pure'

// s function
const s = state => ({
})

// d function
const d = dispatch => ({
})

export default withRouter(connect(s, d)(Pure))
