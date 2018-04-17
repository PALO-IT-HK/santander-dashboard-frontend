import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import * as districts from '../../districts.json'
import uuidv4 from 'uuid/v4'

const SearchInputField = styled.input`
  ${({size}) => inputFieldSize[size]}
    display: flex;
    height: auto;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 2px dashed #1dacbd;
    color: #1dacbd;
    font-family: Abril Fatface;
    background-color: #f1f4f8;
  &::-webkit-input-placeholder {
    ${({status}) => status === 'focus' ? `opacity: 0.4;` : `opacity: 1;`}
    color: #1dacbd;
    font-family: Abril Fatface;
    font-size: 30px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
  }
`

const inputFieldSize = {
  small: `
    width: 600px;
    font-size: 30px;
  `,
  medium: `
    width: 600px;
    font-size: 30px;
  `,
  large: `
    width: 600px;
    font-size: 30px;
  `
}

const SearchBarWrapper = styled.div`
  height: auto;
  width: 600px;
  ${({paddingLeft}) => `padding-left: ${paddingLeft}px;`}
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 99;
`

const SearchResultsWrapper = styled.div`
  ${({visibility}) => visibility === 'false' ? `display: none;` : ``}
  width: 570px;
  height: 200px;
  overflow: auto;
  position: absolute;
  top: 100%;
  left: 30px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 1px 1px 1px black;
`

const SearchResultsItem = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  border-bottom: 1px solid #d3d3d3;
  box-shadow: 1px 1px 1px #e9e9e9;
  font-size: 18px;
  :hover {
    cursor: pointer;
    background-color: #e9e9e9;
  }
`

const SearchBar = props => {
  const {id, size, placeholder, name, type, changeInputFocusAction, currentFocusStatus,
    wrapperPaddingLeft, currentToggledTab, updateGraphSearchResultsAction, graphSearchResults,
    updateGraphSelectedDistrictAction, updateGraphSearchInputValueAction,
    currentGraphInputValue, resultsWrapperVisibilityStatus, toggleResultsWrapperVisibilityAction } = props
  const handleFocusBlur = (e, changeInputFocusAction, id, currentGraphInputValue) => {
    if (id === 'graph-search') {
      if (e.type === 'focus') {
        changeInputFocusAction('focus')
        if (e.target.value !== '') toggleResultsWrapperVisibilityAction(true)
      } else {
        changeInputFocusAction('blur')
        toggleResultsWrapperVisibilityAction(false)
      }
    } else if (id === 'search-autocomplete' && e.type === 'focus') {
      changeInputFocusAction('focus')
    } else {
      changeInputFocusAction('blur')
    }
  }
  const handleSearchBarOnChange = (e, currentToggledTab, updateGraphSearchResultsAction,
    updateGraphSearchInputValueAction, currentGraphInputValue,
    toggleResultsWrapperVisibilityAction) => {
    e.target.value === '' ? toggleResultsWrapperVisibilityAction(false) : toggleResultsWrapperVisibilityAction(true)
    updateGraphSearchInputValueAction(e.target.value)
    const currentTab = currentToggledTab
    if (currentTab === 'GRAPH') {
      const districtNamesArray = Object.keys(districts)
      console.log('DISTRICTS: ' + districtNamesArray)
      const filteredDistricts = districtNamesArray
        .filter(district => district.toLowerCase().includes(currentGraphInputValue.toLowerCase()))
        .sort()
      console.log('INPUT VALUE: ' + e.target.value)
      console.log('FILTERED DIST: ' + filteredDistricts)
      updateGraphSearchResultsAction(filteredDistricts)
    }
  }
  const handleSearchItemOnClick = (e, updateGraphSelectedDistrictAction,
    updateGraphSearchInputValueAction, toggleResultsWrapperVisibilityAction) => {
    updateGraphSearchInputValueAction(e.target.innerHTML)
    updateGraphSelectedDistrictAction(e.target.innerHTML)
    toggleResultsWrapperVisibilityAction(false)
  }
  return (
    <SearchBarWrapper
      paddingLeft={wrapperPaddingLeft}>
      <SearchInputField
        id={id}
        size={size}
        onFocus={id === 'search-autocomplete' ? (e) => handleFocusBlur(e, changeInputFocusAction)
          : (e) => handleFocusBlur(e, changeInputFocusAction, id, toggleResultsWrapperVisibilityAction)}
        onBlur={id === 'search-autocomplete' ? (e) => handleFocusBlur(e, changeInputFocusAction)
          : (e) => handleFocusBlur(e, changeInputFocusAction, id, toggleResultsWrapperVisibilityAction)}
        status={currentFocusStatus}
        value={currentGraphInputValue}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={(e) => handleSearchBarOnChange(e, currentToggledTab, updateGraphSearchResultsAction,
          updateGraphSearchInputValueAction, currentGraphInputValue, toggleResultsWrapperVisibilityAction)} />
      {id === 'graph-search' &&
        <SearchResultsWrapper
          visibility={resultsWrapperVisibilityStatus.toString()}>
          {graphSearchResults.map(item => {
            return (
              <SearchResultsItem
                key={uuidv4()}
                value={item}
                onClick={(e) => handleSearchItemOnClick(e, updateGraphSelectedDistrictAction,
                  updateGraphSearchInputValueAction, toggleResultsWrapperVisibilityAction)}>
                {item}
              </SearchResultsItem>
            )
          })
          }
        </SearchResultsWrapper>
      }
    </SearchBarWrapper>
  )
}

SearchBar.defaultProps = {
  size: 'medium',
  type: 'text',
  onChange: () => null
}

SearchBar.propTypes = {
  size: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string
}

export default SearchBar
