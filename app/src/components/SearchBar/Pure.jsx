import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const placeholderOpacity = {
  opacity: `1`
}

const SearchInputField = styled.input`
  ${({size}) => inputFieldSize[size]}
    padding: 5px 0px 15px 5px;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 2px dashed #1dacbd;
    color: #1dacbd;
    font-family: Abril Fatface;
    font-size: 32px;
  &::-webkit-input-placeholder {
    ${({status}) => status === 'focus' ? `opacity: 0.5;` : `opacity: 1;`}
    color: #1dacbd;
    font-family: Abril Fatface;
    font-size: 32px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
  }
`

const SearchResultsDiv = styled.div`
  width: 200px;
  height: 150px;
  background-color: red;
  position: absolute;
  top: 160px;
  z-index: 99;
`

const focusBlurStyles = {
  focus: {
    opacity: '0.5'
  },
  blur: {
    opacity: '0.2'
  }
}

const inputFieldSize = {
  small: `
    width: 400px;
    height: 32px;
    font-size: 12px;
  `,
  medium: `
    width: 400px;
    height: 40px;
    font-size: 14px;
  `,
  large: `
    width: 400px;
    height: 45px;
    font-size: 16px;
  `
}

const SearchBarWrapper = styled.div`
  padding-left: 20px;
`

const handleFocusBlur = (e, changeInputFocusAction, currentFocusStatus) => {
  e.type === 'focus' ? changeInputFocusAction('focus') : changeInputFocusAction('blur')
}

const SearchBar = props => {
  const {size, placeholder, name, type, onChange, value, changeInputFocusAction, currentFocusStatus} = props
  return (
    <SearchBarWrapper>
        <SearchInputField
          size={size}
          onChange={onChange}
          onFocus={(e) => handleFocusBlur(e, changeInputFocusAction, currentFocusStatus)}
          onBlur={(e) => handleFocusBlur(e, changeInputFocusAction, currentFocusStatus)}
          status={currentFocusStatus}
          value={value}
          type={type}
          placeholder={placeholder}
          name={name} />
      <SearchResultsDiv />
    </SearchBarWrapper>
  )
}

SearchBar.defaultProps = {
  size: 'medium',
  type: 'text',
  onChange: () => null,
  placeholder: 'search by dock / district'
}

SearchBar.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

export default SearchBar