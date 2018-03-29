import { css } from 'styled-components'

const sizes = {
  lg: 1280,
  md: 1024,
  sm: 768,
  xs: 480
}

// Iterate through the sizes and create a media template
const mediaMaxWidth = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${(sizes[label] - 1) / 16}em) {
      ${css(...args)}
    }
    `
  return acc
}, {})

const mediaMinWidth = Object.keys(sizes).reduce((acc, label) => {
  acc['gt-' + label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
    `
  return acc
}, {})

export const media = {...mediaMinWidth, ...mediaMaxWidth}

export const primaryColor = '#ffff00'
