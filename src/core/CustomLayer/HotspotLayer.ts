import { Circle, CircleMarker, LatLng, GeoJSON, heatLayer, LayerGroup, Marker } from 'leaflet'

type HotspotValidLayerType = Marker | Circle | CircleMarker

class HotspotLayer {
  static fromLayers (layers: Array<HotspotValidLayerType>, radius: number) {
    const latLngs = layers.map(layer => layer.getLatLng())
    return heatLayer(latLngs, { radius })
  }

  static fromLayerGroup (layerGroup: LayerGroup | GeoJSON, radius: number) {
    const latLngs: Array<LatLng> = []
    layerGroup.eachLayer(layer => {
      if (layer instanceof Marker || layer instanceof Circle || layer instanceof CircleMarker) {
        latLngs.push(layer.getLatLng())
      }
    })
    return heatLayer(latLngs, { radius })
  }
}

export default HotspotLayer
