import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components'
import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox'
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer'

// Images
import bikeImage from 'assets/img/bike.svg'

const markerLabelStyle = {
  width: '180px',
  height: 'auto',
  fontFamily: 'Rubik',
  letterSpacing: '0.8px',
  borderRadius: '5px',
  backgroundColor: '#f1f4f8',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
  textAlign: 'left',
  padding: '5px 5px 5px 5px',
  zIndex: '99'
}

const MarkerLabelContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Heatmap = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDZvxOHHY7Y6FPH1JwhgEE28YWSV7LHDV0&v=3.exp&libraries=visualization,geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, padding: `0px 10px 10px 10px`, zIndex: `1` }} />,
    mapElement: <div style={{ height: `450px` }} id='mapElement'/>,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 51.49614, lng: -0.135
        },
        zoom: 16,
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        // onBoundsChanged: () => {
        //   console.log('Bounds changed refs map ' + refs.map.getBounds())
        // },
        // onZoomChanged: () => {
        //   console.log('Zoom changed refs map ' + refs.map.getBounds())
        // },
        // onDragEnd: () => {
        //   console.log('Drag End changed refs map ' + refs.map.getBounds())
        // },
        onIdle: (getBikePointsActionSaga) => {
          const bounds = refs.map.getBounds()
          const swLat = bounds.getSouthWest().lat()
          const swLng = bounds.getSouthWest().lng()
          const neLat = bounds.getNorthEast().lat()
          const neLng = bounds.getNorthEast().lng()
          const payload = [swLat, swLng, neLat, neLng]
          getBikePointsActionSaga(payload)
        },
        // onSearchBoxMounted: ref => {
        //   refs.searchBox = ref;
        // },
        updateMapLocation: (placesArray) => {
          const bounds = new google.maps.LatLngBounds();
          console.log(placesArray)
          placesArray.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = placesArray.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
            zoom: 15
          });
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap)(props => {
  const { isMarkerShown, currentMarker, toggleMarkerLabelVisibilityAction, hideMarkerLabelAction,
          onMapMounted, center, zoom, onBoundsChanged, updateMapLocation, searchedLocation, withGoogleMap,
          onZoomChanged, onDragEnd, onIdle, mapInitialLoadStatus, getBikePointsActionSaga,
          currentBikePointsArray } = props

  // Get custom search bar element
  const input = document.getElementById('search-autocomplete')

  // Autocomplete Library to listen to places changed outside map
  const autocomplete = new google.maps.places.Autocomplete(input)
  const bounds = new google.maps.LatLngBounds()

  // Set search results bounds
  autocomplete.setComponentRestrictions({ country: ['uk'] })

  // Event listener for place changed
  autocomplete.addListener('place_changed', () => {
    const places = [autocomplete.getPlace()]
    updateMapLocation(places)
  })
  const handleOnIdle = () => {
    !mapInitialLoadStatus ? onIdle(getBikePointsActionSaga) : console.log('map initial load complete!')
  }
  const handleMouseOver = e => {
    const title = e.Fa.target.parentElement.title ?  e.Fa.target.parentElement.title : null
    toggleMarkerLabelVisibilityAction(title)
  }
  const getPoints = () => {
    return [
      new google.maps.LatLng(52.232, -0.2),
      new google.maps.LatLng(52.228, -0.2),
      new google.maps.LatLng(52.225, -0.18),
      new google.maps.LatLng(52.222, -0.189),
      new google.maps.LatLng(52.222, -0.189),
      new google.maps.LatLng(52.240, -0.189),
      new google.maps.LatLng(52.235, -0.189),
      new google.maps.LatLng(52.230, -0.189),
      new google.maps.LatLng(52.230, -0.189)
    ]
  }
  return (
    <GoogleMap
      ref={onMapMounted}
      zoom={zoom}
      center={center}
      onIdle={() => handleOnIdle()}
      onBoundsChanged={onBoundsChanged}
      onZoomChanged={onZoomChanged}
      onDragEnd={onDragEnd} >
      
      <HeatmapLayer
        data={getPoints()}
        options={({ radius: '80', dissipating: true })} />

      {currentBikePointsArray.map(item => {
        return (
          isMarkerShown &&
          <MarkerWithLabel
            title={item.id}
            key={item.id}
            icon={{url: 'https://thumb.ibb.co/cy5FMc/bike.png'}}
            position={{ lat: item.lat, lng: item.lon }}
            labelAnchor={new google.maps.Point(-10, 90)}
            labelStyle={markerLabelStyle}
            onMouseOver={(e) => handleMouseOver(e)}
            onMouseOut={() => hideMarkerLabelAction()}
            labelVisible={currentMarker === item.id ? true : false}>
            <div>
              <div style={{
                paddingBottom: '5px',
                fontWeight: '500',
                fontSize: '10px',
                color: '#354052'}}>
                {item.commonName}
              </div>
              <div style={{
                padding: '0',
                color: '#94a6bb',
                fontSize: '8px'}}>
                CURRENT STAT
              </div>
              <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row', 
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '0'}}>
                <div style={{
                  fontSize: '8px',
                  fontWeight: '500',
                  color: '#e63329',
                  paddingRight: '5px'
                }}>{`${item.NbBikes} BIKES FOR RENT`}</div>
                <div style={{
                  color: '#d5dfeb'
                }}>
                |
                </div>
                <div style={{
                  fontSize: '8px',
                  fontWeight: '500',
                  color: '#1dacbd',
                  paddingLeft: '5px'
                }}>{`${item.NbEmptyDocks} SPACES`}</div>
              </div>
            </div>
          </MarkerWithLabel>
        )
      })
      }

    </GoogleMap>
  )
})

Heatmap.defaultProps = {
  isMarkerShown: false
}

Heatmap.propTypes = {
  googleMapURL: PropTypes.string,
  loadingElement: PropTypes.element,
  containerElement: PropTypes.element,
  mapElement: PropTypes.element,
  isMarkerShown: PropTypes.bool
}

export default Heatmap
