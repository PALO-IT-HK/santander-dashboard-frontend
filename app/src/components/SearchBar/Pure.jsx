import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs } from 'react-google-maps'
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox'

const SearchInputField = styled.input`
  ${({size}) => inputFieldSize[size]}
    padding: 5px 0px 10px 5px;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 2px dashed #1dacbd;
    color: #1dacbd;
    font-family: Abril Fatface;
    font-size: 30px;
  &::-webkit-input-placeholder {
    ${({status}) => status === 'focus' ? `opacity: 0.4;` : `opacity: 1;`}
    color: #1dacbd;
    font-family: Abril Fatface;
    font-size: 30px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: normal;
  }
`

const inputFieldSize = {
  small: `
    width: 600px;
    height: 32px;
    font-size: 12px;
  `,
  medium: `
    width: 600px;
    height: 40px;
    font-size: 14px;
  `,
  large: `
    width: 600px;
    height: 45px;
    font-size: 16px;
  `
}

const SearchBarWrapper = styled.div`
  height: 80px;
  width: 400px;
  padding: 10px 0px 0px 20px;
  
`

const SearchResultsDiv = styled.div`
  width: 400px;
  height: 250px;
  background-color: white;
  position: absolute;
  top: 165px;
  z-index: 99;
  overflow: auto;
`

const SearchResultsItemRow = styled.div`
  padding: 10px 20px 10px 20px;
  font-family: Rubik;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #516173;
  font-size: 14px;
  border-bottom: 1px solid #94a6bb;
  :hover {
    background-color: rgba(213, 223, 235, 0.5);
  }
`

const SearchBar = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDZvxOHHY7Y6FPH1JwhgEE28YWSV7LHDV0&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `500px` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          return places
        }
      })
    }
  }),
  withScriptjs)(props => {
    const {size, placeholder, name, type, onChange, value, changeInputFocusAction, 
           places, currentFocusStatus, onSearchBoxMounted, bounds, onPlacesChanged,
           updateMapLocationAction, searchedLocation} = props
    const handleFocusBlur = (e, changeInputFocusAction) => e.type === 'focus' ? changeInputFocusAction('focus') : changeInputFocusAction('blur')
    const handleInputOnChange = (e) => console.log(e.target.value)
    const handleClick = () => console.log('Row clicked!')
    const handleOnPlacesChanged = () => {
      const places = onPlacesChanged()
      updateMapLocationAction(places)
    }
    return (
      <SearchBarWrapper
        data-standalone-searchbox="">
        <StandaloneSearchBox
          ref={onSearchBoxMounted}
          bounds={bounds}
          onPlacesChanged={handleOnPlacesChanged}>
          <SearchInputField
            size={size}
            onFocus={(e) => handleFocusBlur(e, changeInputFocusAction)}
            onBlur={(e) => handleFocusBlur(e, changeInputFocusAction)}
            status={currentFocusStatus}
            value={value}
            type={type}
            placeholder={placeholder}
            name={name} />
        </StandaloneSearchBox>
        {searchedLocation.length !== 0 && 
        <SearchResultsDiv>
          {searchedLocation.map(({ place_id, formatted_address, geometry: { location } }) =>
          <SearchResultsItemRow
            key={place_id}
            onClick={() => handleClick()}>
            {formatted_address}
          </SearchResultsItemRow>)
          }
        </SearchResultsDiv>
        }
        {/* <ol>
          {places.map(({ place_id, formatted_address, geometry: { location } }) =>
            <li key={place_id}>
              {formatted_address}
              {" at "}
              ({location.lat()}, {location.lng()})
            </li>
          )}
        </ol> */}
      </SearchBarWrapper>
    )
  })

SearchBar.defaultProps = {
  size: 'medium',
  type: 'text',
  onChange: () => null,
  placeholder: 'search by dock / district'
}

SearchBar.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

export default SearchBar

// const SearchInputField = styled.input`
//   ${({size}) => inputFieldSize[size]}
//     padding: 5px 0px 15px 5px;
//     border-top: 0;
//     border-left: 0;
//     border-right: 0;
//     border-bottom: 2px dashed #1dacbd;
//     color: #1dacbd;
//     font-family: Abril Fatface;
//     font-size: 32px;
//   &::-webkit-input-placeholder {
//     ${({status}) => status === 'focus' ? `opacity: 0.5;` : `opacity: 1;`}
//     color: #1dacbd;
//     font-family: Abril Fatface;
//     font-size: 32px;
//     font-weight: normal;
//     font-style: normal;
//     font-stretch: normal;
//     line-height: normal;
//     letter-spacing: normal;
//   }
// `

// const SearchResultsDiv = styled.div`
//   width: 400px;
//   height: 250px;
//   background-color: white;
//   position: absolute;
//   top: 165px;
//   z-index: 99;
//   overflow: auto;
// `

// const inputFieldSize = {
//   small: `
//     width: 400px;
//     height: 32px;
//     font-size: 12px;
//   `,
//   medium: `
//     width: 400px;
//     height: 40px;
//     font-size: 14px;
//   `,
//   large: `
//     width: 400px;
//     height: 45px;
//     font-size: 16px;
//   `
// }

// const SearchBarWrapper = styled.div`
//   padding-left: 20px;
// `

// const SearchResultsItemRow = styled.div`
//   padding: 10px 20px 10px 20px;
//   font-family: Rubik;
//   font-weight: 500;
//   font-style: normal;
//   font-stretch: normal;
//   line-height: normal;
//   letter-spacing: normal;
//   text-align: left;
//   color: #516173;
//   font-size: 14px;
//   border-bottom: 1px solid #94a6bb;
//   :hover {
//     background-color: rgba(213, 223, 235, 0.5);
//   }
// `

// const handleFocusBlur = (e, changeInputFocusAction) => {
//   e.type === 'focus' ? changeInputFocusAction('focus') : changeInputFocusAction('blur')
// }

// const SearchBar = props => {
//   const {size, placeholder, name, type, onChange, value, changeInputFocusAction, currentFocusStatus} = props
//   return (
//     <SearchBarWrapper>
//         <SearchInputField
//           size={size}
//           onChange={onChange}
//           onFocus={(e) => handleFocusBlur(e, changeInputFocusAction)}
//           onBlur={(e) => handleFocusBlur(e, changeInputFocusAction)}
//           status={currentFocusStatus}
//           value={value}
//           type={type}
//           placeholder={placeholder}
//           name={name} />
      // <SearchResultsDiv>
      //   <SearchResultsItemRow>All docks in London</SearchResultsItemRow>
      // </SearchResultsDiv>
//     </SearchBarWrapper>
//   )
// }

// SearchBar.defaultProps = {
//   size: 'medium',
//   type: 'text',
//   onChange: () => null,
//   placeholder: 'search by dock / district'
// }

// SearchBar.propTypes = {
//   size: PropTypes.string,
//   type: PropTypes.string,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   disabled: PropTypes.bool,
//   onChange: PropTypes.func.isRequired,
//   placeholder: PropTypes.string
// }

// export default SearchBar