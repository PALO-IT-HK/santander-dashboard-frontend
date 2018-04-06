import { createAction, createReducer } from 'redux-act'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { createSagaWatcher } from 'saga'

/** --------------------------------------------------
 *
 * Actions
 *
 */
const MODEL_NAME = '[DASHBOARD]'
export const getDashboard = createAction(`${MODEL_NAME} GET`)
export const getDashboardSuccess = createAction(`${MODEL_NAME} GET_SUCCESS`)
export const changeTabAction = createAction(`${MODEL_NAME} CHANGE_TAB`)
export const toggleMarkerLabelVisibilityAction = createAction(`${MODEL_NAME} TOGGLE MARKER LABEL VISIBLE`)
export const hideMarkerLabelAction = createAction(`${MODEL_NAME} TOGGLE MARKER LABEL HIDDEN`)
export const changeToggledTabAction = createAction(`${MODEL_NAME} CHANGE_TOGGLED_TAB`)


/** --------------------------------------------------
 *
 * Sagas
 *
 */
// Sample data, to be replaced by API call to Node Backend when ready
function fetchDashboard () {
  return axios.get('https://swapi.co/api/people/1')
}

export const sagas = {
  [getDashboard]: function * () {
    // When the response of the async call returns, store the data in res
    const res = yield call(fetchDashboard)
    // This next yield dispatches another action that does not go through Saga and instead to the Reducer
    yield put(getDashboardSuccess(res.data))
  }
}
export const dashboardSagaWatcher = createSagaWatcher(sagas)

/** --------------------------------------------------
 *
 * Logic
 *
 */
const changeTab = (state, tabs) => ({...state, currentTab: tabs})
const changeToggledTab = (state, tabs) => ({...state, currentToggledTab: tabs})
const addDashboardData = (state, dashboardData) => {
  return {
    ...state,
    dashboardData
  }
}
const toggleMarkerLabelVisible = (state, markerId) => ({...state, currentMarker: markerId})
const hideMarkerLabel = state => ({...state, currentMarker: ''})
/** --------------------------------------------------
 *
 * Reducers
 *
 */
export const dashboard = {
  [getDashboardSuccess]: addDashboardData,
  [changeTabAction]: changeTab,
  [toggleMarkerLabelVisibilityAction]: toggleMarkerLabelVisible,
  [hideMarkerLabelAction]: hideMarkerLabel,
  [changeToggledTabAction]: changeToggledTab
}

export const dashboardInitialState = {
  currentTab: 'BIKEUSAGE',
  currentMarker: '',
  currentToggledTab: 'HEAT MAP'
}

export default createReducer(dashboard, dashboardInitialState)
