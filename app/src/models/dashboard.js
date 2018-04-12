import { createAction, createReducer } from 'redux-act'
import { put, call, select } from 'redux-saga/effects'
import axios from 'axios'
import { createSagaWatcher } from 'saga'
import { totalTimeArray, timeToArray, timeFromArray } from 'constants/index'
import { formatDateForApi } from 'utils/utils'

// Mock data
import data from '../mockdata.json'

/** --------------------------------------------------
 *
 * Actions
 *
 */
const MODEL_NAME = '[DASHBOARD]'
const HEAT_MAP = '[HEATMAP]'
const GRAPH = '[GRAPH]'
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
export const changeInputFocusAction = createAction(
  `${MODEL_NAME} CHANGE SEARCH BAR FOCUS`
)
export const updateMapLocationAction = createAction(
  `${MODEL_NAME} UPDATE GOOGLE MAP LOCATION BASED ON SEARCH`
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
export const filterTimeToArrayAction = createAction(
  `${TIME} FILTER_TIME_TO_ARRAY`
)
export const filterTimeFromArrayAction = createAction(
  `${TIME} FILTER_TIME_FROM_ARRAY`
)
export const getTimeTagAction = createAction(`${TIME} TIME_TAG_SELECTED`)

// Saga Actions
export const getBikePointsActionSaga = createAction(
  `${MODEL_NAME} GET BIKE POINTS FROM BACKEND ON INITIAL MAP LOAD`
)
export const getBikePointsActionSuccess = createAction(
  `${MODEL_NAME} GET INITIAL LOAD BIKE POINTS SUCCESS`
)

// Graph Actions
export const toggleDropdownVisibilityAction = createAction(`${GRAPH} TOGGLE DROPDOWN SHOW/HIDE`)
export const updateDropDownDisplayValueAction = createAction(`${GRAPH} UPDATE DISPLAY VALUE`)
export const getBikeUsageTopLocationsActionSaga = createAction(`${GRAPH} GET_BIKE_TOP_LOCATIONS`)
export const getBikeUsageTopLocationsActionSuccess = createAction(`${GRAPH} GET_BIKE_TOP_LOCATIONS_SUCCESS`)
export const showLoader = createAction(`${GRAPH} SHOW_LOADER`)
export const hideLoader = createAction(`${GRAPH} HIDE_LOADER`)
/** --------------------------------------------------
 *
 * Sagas
 *
 */
// Sample data, to be replaced by API call to Node Backend when ready
function fetchDashboard () {
  return axios.get('https://swapi.co/api/people/1')
}

function fetchTopBikeUsageByLocations (usageRank, fromDate, toDate) {
  const url = `https://api.ci.palo-it-hk.com/usages/top-usage/${usageRank}/type/total/daterange/${formatDateForApi(fromDate)}/${formatDateForApi(toDate)}`
  return axios.get(url)
}

function fetchInitialBikePoints (payload) {
  const url = `https://api.ci.palo-it-hk.com/bike/point?swLat=${
    payload[0]
  }&swLon=${payload[1]}&neLat=${payload[2]}&neLon=${payload[3]}`
  return axios.get(url)
}

export const sagas = {
  [getDashboard]: function * () {
    // When the response of the async call returns, store the data in res
    const res = yield call(fetchDashboard)
    // This next yield dispatches another action that does not go through Saga and instead to the Reducer
    yield put(getDashboardSuccess(res.data))
  },
  [getBikePointsActionSaga]: function * ({ payload }) {
    const result = yield call(fetchInitialBikePoints, payload)
    yield put(getBikePointsActionSuccess(result.data))
  },
  [getBikeUsageTopLocationsActionSaga]: function * () {
    yield put(showLoader())
    const {usageRank, fromDate, toDate} = yield select(state => ({
      usageRank: state.dashboard.currentDropDownDisplayValue,
      fromDate: state.dashboard.fromDate,
      toDate: state.dashboard.toDate
    }))
    try {
      const result = yield call(fetchTopBikeUsageByLocations, usageRank, fromDate, toDate)
      yield put(getBikeUsageTopLocationsActionSuccess(result.data))
      yield put(hideLoader())
    } catch (error) {
      console.log(error)
    }
  }
}
export const dashboardSagaWatcher = createSagaWatcher(sagas)

/** --------------------------------------------------
 *
 * Logic
 *
 */
// Tabs
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

// Heatmap
const toggleMarkerLabelVisible = (state, markerId) => ({
  ...state,
  currentMarker: markerId
})
const hideMarkerLabel = state => ({ ...state, currentMarker: '' })
const toggleFocusStatus = (state, searchBarFocusStatus) => ({
  ...state,
  currentFocusStatus: searchBarFocusStatus
})
const updateLocationOnMap = (state, place) => ({
  ...state,
  searchedLocation: place
})
const updateBikePoints = (state, result) => ({
  ...state,
  currentBikePointsArray: result
})

// Graph Dropdown
const toggleDropdownVisibility = (state, toggleValue) => ({
  ...state,
  dropDownDisplayStatus: toggleValue
})
const updateDropDownDisplayValue = (state, newValue) => ({
  ...state,
  currentDropDownDisplayValue: newValue,
  dropDownDisplayStatus: false
})

// Calendar
const clickDateFrom = (state, { from }) => ({
  ...state,
  fromDate: from,
  toDate: null,
  enteredTo: null
})
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

// Time
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

// Graph top filter
const bikeUsageTopLocations = (state, data) => {
  return ({
    ...state,
    bikeUsageTopLocationsArray: data
  })
}

// Loader
const showLoading = (state) => {
  return ({
    ...state,
    isLoading: true
  })
}

const hideLoading = (state) => {
  return ({
    ...state,
    isLoading: false
  })
}

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
  [changeInputFocusAction]: toggleFocusStatus,
  [updateMapLocationAction]: updateLocationOnMap,
  [getBikePointsActionSuccess]: updateBikePoints,
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
  [getTimeTagAction]: getTimeTag,
  [toggleDropdownVisibilityAction]: toggleDropdownVisibility,
  [updateDropDownDisplayValueAction]: updateDropDownDisplayValue,
  [getBikeUsageTopLocationsActionSuccess]: bikeUsageTopLocations,
  [showLoader]: showLoading,
  [hideLoader]: hideLoading
}

export const dashboardInitialState = {
  currentTab: 'BIKE USAGE',
  currentMarker: '',
  currentToggledTab: 'HEAT MAP',
  graphData: data,
  currentFocusStatus: '',
  searchedLocation: '',
  mapInitialLoadStatus: false,
  currentBikePointsArray: [],
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
  timeTagName: null,
  dropDownDisplayStatus: false,
  currentDropDownDisplayValue: 5,
  bikeUsageTopLocationsArray: [],
  isLoading: false
}

export default createReducer(dashboard, dashboardInitialState)
