import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Pure from './Pure'

// Import action
import {
  toggleMarkerLabelVisibilityAction,
  hideMarkerLabelAction,
  changeToggledTabAction,
  changeInputFocusAction,
  updateMapLocationAction,
  getBikePointsActionSaga,
  clickDateFromAction,
  clickDateToAction,
  resetDateAction,
  hideDatePickerAction,
  showDatePickerAction,
  getPublicHolidayAction
} from 'models/dashboard'

// s function
const s = state => ({
  currentMarker: state.dashboard.currentMarker,
  currentFocusStatus: state.dashboard.currentFocusStatus,
  currentToggledTab: state.dashboard.currentToggledTab,
  graphData: state.dashboard.graphData,
  searchedLocation: state.dashboard.searchedLocation,
  mapInitialLoadStatus: state.dashboard.mapInitialLoadStatus,
  currentBikePointsArray: state.dashboard.currentBikePointsArray,
  fromDate: state.dashboard.fromDate,
  toDate: state.dashboard.toDate,
  enteredTo: state.dashboard.enteredTo,
  showDatePicker: state.dashboard.showDatePicker,
  currentDateSelection: state.dashboard.currentDateSelection
})

const d = dispatch => ({
  toggleMarkerLabelVisibilityAction: bindActionCreators(toggleMarkerLabelVisibilityAction, dispatch),
  hideMarkerLabelAction: bindActionCreators(hideMarkerLabelAction, dispatch),
  changeToggledTabAction: bindActionCreators(changeToggledTabAction, dispatch),
  changeInputFocusAction: bindActionCreators(changeInputFocusAction, dispatch),
  updateMapLocationAction: bindActionCreators(updateMapLocationAction, dispatch),
  getBikePointsActionSaga: bindActionCreators(getBikePointsActionSaga, dispatch),
  clickDateFromAction: bindActionCreators(clickDateFromAction, dispatch),
  clickDateToAction: bindActionCreators(clickDateToAction, dispatch),
  resetDateAction: bindActionCreators(resetDateAction, dispatch),
  showDatePickerAction: bindActionCreators(showDatePickerAction, dispatch),
  hideDatePickerAction: bindActionCreators(hideDatePickerAction, dispatch),
  getPublicHolidayAction: bindActionCreators(getPublicHolidayAction, dispatch)
})

export default withRouter(connect(s, d)(Pure))
