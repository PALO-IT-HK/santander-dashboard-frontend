import React from 'react'
import PropTypes from 'prop-types'
import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox'
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
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDZvxOHHY7Y6FPH1JwhgEE28YWSV7LHDV0&v=3.exp&libraries=visualization,geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `450px`, padding: `0px 10px 10px 10px`, zIndex: `1` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 52.232, lng: -0.233
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap)(props => {
  const { isMarkerShown, currentMarker, toggleMarkerLabelVisibilityAction, hideMarkerLabelAction,
          onMapMounted, center, onBoundsChanged, onSearchBoxMounted, bounds, onPlacesChanged } = props
  const handleMouseOver = e => toggleMarkerLabelVisibilityAction(e.Fa.target.title)
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
      defaultZoom={13}
      center={center}
      onBoundsChanged={onBoundsChanged}>

      <SearchBox
        ref={onSearchBoxMounted}
        bounds={bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={onPlacesChanged}>
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>
      
      <HeatmapLayer
        data={getPoints()}
        options={({ radius: '80' })} />

      {isMarkerShown &&
      <MarkerWithLabel
        title='marker1'
        position={{ lat: 52.232, lng: -0.2 }}
        labelAnchor={new google.maps.Point(0, 100)}
        labelStyle={markerLabelStyle}
        onMouseOver={(e) => handleMouseOver(e)}
        onMouseOut={() => hideMarkerLabelAction()}
        labelVisible={currentMarker === 'marker1' ? true : false}>
        <div>Craven Street Strand</div>
      </MarkerWithLabel>
      }
      {isMarkerShown &&
      <MarkerWithLabel
        title='marker2'
        position={{ lat: 52.232, lng: -0.182 }}
        labelAnchor={new google.maps.Point(0, 100)}
        labelStyle={markerLabelStyle}
        onMouseOver={(e) => handleMouseOver(e)}
        onMouseOut={() => hideMarkerLabelAction()}
        labelVisible={currentMarker === 'marker2' ? true : false}>
        <div>Westminster Street</div>
      </MarkerWithLabel>
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
