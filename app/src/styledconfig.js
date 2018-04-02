import { css } from 'styled-components'

const sizes = {
  desktop: 1280,
  mobile: 600
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
