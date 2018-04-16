import React, { Component } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import moment from 'moment'

import PublicHolidayFilters from 'components/PublicHolidayFilters/Pure'
import SButton from 'components/Button/Pure'
import { formatDateBy_ddmmyyyy } from 'utils/utils'
import { publicHolidaysLondon } from 'constants/index'

const CalendarWrapper = styled.div`
  width: 650px;
  margin: 0 auto;
  padding: 1rem;
  z-index: 99;
  border: 1px solid #e7e7e7;
  background: #ffffff;
  position: absolute;
  top: 32%;
  left: 44.5%;
`

const DisplayButtons = styled.div`
  border-top: 1px solid #e7e7e7;
  padding-top: 0.8rem;
`

const ButtonsWrapper = styled.div`
  padding-top: 0.8rem;
`

export default class CalendarDatePicker extends Component {
  // const { currentMapBounds, getHeatmapPointsActionSaga } = props
  isSelectingFirstDay(from, to, day) {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from)
    const isRangeSelected = from && to
    return !from || isBeforeFirstDay || isRangeSelected
  }
  handleDayClick = day => {
    const { from, to, clickDateFromAction, clickDateToAction } = this.props
    if (from && to && day >= from && day <= to) {
      this.handleResetClick()
      return
    }
    const currentDate = new Date()
    if (moment(day).isAfter(currentDate, 'day')) return

    this.isSelectingFirstDay(from, to, day)
      ? clickDateFromAction({ from: day })
      : clickDateToAction({ to: day, enteredTo: day })
  }
  handleDayMouseEnter = day => {
    const { from, to } = this.props
    if (!this.isSelectingFirstDay(from, to, day)) {
      this.props.clickDateToAction({
        enteredTo: day
      })
    }
  }
  handleResetClick = () => {
    this.props.resetDateAction()
  }

  handleCalendarApplyOnClick = () => {
    const currentTab = this.props.currentTab || 'BIKE USAGE'
    if (currentTab === 'BIKE USAGE') {
      const payload = {
        widget: 'CALENDAR',
        ne: {
          neLat: this.props.currentMapBounds.ne.neLat,
          neLng: this.props.currentMapBounds.ne.neLng
        },
        sw: {
          swLat: this.props.currentMapBounds.sw.swLat,
          swLng: this.props.currentMapBounds.sw.swLng
        },
        date: {
          fromDate: this.props.from,
          toDate: this.props.to
        }
      }
      this.props.getHeatmapPointsActionSaga(payload)
    }
    this.props.fetchSagaAction()
    this.props.hideDatePickerAction()
    this.props.toggleWidgetOpenStatusAction(false)
  }

  getPublicHoliday = (day) => {
    this.props.getPublicHolidayAction(publicHolidaysLondon[day])
  }

  render() {
    const { from, to, enteredTo } = this.props
    const modifiers = { start: from, end: enteredTo }
    const selectedDays = [from, { from, to: enteredTo }]

    return (
      <div>
        <CalendarWrapper>
          {this.props.currentTab === 'WEATHER EFFECT' ? null : <PublicHolidayFilters selectPublicHoliday={this.getPublicHoliday} />}
          <DayPicker
            className="Range"
            numberOfMonths={2}
            fromMonth={from}
            month={from}
            selectedDays={selectedDays}
            modifiers={modifiers}
            onDayChange={this.getPublicHoliday}
            onDayClick={day => this.handleDayClick(day)}
            onDayMouseEnter={this.handleDayMouseEnter}
            disabledDays={day => {
              const dateToCheck = this.props.currentTab === 'WEATHER EFFECT'
                ? moment(from).add(6, 'days')
                : new Date()
              return moment(day).isAfter(dateToCheck, 'day')
            }}
          />
          <DisplayButtons>
            <div>
              {!from && !to && 'Please select the first day.'}
              {from && !to && 'Please select the last day.'}
              {from &&
                to &&
                `Selected from ${formatDateBy_ddmmyyyy(from)} to
                    ${formatDateBy_ddmmyyyy(to)}`}{' '}
              <ButtonsWrapper>
                {from &&
                  to && (
                    <SButton
                      onClick={this.handleResetClick}
                      type={'secondary'}
                      size={'small'}
                      children={'Reset'}
                    />
                  )}
                  <SButton
                    type={'primary'}
                    size={'small'}
                    onClick={this.handleCalendarApplyOnClick}
                    children={'Apply'}
                  />
              </ButtonsWrapper>
            </div>
          </DisplayButtons>
          <Helmet>
            <style>
              {`
                    .Range .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                      background-color: #F1F4F8 !important;
                      color: #D54435;
                    }
                    .DayPicker:not(.DayPicker--interactionDisabled) .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
                      background-color: #D54435;
                      color: #ffffff;
                    }
                    .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
                      background-color: #D54435 !important;
                      color: #ffffff;
                    }
                    .Range .DayPicker-Day {
                      border-radius: 0 !important;
                    }`}
            </style>
          </Helmet>
        </CalendarWrapper>
      </div>
    )
  }
}
