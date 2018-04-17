import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { compose, withProps, lifecycle } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps'
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel'
import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer'

const markerLabelStyle = {
  width: '180px',
  height: 'auto',
  fontFamily: 'Rubik',
  letterSpacing: '0.8px',
  backgroundColor: '#f1f4f8',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
  textAlign: 'left',
  padding: '5px',
  zIndex: '99'
}

const Heatmap = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBvNDpxJtaSm1gz28pSnOdi86k_UmVqyLw&v=3.exp&libraries=visualization,geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, padding: `0px 10px 10px 10px`, zIndex: `1` }} />,
    mapElement: <div style={{ height: `100%` }} id='mapElement' /> }),
  lifecycle({
    componentWillMount () {
      const refs = {}
      this.setState({
        bounds: null,
        center: { lat: 51.49614, lng: -0.135 },
        zoom: 16,
        markers: [],
        onMapMounted: ref => {
          refs.map = ref
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
        onIdle: (getBikePointsActionSaga, getHeatmapPointsActionSaga, updateMapBoundsAction,
          fromDate, toDate, timeFrom, timeTo) => {
          const bounds = refs.map.getBounds()
          const swLat = bounds.getSouthWest().lat()
          const swLng = bounds.getSouthWest().lng()
          const neLat = bounds.getNorthEast().lat()
          const neLng = bounds.getNorthEast().lng()
          const boundsObj = {
            ne: { neLat: neLat, neLng: neLng },
            sw: { swLat: swLat, swLng: swLng }
          }
          // const payload = [swLat, swLng, neLat, neLng, fromDate, toDate]
          const payload = {
            ne: {
              neLat: neLat,
              neLng: neLng
            },
            sw: {
              swLat: swLat,
              swLng: swLng
            },
            date: {
              fromDate: fromDate,
              toDate: toDate
            },
            time: {
              timeFrom: timeFrom,
              timeTo: timeTo
            }
          }
          updateMapBoundsAction(boundsObj)
          getBikePointsActionSaga(payload)
          getHeatmapPointsActionSaga(payload)
        },
        // onSearchBoxMounted: ref => {
        //   refs.searchBox = ref;
        // },
        updateMapLocation: (placesArray) => {
          const bounds = new window.google.maps.LatLngBounds()
          placesArray.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          })
          const nextMarkers = placesArray.map(place => ({
            position: place.geometry.location
          }))
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center)

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
            zoom: 15
          })
        }
      })
    }
  }),
  withScriptjs,
  withGoogleMap)(props => {
    const { isMarkerShown, currentMarker, toggleMarkerLabelVisibilityAction, hideMarkerLabelAction,
    onMapMounted, center, zoom, onBoundsChanged, updateMapLocation, onZoomChanged,
    onDragEnd, onIdle, mapInitialLoadStatus, getBikePointsActionSaga, currentBikePointsArray,
    bikeUsageHistoryDataArray, getHeatmapPointsActionSaga, fromDate, toDate, timeFrom, timeTo,
    updateMapBoundsAction } = props

  // Get custom search bar element
    const input = document.getElementById('search-autocomplete')

  // Autocomplete Library to listen to places changed outside map
    const autocomplete = new window.google.maps.places.Autocomplete(input)

  // Set search results bounds
    autocomplete.setComponentRestrictions({ country: ['uk'] })

  // Event listener for place changed
  autocomplete.addListener('place_changed', () => {
    const places = [autocomplete.getPlace()]
    updateMapLocation(places)
  })
  const handleOnIdle = () => {
    !mapInitialLoadStatus ? onIdle(getBikePointsActionSaga, getHeatmapPointsActionSaga, updateMapBoundsAction, fromDate, toDate, timeFrom, timeTo) : console.log('map initial load complete!')
  }
  const handleMouseOver = e => {
    // const title = e.Fa.target.parentElement.title ? e.Fa.target.parentElement.title : null
    const title = e.Ia.path !== undefined ? e.Ia.path[1].title : null
    console.log(e.Ia.path[1].title)
    toggleMarkerLabelVisibilityAction(title)
  }
  const getPoints = () => {
    return bikeUsageHistoryDataArray.reduce((acc, curr) => {
      const lat = parseFloat(curr.lat)
      const lng = parseFloat(curr.lng)
      const pointWeight = curr.totalBikesOut / 1000
      const finalValueToEval = curr.totalBikesOut / 1000 < 1.5
        ? new window.google.maps.LatLng(lat, lng)
        : { location: new window.google.maps.LatLng(lat, lng), weight: pointWeight }
      return [
        ...acc,
        finalValueToEval
      ]
    }, [])
  }
  return (
    <GoogleMap
      ref={onMapMounted}
      zoom={zoom}
      center={center}
      onIdle={() => handleOnIdle()}
      onBoundsChanged={onBoundsChanged}
      onZoomChanged={onZoomChanged}
      onDragEnd={onDragEnd}>

        <HeatmapLayer
          data={getPoints()}
          options={({ radius: '100', dissipating: true })} />

        {currentBikePointsArray.map(item => {
          return (
          isMarkerShown &&
          <MarkerWithLabel
            title={item.id}
            key={item.id}
            icon={{url: 'https://thumb.ibb.co/cy5FMc/bike.png'}}
            position={{ lat: item.lat, lng: item.lon }}
            labelAnchor={new window.google.maps.Point(80, -10)}
            labelStyle={markerLabelStyle}
            onMouseOver={(e) => handleMouseOver(e)}
            onMouseOut={() => hideMarkerLabelAction()}
            labelVisible={currentMarker === item.id ? true : false}
            zIndex={1}>
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
