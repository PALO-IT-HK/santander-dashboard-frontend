import React, { Component } from 'react'
import styled from 'styled-components'

import { StdContentCentered } from 'components/Layout'
import SampleReusableComponent from 'components/SampleReusableComponent'

const Wrap = styled.div`
  margin: 0;
  min-height: calc(100vh - 100px);
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`

const BodyWrap = styled.div`
  flex: 1;
  height: 100%;
`

const SampleTiles = styled.div`
  padding: 32px 0;
  margin: 0 -8px;
  display: flex;
  flex-direction: row;
  align-items: top;
`

class Home extends Component {
  render () {
    const { introMessage, tileContents } = this.props

    return (
      <Wrap>
        <BodyWrap>
          <StdContentCentered>
            <h1>{introMessage}</h1>
            <SampleTiles>
              {tileContents.map((content, i) => (
                <SampleReusableComponent key={i} {...content} />
              ))}
            </SampleTiles>
          </StdContentCentered>
        </BodyWrap>
      </Wrap>
    )
  }
}

export default Home
