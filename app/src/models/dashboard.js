import { createAction, createReducer } from 'redux-act'
import { put, call, select } from 'redux-saga/effects'
import axios from 'axios'
import { createSagaWatcher } from 'saga'
import { totalTimeArray, timeToArray, timeFromArray } from 'constants/index'
import { formatDateForApi, formatDateBy_yyyymmdd, formatTimeInHhMmAndRemoveSpecialChars } from 'utils/utils'

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
const CALENDAR_TIME = '[CALENDAR_TIME]'
const TIME = '[TIME]'
const WEATHER = '[WEATHER]'

export const getDashboard = createAction(`${MODEL_NAME} GET`)
export const getDashboardSuccess = createAction(`${MODEL_NAME} GET_SUCCESS`)
export const changeTabAction = createAction(`${MODEL_NAME} CHANGE_TAB`)
export const changeToggledTabAction = createAction(
  `${MODEL_NAME} CHANGE_TOGGLED_TAB`
)

export const changeWeatherTabAction = createAction(`${MODEL_NAME} TOGGLE_WEATHER_TAB`)

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
export const updateMapBoundsAction = createAction(
  `${MODEL_NAME} UPDATE CURRENT MAP BOUNDS AFTER ZOOM/DRAG/SEARCH`
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

// Calendar + Time Actions
export const toggleWidgetOpenStatusAction = createAction(
  `${CALENDAR_TIME} TOGGLE WIDGET OPENED/CLOSED STATUS`
)

// Saga Actions
export const getBikePointsActionSaga = createAction(
  `${MODEL_NAME} GET BIKE POINTS FROM BACKEND ON INITIAL MAP LOAD`
)
export const getBikePointsActionSuccess = createAction(
  `${MODEL_NAME} GET INITIAL LOAD BIKE POINTS SUCCESS`
)
export const getBikePointsActionFailed = createAction(
  `${MODEL_NAME} GET INITIAL LOAD BIKE POINTS FAILED`
)
export const getHeatmapPointsActionSaga = createAction(
  `${MODEL_NAME} GET HEAT MAP POINTS FROM BACKEND`
)
export const getHeatmapPointsActionSuccess = createAction(
  `${MODEL_NAME} GET HEAT MAP POINTS FROM BACKEND SUCCESS`
)
export const getHeatmapPointsActionFailed = createAction(
  `${MODEL_NAME} GET HEAT MAP POINTS FROM BACKEND FAILED`
)
export const toggleLoadingBarAction = createAction(
  `${MODEL_NAME} TOGGLE ISLOADING BAR`
)

// Graph Actions
export const toggleDropdownVisibilityAction = createAction(`${GRAPH} TOGGLE DROPDOWN SHOW/HIDE`)
export const updateDropDownDisplayValueAction = createAction(`${GRAPH} UPDATE DISPLAY VALUE`)
export const getBikeUsageTopLocationsActionSaga = createAction(`${GRAPH} GET_BIKE_TOP_LOCATIONS`)
export const getBikeUsageTopLocationsActionSuccess = createAction(`${GRAPH} GET_BIKE_TOP_LOCATIONS_SUCCESS`)
export const getBikeUsageTopLocationActionFail = createAction(`${GRAPH} GET_BIKE_TOP_LOCATIONS_FAIL`)
export const showErrorAction = createAction(`${GRAPH} SHOW_ERROR_MESSAGE`)

// Weather Actions 
export const resetWeatherCalendarAction = createAction(`${WEATHER} RESET_WEATHER_CALENDAR`)
export const clickDateFromWeatherAction = createAction(`${WEATHER} DATE_FROM_WEATHER_CALENDAR`)
export const clickDateToWeatherAction = createAction(`${WEATHER} DATE_TO_WEATHER_CALENDAR`)

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
  const url = `https://api.ci.palo-it-hk.com/usages/top-usage/${usageRank}/type/by-day/daterange/${formatDateForApi(fromDate)}/${formatDateForApi(toDate)}`
  return axios.get(url)
}

function fetchInitialBikePoints (payload) {
  const url = `https://api.ci.palo-it-hk.com/bike/point?swLat=${payload.sw.swLat}
    &swLon=${payload.sw.swLng}&neLat=${payload.ne.neLat}&neLon=${payload.ne.neLng}`
  return axios.get(url)
}

