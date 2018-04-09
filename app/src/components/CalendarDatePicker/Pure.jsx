import React, { Component } from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import SButton from 'components/Button/Pure'
import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { formatDate } from 'utils/utils'

const CalendarWrapper = styled.div`
  width: 650px;
  margin: 0 auto;
  padding: 1rem;
  z-index: 99;
  border: 1px solid grey;
  background: #ffffff;
  position: absolute;
  top: 200px;
`

export default class CalendarDatePicker extends Component {
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
    if (day.getTime() > currentDate.getTime()) return
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

  hideDatePicker = () => {
    this.props.hideDatePickerAction()
  }
  render() {
    const { from, to, enteredTo } = this.props
    const modifiers = { start: from, end: enteredTo }
    const selectedDays = [from, { from, to: enteredTo }]

    return (
      <div>
        <CalendarWrapper>
          <DayPicker
            className="Range"
            numberOfMonths={2}
            fromMonth={from}
            selectedDays={selectedDays}
            modifiers={modifiers}
            onDayClick={day => this.handleDayClick(day)}
            onDayMouseEnter={this.handleDayMouseEnter}
            disabledDays={[{ after: new Date() }]}
          />
          <div>
            {!from && !to && 'Please select the first day.'}
            {from && !to && 'Please select the last day.'}
            {from &&
              to &&
              `Selected from ${formatDate(from)} to
                  ${formatDate(to)}`}{' '}
            {from &&
              to && (
                <SButton
                  onClick={this.handleResetClick}
                  type={'secondary'}
                  size={'small'}
                  children={'Reset'}
                />
              )}
          </div>
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
          <div>
            <SButton
              type={'primary'}
              size={'small'}
              onClick={this.hideDatePicker}
              children={'Apply'}
            />
          </div>
        </CalendarWrapper>
      </div>
    )
  }
}
