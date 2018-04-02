import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const buttonTypeStyles = {
  primary: `
    background-color: #D54435;
    border: 1px solid #D54435;
  `,
  secondary: `
    background-color: #D54435;
    border: 1px solid #D54435;
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
    color: #1F6EDA;
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
  large: 'font-size: 16px;',
  medium: 'font-size: 16px;',
  small: 'font-size: 12px;'
}

const Button = styled.button`
  border-radius: 30px;
  align-items: center;
  justify-content: center;

  ${({type, size, disabled}) => {
    const buttonType = disabled ? `${type}Disabled` : type
    return buttonSizeStyles[size] + buttonTypeStyles[buttonType]
  }};
  `

const Text = styled.h3`
  margin: 0 auto;
  ${({type, size, disabled}) => {
    const buttonType = disabled ? `${type}Disabled` : type
    return textTypeStyles[buttonType] + textSizeStyles[size]
  }};
  `

export default function SButton (props) {
  const {type, size, onClick, disabled, children} = props
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
