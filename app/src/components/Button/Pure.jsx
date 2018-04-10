import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const buttonTypeStyles = {
  primary: `
    background-color: #D54435;
    border: 1px solid #D54435;
  `,
  secondary: `
    background-color: #A8AAB6;
    border: 1px solid #A8AAB6;
    `,
  primaryDisabled: `
    background-color: #A8AAB6;
    border: 1px solid #A8AAB6;
  `,
  secondaryDisabled: `
    background-color: #A8AAB6;
    border: 1px solid #A8AAB6;
  `
}

const textTypeStyles = {
  primary: `
    color: #FFFFFF;
  `,
  secondary: `
    color: #FFFFFF;
  `,
  primaryDisabled: `
    color: #FFFFFF;
  `,
  secondaryDisabled: `
    color: #FFFFFF;
  `
}

const buttonSizeStyles = {
  large: `
    height: 42px;
    min-width: 140px;
    padding: 0 25px;
  `,
  medium: `
    height: 36px;
    min-width: 120px;
    padding: 0 20px;
  `,
  small: `
    height: 26px;
    min-width: 80px;
    padding: 0 15px;
  `
}

const textSizeStyles = {
  large: `
    font-size: 14px;
  `,
  medium: `
    font-size: 10px;
  `,
  small: `
    font-size: 8px;
    `
}

const Button = styled.button`
  border-radius: 3px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 0.2rem;
  ${({ type, size, disabled }) => {
    const buttonType = disabled ? `${type}Disabled` : type
    return buttonSizeStyles[size] + buttonTypeStyles[buttonType]
  }};
`

const Text = styled.h3`
  font-family: 'Rubik', sans-serif;
  margin: 0 auto;
  cursor: pointer;
  letter-spacing: 1px;
  font-weight: 100;
  text-transform: uppercase;
  ${({ type, size, disabled }) => {
    const buttonType = disabled ? `${type}Disabled` : type
    return textTypeStyles[buttonType] + textSizeStyles[size]
  }};
`

const SButton = props => {
  const { type, size, onClick, disabled, children } = props
  return (
    <Button type={type} size={size} onClick={onClick} disabled={disabled}>
      <Text type={type} size={size} disabled={disabled}>
        {children}
      </Text>
    </Button>
  )
}

SButton.defaultProps = {
  type: 'primary',
  size: 'medium',
  onClick: () => null
}

SButton.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default SButton
