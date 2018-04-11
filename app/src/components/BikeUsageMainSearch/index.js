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
  getPublicHolidayAction,
  showTimePickerAction,
  hideTimePickerAction,
  selectTimeFromAction,
  selectTimeToAction,
  filterTimeToArrayAction,
  filterTimeFromArrayAction,
  getTimeTagAction,
  toggleDropdownVisibilityAction,
  updateDropDownDisplayValueAction
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
  currentDateSelection: state.dashboard.currentDateSelection,
  isTimePickerShown: state.dashboard.isTimePickerShown,
  timeFrom: state.dashboard.timeFrom,
  timeTo: state.dashboard.timeTo,
  totalTimeArray: state.dashboard.totalTimeArray,
  timeFromArray: state.dashboard.timeFromArray,
  timeToArray: state.dashboard.timeToArray,
  timeTagName: state.dashboard.timeTagName,
  dropDownDisplayStatus: state.dashboard.dropDownDisplayStatus,
  currentDropDownDisplayValue: state.dashboard.currentDropDownDisplayValue
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
  getPublicHolidayAction: bindActionCreators(getPublicHolidayAction, dispatch),
  showTimePickerAction: bindActionCreators(showTimePickerAction, dispatch),
  hideTimePickerAction: bindActionCreators(hideTimePickerAction, dispatch),
  selectTimeFromAction: bindActionCreators(selectTimeFromAction, dispatch),
  selectTimeToAction: bindActionCreators(selectTimeToAction, dispatch),
  filterTimeToArrayAction: bindActionCreators(filterTimeToArrayAction, dispatch),
  filterTimeFromArrayAction: bindActionCreators(filterTimeFromArrayAction, dispatch),
  getTimeTagAction: bindActionCreators(getTimeTagAction, dispatch),
  toggleDropdownVisibilityAction: bindActionCreators(toggleDropdownVisibilityAction, dispatch),
  updateDropDownDisplayValueAction: bindActionCreators(updateDropDownDisplayValueAction, dispatch)
})

export default withRouter(connect(s, d)(Pure))
