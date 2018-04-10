import { createAction, createReducer } from 'redux-act'
import { put, call } from 'redux-saga/effects'
import axios from 'axios'
import { createSagaWatcher } from 'saga'
import { totalTimeArray, timeToArray, timeFromArray } from 'constants/index'

// Mock data
import data from '../mockdata.json'

/** --------------------------------------------------
 *
 * Actions
 *
 */
const MODEL_NAME = '[DASHBOARD]'
const HEAT_MAP = '[HEATMAP]'
const CALENDAR = '[CALENDAR]'
const TIME = '[TIME]'
export const getDashboard = createAction(`${MODEL_NAME} GET`)
export const getDashboardSuccess = createAction(`${MODEL_NAME} GET_SUCCESS`)
export const changeTabAction = createAction(`${MODEL_NAME} CHANGE_TAB`)
export const changeToggledTabAction = createAction(
  `${MODEL_NAME} CHANGE_TOGGLED_TAB`
)
// HeatMap Actions
export const toggleMarkerLabelVisibilityAction = createAction(
  `${HEAT_MAP} TOGGLE MARKER LABEL VISIBLE`
)
export const hideMarkerLabelAction = createAction(
  `${HEAT_MAP} TOGGLE MARKER LABEL HIDDEN`
)
// Calendar Actions
export const clickDateFromAction = createAction(`${CALENDAR} DATE_FROM`)
export const clickDateToAction = createAction(`${CALENDAR} DATE_TO`)
export const resetDateAction = createAction(`${CALENDAR} RESET_DATE`)
export const showDatePickerAction = createAction(`${CALENDAR} SHOW_DATE_PICKER`)
export const hideDatePickerAction = createAction(`${CALENDAR} HIDE_DATE_PICKER`)
export const updateDateSelectionTabAction = createAction(
  `${CALENDAR} UPDATE_DATE_SELECTION_TAB`
)
export const getPublicHolidayAction = createAction(
  `${CALENDAR} PUBLIC_HOLIDAY_SELECTED`
)

// Time Actions
export const showTimePickerAction = createAction(`${TIME} SHOW_TIME_PICKER`)
export const hideTimePickerAction = createAction(`${TIME} HIDE_TIME_PICKER`)
export const selectTimeFromAction = createAction(`${TIME} SELECT_TIME_FROM`)
export const selectTimeToAction = createAction(`${TIME} SELECT_TIME_TO`)
export const filterTimeToArrayAction = createAction(`${TIME} FILTER_TIME_TO_ARRAY`)
export const filterTimeFromArrayAction = createAction(`${TIME} FILTER_TIME_FROM_ARRAY`)
export const getTimeTagAction = createAction(`${TIME} TIME_TAG_SELECTED`)

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
  [getDashboard]: function*() {
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
const changeTab = (state, tabs) => ({ ...state, currentTab: tabs })
const changeToggledTab = (state, tabs) => ({
  ...state,
  currentToggledTab: tabs
})
const addDashboardData = (state, dashboardData) => {
  return {
    ...state,
    dashboardData
  }
}
const toggleMarkerLabelVisible = (state, markerId) => ({
  ...state,
  currentMarker: markerId
})
const hideMarkerLabel = state => ({ ...state, currentMarker: '' })
const clickDateFrom = (state, { from }) => ({ ...state, fromDate: from })
const clickDateTo = (state, { to, enteredTo }) => ({
  ...state,
  toDate: to,
  enteredTo
})

const resetDate = state => ({
  ...state,
  toDate: null,
  fromDate: null,
  enteredTo: null
})

const showDatePicker = state => ({
  ...state,
  showDatePicker: true
})

const hideDatePicker = state => ({
  ...state,
  showDatePicker: false
})

const getPublicHoliday = (state, date) => ({
  ...state,
  toDate: date,
  fromDate: date,
  enteredTo: date
})

const showTimePicker = state => ({
  ...state,
  isTimePickerShown: true
})

const hideTimePicker = state => ({
  ...state,
  isTimePickerShown: false
})

const selectTimeFrom = (state, time) => ({
  ...state,
  timeFrom: time,
  timeTagName: null
})

const selectTimeTo = (state, time) => ({
  ...state,
  timeTo: time,
  timeTagName: null
})

const filterTimeToArray = (state, arr) => ({
  ...state,
  timeToArray: arr
})

const filterTimeFromArray = (state, arr) => ({
  ...state,
  timeFromArray: arr
})

const getTimeTag = (state, time) => ({
  ...state,
  timeTagName: time[0],
  timeFrom: time[1].timeFrom,
  timeTo: time[1].timeTo
})

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
  [changeToggledTabAction]: changeToggledTab,
  [clickDateFromAction]: clickDateFrom,
  [clickDateToAction]: clickDateTo,
  [resetDateAction]: resetDate,
  [showDatePickerAction]: showDatePicker,
  [hideDatePickerAction]: hideDatePicker,
  [getPublicHolidayAction]: getPublicHoliday,
  [showTimePickerAction]: showTimePicker,
  [hideTimePickerAction]: hideTimePicker,
  [selectTimeFromAction]: selectTimeFrom,
  [selectTimeToAction]: selectTimeTo,
  [filterTimeToArrayAction]: filterTimeToArray,
  [filterTimeFromArrayAction]: filterTimeFromArray,
  [getTimeTagAction]: getTimeTag
}

export const dashboardInitialState = {
  currentTab: 'BIKE USAGE',
  currentMarker: '',
  currentToggledTab: 'HEAT MAP',
  graphData: data,
  fromDate: null,
  toDate: null,
  enteredTo: null,
  showDatePicker: false,
  currentDateSelection: new Date(),
  isTimePickerShown: false,
  totalTimeArray: totalTimeArray,
  timeFromArray: timeFromArray,
  timeToArray: timeToArray,
  timeFrom: '00:00',
  timeTo: '23:30',
  timeTagName: null
}

export default createReducer(dashboard, dashboardInitialState)
