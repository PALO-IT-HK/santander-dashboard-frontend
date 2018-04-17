import React from 'react'
import styled, { keyframes } from 'styled-components'

const ProgressContainer = styled.div`
  position: absolute;
  /* transform: translate(-50%, 50%); */
  top: 0;
  left: 0;
`

const Progress = styled.div`
background-color: rgb(255,255,255);
height: 0.25em;
position: relative;
width: 100vw;
`

const cssLoadWidth = keyframes`
0%, 100% {
  transition-timing-function: cubic-bezier(1, 0, 0.65, 0.85);
}
0% {
  width: 0;
}
100% {
  width: 100%;
}
`

const ProgressBar = styled.div`
background-size: 69em 0.25em;
height: 100%;
position: relative;
background-image: linear-gradient(to right, rgb(29,173,189), rgb(29,173,189), rgba(29,173,189,0.95), rgb(29,173,189), rgb(29,173,189), rgb(29,173,189));
/* background-image: -o-linear-gradient(to right, rgb(29,173,189), rgb(29,173,189), rgba(29,173,189,0.95), rgb(29,173,189), rgb(29,173,189), rgb(29,173,189));
background-image: -ms-linear-gradient(to right, rgb(29,173,189), rgb(29,173,189), rgba(29,173,189,0.95), rgb(29,173,189), rgb(29,173,189), rgb(29,173,189));
background-image: -webkit-linear-gradient(to right, rgb(29,173,189), rgb(29,173,189), rgba(29,173,189,0.95), rgb(29,173,189), rgb(29,173,189), rgb(29,173,189));
background-image: -moz-linear-gradient(to right, rgb(29,173,189), rgb(29,173,189), rgba(29,173,189,0.95), rgb(29,173,189), rgb(29,173,189), rgb(29,173,189)); */
animation: ${cssLoadWidth} 1.35s cubic-bezier(0.45, 0, 1, 1) infinite;
/* -o-animation: cssload-width 1.35s cubic-bezier(0.45, 0, 1, 1) infinite;
-ms-animation: cssload-width 1.35s cubic-bezier(0.45, 0, 1, 1) infinite;
-webkit-animation: cssload-width 1.35s cubic-bezier(0.45, 0, 1, 1) infinite;
-moz-animation: cssload-width 1.35s cubic-bezier(0.45, 0, 1, 1) infinite; */
`

export default function LoadingBar (props) {
  return (
    <ProgressContainer>
      <Progress>
        <ProgressBar />
      </Progress>
    </ProgressContainer>
  )
}
