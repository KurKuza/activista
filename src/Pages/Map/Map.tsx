import React from 'react'
import { MapBox } from './mapBox'

function MapIframe() {
  return (
    <MapBox>
      <iframe
        title="map"
        src="https://www.google.com/maps/d/u/0/embed?mid=1Scfu8Po4sbt9sZB4YWDg-4CUKQcumLPv&ehbc=2E312F"
        width="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 'inherit',
        }}
      />
    </MapBox>
  )
}

export default MapIframe
