import React, { Component } from 'react'
import styled from 'styled-components'

const Wrap = styled.div`
  position: relative;
  margin: 0;
  width: 400px;
  max-width: 100%;
  padding: 8px;
`

const Tile = styled.div`
  border: 1px solid #CCC;
`

const Picture = styled.div`
  background-image: url(${props => props.imageUrl});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-color: #CCC;
  width: 100%;
  height: 0;
  padding-bottom: 75%;
`

const TextContent = styled.div`
  padding: 16px;
  color: #666;
`

const TileTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 16px 0;
`

const TileText = styled.div`
  font-size: 16px;
`

const Watermark = styled.div`
  padding: 4px;
  background: #666;
  text-align: right;
  font-size: 12px;
  color: #FFF;
  font-weight: bold;
`

class SampleReusableComponent extends Component {
  render () {
    const { imageUrl, title, text } = this.props

    return (
      <Wrap>
        <Tile>
          <Watermark>Sample Reusable Component</Watermark>
          <Picture imageUrl={imageUrl} />
          <TextContent>
            <TileTitle>
              {title}
            </TileTitle>
            <TileText>
              {text}
            </TileText>
          </TextContent>
        </Tile>
      </Wrap>
    )
  }
}

export default SampleReusableComponent
