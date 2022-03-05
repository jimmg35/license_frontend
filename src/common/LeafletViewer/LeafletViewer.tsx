import Leaflet, { MapOptions } from 'leaflet'
import React, { useEffect, useContext, useRef } from 'react'
import JSDCContext from '../JSDCContext'
import 'leaflet/dist/leaflet.css'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
import './LeafletViewer.scss'

const iconDefault = Leaflet.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})
Leaflet.Marker.prototype.options.icon = iconDefault

export interface ILeafletViewerProps extends MapOptions {
  id: string
  children?: React.ReactNode
}

const LeafletViewer = (props: ILeafletViewerProps) => {
  const {
    id,
    children
  } = props
  const viewerElem = useRef<HTMLDivElement>(null)
  const JSDC = useContext(JSDCContext)

  useEffect(() => {
    JSDC.createViewer(id)
  }, [])
  return (
    <div id={id} className="jsdc-map-viewer" ref={viewerElem}>
      {
        children
      }
    </div>
  )
}

export default LeafletViewer
