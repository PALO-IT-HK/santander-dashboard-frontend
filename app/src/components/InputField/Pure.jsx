import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Input = styled.input`
  width: 20%;
  height: 32px;
  border-radius: 30px;
  padding: 0 10px;
  border: 1px solid #D54435;
  background-color: #D54435;
  color: #080E40;
  font-size: 16px;
  &::-webkit-input-placeholder {
    color: #353F50;
  }
`

export default function InputField (props) {
  const {placeholder, name, onChange, value} = props
  return (
    <Input
      onChange={onChange}
      value={value}
      type='text'
      placeholder={placeholder}
      name={name} />
  )
}

InputField.defaultProps = {
  onChange: () => null,
  placeholder: 'Seach Location'
}

InputField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}
