import React from 'react'
import styled from 'styled-components'

const buttonTypeStyles = {
  primary: `
    background-color: #1F6EDA;
  `,
  secondary: `
    background-color: #FFFFFF;
    border: solid 1px #1F6EDA;
    `,
  primaryDisabled: `
    background-color: #999999;
  `,
  secondaryDisabled: `
    background-color: #FFFFFF;
    border: solid 1px #999999;
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
    color: #999999;
  `
}

const buttonSizeStyles = {
  large: `
    height: 42px;
    min-width: 120px;
    padding: 0 25px;
  `,
  medium: `
    height: 36px;
    min-width: 100px;
    padding: 0 20px;
  `,
  small: `
    height: 26px;
    min-width: 70px;
    padding: 0 15px;
  `
}

const textSizeStyles = {
  large: 'font-size: 16px;',
  medium: 'font-size: 16px;',
  small: 'font-size: 12px;'
}

const Button = styled.button`
  border-radius: 5px;
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
  const {type, size, disabled, children} = props
  return (
    <Button type={type} size={size} disabled={disabled}>
      <Text type={type} size={size} disabled={disabled}>
        {children}
      </Text>
    </Button>
  )
}

SButton.defaultProps = {
  type: 'primary',
  size: 'medium',
  onPress: () => null
}
