import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import Pure from './Pure'

// Import action
import {
  toggleMarkerLabelVisibilityAction,
  hideMarkerLabelAction,
  changeToggledTabAction,
  clickDateFromAction,
  clickDateToAction,
  resetDateAction,
  hideDatePickerAction,
  showDatePickerAction,
  getPublicHolidayAction,
  showTimePickerAction,
  hideTimePickerAction
} from 'models/dashboard'

// s function
const s = state => ({
  currentMarker: state.dashboard.currentMarker,
  currentToggledTab: state.dashboard.currentToggledTab,
  graphData: state.dashboard.graphData,
  fromDate: state.dashboard.fromDate,
  toDate: state.dashboard.toDate,
  enteredTo: state.dashboard.enteredTo,
  showDatePicker: state.dashboard.showDatePicker,
  currentDateSelection: state.dashboard.currentDateSelection,
  isTimePickerShown: state.dashboard.isTimePickerShown
})

const d = dispatch => ({
  toggleMarkerLabelVisibilityAction: bindActionCreators(
    toggleMarkerLabelVisibilityAction,
    dispatch
  ),
  hideMarkerLabelAction: bindActionCreators(hideMarkerLabelAction, dispatch),
  changeToggledTabAction: bindActionCreators(changeToggledTabAction, dispatch),
  clickDateFromAction: bindActionCreators(clickDateFromAction, dispatch),
  clickDateToAction: bindActionCreators(clickDateToAction, dispatch),
  resetDateAction: bindActionCreators(resetDateAction, dispatch),
  showDatePickerAction: bindActionCreators(showDatePickerAction, dispatch),
  hideDatePickerAction: bindActionCreators(hideDatePickerAction, dispatch),
  getPublicHolidayAction: bindActionCreators(getPublicHolidayAction, dispatch),
  showTimePickerAction: bindActionCreators(showTimePickerAction, dispatch),
  hideTimePickerAction: bindActionCreators(hideTimePickerAction, dispatch)
})

export default withRouter(connect(s, d)(Pure))
