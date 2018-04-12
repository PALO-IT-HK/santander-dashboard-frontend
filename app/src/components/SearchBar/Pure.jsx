import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SearchInputField = styled.input`
  ${({size}) => inputFieldSize[size]}
    padding: 5px 0px 10px 5px;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 2px dashed #1dacbd;
    color: #1dacbd;
    font-family: Abril Fatface;
    font-size: 30px;
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
    height: 32px;
    font-size: 12px;
  `,
  medium: `
    width: 600px;
    height: 40px;
    font-size: 14px;
  `,
  large: `
    width: 600px;
    height: 45px;
    font-size: 16px;
  `
}

const SearchBarWrapper = styled.div`
  height: 80px;
  width: 400px;
  padding: 10px 0px 0px 20px;

`

const SearchBar = props => {
  const {size, placeholder, name, type, value, changeInputFocusAction, currentFocusStatus} = props
  const handleFocusBlur = (e, changeInputFocusAction) => e.type === 'focus' ? changeInputFocusAction('focus') : changeInputFocusAction('blur')
  return (
    <SearchBarWrapper>
      <SearchInputField
        id='search-autocomplete'
        size={size}
        onFocus={(e) => handleFocusBlur(e, changeInputFocusAction)}
        onBlur={(e) => handleFocusBlur(e, changeInputFocusAction)}
        status={currentFocusStatus}
        value={value}
        type={type}
        placeholder={placeholder}
        name={name} />
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
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string
}

export default SearchBar
