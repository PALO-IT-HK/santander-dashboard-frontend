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
    updateGraphSelectedDistrictAction, updateGraphSearchInputValueAction, currentGraphInputValue,
    updatePreviousGraphSearchInputValueAction, previousGraphInputValue, resultsWrapperVisibilityStatus,
    toggleResultsWrapperVisibilityAction, fetchDistrictSelectedActionSaga, fetchSagaAction,
    updateMouseOverStatusAction, mouseOverStatus} = props
  const outsideSearchClickEventListener = event => {
    const id = event.target.id || ''
    if (!id.includes('searchItem') && !id.includes('graph-search') && resultsWrapperVisibilityStatus) {
      toggleResultsWrapperVisibilityAction(false)
      removeClickListener()
    }
  }
  const removeClickListener = () => document.removeEventListener('click', outsideSearchClickEventListener)
  document.addEventListener('click', outsideSearchClickEventListener)
  const handleFocusBlur = (e) => {
    if (id === 'graph-search') {
      // Logic for Graph Search Box
      // When focused and value is not empty string, open results box and apply focus style
      if (e.type === 'focus') {
        updatePreviousGraphSearchInputValueAction(currentGraphInputValue)
        changeInputFocusAction('focus')
        if (e.target.value !== '') toggleResultsWrapperVisibilityAction(true)
      }
    } else if (id === 'search-autocomplete' && e.type === 'focus') {
      changeInputFocusAction('focus')
    } else {
      changeInputFocusAction('blur')
    }
  }
  const handleHoverAndMouseOut = (e) => {
    if (id === 'graph-search') {
      if (e.type === 'mouseover') updateMouseOverStatusAction(true)
      else {
        updateMouseOverStatusAction(false)
        e.target.blur()
        changeInputFocusAction('blur')
      }
    }

  }
  const handleSearchBarOnChange = (e) => {
    if (currentToggledTab === 'GRAPH') {
      updateGraphSearchInputValueAction(e.target.value)
      e.target.value === '' ? toggleResultsWrapperVisibilityAction(false) : toggleResultsWrapperVisibilityAction(true)
      const districtNamesArray = Object.keys(districts)
      const filteredDistricts = districtNamesArray
        .filter(district => district.toString().toLowerCase().includes(e.target.value.toLowerCase())
          && district.toLowerCase() !== 'default')
        .sort()
      updateGraphSearchResultsAction(filteredDistricts)
    }
  }
  const handleSearchItemOnClick = (e) => {
    updateGraphSearchInputValueAction(e.target.innerHTML)
    updatePreviousGraphSearchInputValueAction(e.target.innerHTML)
    updateGraphSelectedDistrictAction(e.target.innerHTML)
    toggleResultsWrapperVisibilityAction(false)
    e.target.innerHTML !== 'All of London' ? fetchDistrictSelectedActionSaga() : fetchSagaAction()
  }
  return (
    <SearchBarWrapper
      paddingLeft={wrapperPaddingLeft}>
      <SearchInputField
        id={id}
        size={size}
        onFocus={(e) => handleFocusBlur(e)}
        onBlur={(e) => handleFocusBlur(e)}
        onMouseOver={(e) => handleHoverAndMouseOut(e)}
        onMouseOut={(e) => handleHoverAndMouseOut(e)}
        status={currentFocusStatus}
        value={currentGraphInputValue}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={(e) => handleSearchBarOnChange(e)} />
      {id === 'graph-search' &&
        <SearchResultsWrapper
          visibility={resultsWrapperVisibilityStatus.toString()}>
          {graphSearchResults.map(item => {
            return (
              <SearchResultsItem
                id={`searchItem-${uuidv4()}`}
                key={uuidv4()}
                value={item.toString()}
                onClick={(e) => handleSearchItemOnClick(e)}>
                {item.toString()}
              </SearchResultsItem>
            )
          })
          }
          {graphSearchResults.length === 0 &&
            <div style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'}}>
              No Results to display
            </div>
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