function fetchHeatmapPoints (payload) {
  const fromDate = formatDateBy_yyyymmdd(payload.date.fromDate)
  const toDate = formatDateBy_yyyymmdd(payload.date.toDate)
  const timeFrom = formatTimeInHhMmAndRemoveSpecialChars(payload.time.timeFrom)
  const timeTo = formatTimeInHhMmAndRemoveSpecialChars(payload.time.timeTo)
  const url = `https://api.ci.palo-it-hk.com/usages/boundary/${payload.ne.neLat},${payload.ne.neLng}/
    ${payload.sw.swLat},${payload.sw.swLng}/type/total/daterange/${fromDate}/${toDate}/
    timerange/${timeFrom}/${timeTo}`
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
    yield put(toggleLoadingBarAction(true))
    try {
      const result = yield call(fetchInitialBikePoints, payload)
      yield put(getBikePointsActionSuccess(result.data))
    } catch (error) {
      yield put(getBikePointsActionFailed(error))
    }
  },
  [getBikeUsageTopLocationsActionSaga]: function * () {
    yield put(toggleLoadingBarAction(true))
    const {usageRank, fromDate, toDate} = yield select(state => ({
      usageRank: state.dashboard.currentDropDownDisplayValue,
      fromDate: state.dashboard.fromDate,
      toDate: state.dashboard.toDate
    }))
    try {
      const result = yield call(fetchTopBikeUsageByLocations, usageRank, fromDate, toDate)
      result.data.length !== 0 ? yield put(getBikeUsageTopLocationsActionSuccess(result.data)) : yield put(showErrorAction())
      yield put(toggleLoadingBarAction(false))
    } catch (error) {
      yield put(getBikeUsageTopLocationActionFail(error))
    }
  },
  [getHeatmapPointsActionSaga]: function * ({ payload }) {
    yield put(toggleLoadingBarAction(true))
    try {
      const result = yield call(fetchHeatmapPoints, payload)
      yield put(getHeatmapPointsActionSuccess(result.data))
      yield put(toggleLoadingBarAction(false))
    } catch (error) {
      yield put(getHeatmapPointsActionFailed(error))
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

const changeWeatherTab = (state, currentWeatherTab) => {
  return {
    ...state,
    currentWeatherTab
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
const updateHeatmapPoints = (state, result) => ({
  ...state,
  bikeUsageHistoryDataArray: result
})
const updateMapBounds = (state, bounds) => ({
  ...state,
  currentMapBounds: bounds
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
    bikeUsageTopLocationsArray: data,
    showErrorText: null
  })
}

// Loader
const toggleLoadingBar = (state, status) => ({ ...state, loadingBarStatus: status })

const showError = (state, showErrorText) => {
  return ({
    ...state,
    showErrorText: `Sorry there is no data for this date range, please refine your parameters`
  })
}

const toggleWidgetOpenStatus = (state, status) => ({
  ...state,
  isAnyWidgetOpenCurrently: status
})

const clickDateFromWeather = (state, { from }) => ({
  ...state,
  fromDateWeather: from,
  toDateWeather: null,
  enteredToWeather: null
})

const clickDateToWeather = (state, { to, enteredTo }) => ({
  ...state,
  toDateWeather: to,
  enteredToWeather: enteredTo
})

const resetWeatherCalendar = (state) => ({
  ...state,
  toDateWeather: null,
  fromDateWeather: null,
  enteredToWeather: null
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
  [showErrorAction]: showError,
  [getHeatmapPointsActionSuccess]: updateHeatmapPoints,
  [toggleWidgetOpenStatusAction]: toggleWidgetOpenStatus,
  [updateMapBoundsAction]: updateMapBounds,
  [toggleLoadingBarAction]: toggleLoadingBar,
  [changeWeatherTabAction]: changeWeatherTab,
  [resetWeatherCalendarAction]: resetWeatherCalendar,
  [clickDateFromWeatherAction]: clickDateFromWeather,
  [clickDateToWeatherAction]: clickDateToWeather
}

export const dashboardInitialState = {
  currentTab: 'BIKE USAGE',
  currentMarker: '',
  currentToggledTab: 'HEAT MAP',
  currentWeatherTab: 'TEMPERATURE',
  graphData: data,
  currentFocusStatus: '',
  searchedLocation: '',
  mapInitialLoadStatus: false,
  currentBikePointsArray: [],
  fromDate: new Date(),
  toDate: new Date(),
  enteredTo: new Date(),
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
  bikeUsageHistoryDataArray: [],
  isAnyWidgetOpenCurrently: false,
  currentMapBounds: [],
  loadingBarStatus: false,
  fromDateWeather: new Date(),
  toDateWeather: new Date(),
  enteredToWeather: new Date()
}

export default createReducer(dashboard, dashboardInitialState)
