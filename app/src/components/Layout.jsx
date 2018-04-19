import styled from 'styled-components'

export const StdContentCentered = styled.div`
  width: 1200px;
  max-width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
`

export const StdWrapperFlexContentCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const StdWrapperFlexContentLeft = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
`

export const StdWrapperFlexContentRight = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  align-items: flex-end;
`
