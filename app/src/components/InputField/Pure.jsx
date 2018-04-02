import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Input = styled.input`
  ${({size}) => inputSize[size]}
  border-radius: 30px;
  padding: 0 10px;
  border: 1px solid #D54435;
  background-color: #D54435;
  color: #080E40;
  &::-webkit-input-placeholder {
    color: #353F50;
  }
`

const inputSize = {
  small: `
    width: 150px;
    height: 32px;
    font-size: 12px;
  `,
  medium: `
    width: 200px;
    height: 36px;
    font-size: 14px;
  `,
  large: `
    width: 240px;
    height: 40px;
    font-size: 16px;
  `
}

export default function InputField (props) {
  const {size, placeholder, name, type, onChange, value} = props
  return (
    <Input
      size={size}
      onChange={onChange}
      value={value}
      type={type}
      placeholder={placeholder}
      name={name} />
  )
}

InputField.defaultProps = {
  size: 'medium',
  type: 'text',
  onChange: () => null,
  placeholder: 'Search Location'
}

InputField.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}
