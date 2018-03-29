import { createAction, createReducer } from 'redux-act'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { createSagaWatcher } from 'saga'

import { API_ENDPOINTS } from 'api'

// added to support sample component
import castleImage from 'assets/img/castle.jpg'
import zooImage from 'assets/img/zoo.jpg'

/** --------------------------------------------------
 *
 * Actions
 *
 */

export const updateIntroMessage = createAction('Update intro message')

export const getSample = createAction('Get sample')
export const getSampleSuccess = createAction('Get sample success')

// =============
// TO BE REMOVED
// =============
// services/api.js
function fetchSample () {
  return axios.get(`${API_ENDPOINTS.sample}`)
}

/** --------------------------------------------------
 *
 * Sagas
 *
 */
export const sagas = {
  [getSample]: function * () {
    const res = yield call(fetchSample)
    yield put(getSampleSuccess(res.data))
  }
}
export const homeSagaWatcher = createSagaWatcher(sagas)

/** --------------------------------------------------
 *
 * Reducers
 *
 */
export const home = {
  [updateIntroMessage]: (state, introMessage) => ({
    ...state,
    introMessage
  }),
  [getSampleSuccess]: (state, sample) => ({
    ...state,
    sample
  })
}

export const homeInitialState = {
  introMessage: 'Welcome! You are now ready to start creating your own pages and components.',
  sampleTileContents: [
    {
      imageUrl: castleImage,
      title: 'Osaka Castle',
      text: 'Osaka Castle is a Japanese castle located at Chūō-ku, Osaka, Japan. This famous landmark played a major role in the unification of Japan during the sixteenth century of the Azuchi-Momoyama period.'
    },
    {
      imageUrl: zooImage,
      title: 'Saint Louis Zoo',
      text: 'Located at Forest Park in Saint Louis USA, Saint Louis Zoological Park is a leading zoo in animal management, research and education.'
    }
  ]
}

export default createReducer(home, homeInitialState)
