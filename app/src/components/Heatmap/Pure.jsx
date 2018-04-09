import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer'

const markerLabelStyle = {
  width: '150px',
  height: '40px',
  borderRadius: '5px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
  padding: '10px 5px'
}

const Heatmap = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDZvxOHHY7Y6FPH1JwhgEE28YWSV7LHDV0&v=3.exp&libraries=visualization,geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px`, zIndex: `1` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const {
    isMarkerShown,
    currentMarker,
    toggleMarkerLabelVisibilityAction,
    hideMarkerLabelAction
  } = props
  const handleMouseOver = e =>
    toggleMarkerLabelVisibilityAction(e.Fa.target.title)
  const getPoints = () => {
    return [
      new google.maps.LatLng(52.232, -0.2),
      new google.maps.LatLng(52.228, -0.2),
      new google.maps.LatLng(52.225, -0.18),
      new google.maps.LatLng(52.222, -0.189),
      new google.maps.LatLng(52.222, -0.189),
      new google.maps.LatLng(52.24, -0.189),
      new google.maps.LatLng(52.235, -0.189),
      new google.maps.LatLng(52.23, -0.189),
      new google.maps.LatLng(52.23, -0.189)
    ]
  }
  return (
    <GoogleMap defaultZoom={13} defaultCenter={{ lat: 52.232, lng: -0.233 }}>
      <HeatmapLayer data={getPoints()} options={{ radius: '80' }} />

      {isMarkerShown && (
        <MarkerWithLabel
          title="marker1"
          position={{ lat: 52.232, lng: -0.2 }}
          labelAnchor={new google.maps.Point(0, 100)}
          labelStyle={markerLabelStyle}
          onMouseOver={e => handleMouseOver(e)}
          onMouseOut={() => hideMarkerLabelAction()}
          labelVisible={currentMarker === 'marker1' ? true : false}>
          <div>Craven Street Strand</div>
        </MarkerWithLabel>
      )}
      {isMarkerShown && (
        <MarkerWithLabel
          title="marker2"
          position={{ lat: 52.232, lng: -0.182 }}
          labelAnchor={new google.maps.Point(0, 100)}
          labelStyle={markerLabelStyle}
          onMouseOver={e => handleMouseOver(e)}
          onMouseOut={() => hideMarkerLabelAction()}
          labelVisible={currentMarker === 'marker2' ? true : false}>
          <div>Westminster Street</div>
        </MarkerWithLabel>
      )}
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
