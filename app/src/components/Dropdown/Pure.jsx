import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import uuidv4 from 'uuid/v4'

// Get dropdown item values
import { dropDownItemsArray } from 'constants/index'

import dropDownArrowImage from 'assets/img/dropdown-arrow.png'

const DropdownWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  padding-left: 25px;
`

const DropdownDisplay = styled.div`
  font-family: Abril Fatface;
  font-size: 30px;
  color: #1dacbd;
  width: 400px;
  padding-left: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 2px dashed #1dacbd;
  :hover {
    cursor: pointer;
    background-color: #f1f1f1;
    transition: 1.5s ease;
  }
`

const DropdownIcon = styled.div`
  background-image: url(${dropDownArrowImage});
  position: absolute;
  width: 15px;
  height: 15px;
  transform: rotate(136deg);
  left: 94%;
`

const DropdownItemContainer = styled.div`
  position: absolute;
  width: 400px;
  height: auto;
  background-color: #e9e9e9;
  border-radius: 5px;
  overflow-y: auto;
  top: 105%;
  ${({display}) => display === 'true' ? `display: flex;` : `display: none`}
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.8);
  z-index: 100;
`

const DropdownItemWrapper = styled.div`
    width: 100%;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-radius: 1px;
    color: #1dacbd;
    font-family: Abril Fatface;
    font-size: 20px;
    border-bottom: 2px solid #d3d3d3;
    padding: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    :hover {
      background-color: #bdbdbd;
      cursor: pointer;
    }
`
const DropdownItem = props => {
  const {name, size, value, type, onClick, children} = props
  return (
    <DropdownItemWrapper
      name={name}
      size={size}
      type={type}
      children={children}
      onClick={() => onClick(value)} />
  )
}

const Dropdown = props => {
  const {size, name, type, dropDownDisplayStatus, toggleDropdownVisibilityAction,
    currentDropDownDisplayValue, updateDropDownDisplayValueAction, onChange} = props
  const handleDisplayOnClick = () => dropDownDisplayStatus ? toggleDropdownVisibilityAction(false) : toggleDropdownVisibilityAction(true)
  const handleDropDownItemOnClick = (value) => updateDropDownDisplayValueAction(value) && onChange()
  return (
    <DropdownWrapper>
      <DropdownDisplay
        onClick={() => handleDisplayOnClick()}>
        {dropDownItemsArray.find(item => currentDropDownDisplayValue === item.value).label}
      </DropdownDisplay>
      <DropdownIcon />
      <DropdownItemContainer
        display={dropDownDisplayStatus.toString()}>
        {dropDownItemsArray.map(item => {
          return (
            <DropdownItem
              key={uuidv4()}
              name={name}
              size={size}
              value={item.value}
              type={type}
              onClick={(value) => handleDropDownItemOnClick(value)}>
              {item.label}
            </DropdownItem>
          )
        })
        }
      </DropdownItemContainer>
    </DropdownWrapper>

  )
}

Dropdown.defaultProps = {
  size: 'medium'
}

Dropdown.propTypes = {
  size: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any
}

export default Dropdown
