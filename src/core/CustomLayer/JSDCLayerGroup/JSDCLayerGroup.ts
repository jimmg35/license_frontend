import { Circle, CircleMarker, Layer, LayerGroup, LayerOptions, Map, Marker } from 'leaflet'
import ClusterManager from './ClusterManager'
import HotspotManager from './HotspotManager'

class JSDCLayerGroup extends LayerGroup {
  private _viewer: Map | undefined
  public cluster: ClusterManager
  public hotspot: HotspotManager
  constructor (layers?: Layer[], options?: LayerOptions) {
    super(layers, options)

    this.cluster = new ClusterManager(this)
    this.hotspot = new HotspotManager(this)
  }

  public get show () {
    return this._map.hasLayer(this)
  }

  public set show (goingToShow: boolean) {
    if (this.viewerHasThisLayer()) {
      if (!goingToShow) {
        this._viewer = this._map
        this._map.removeLayer(this)
      }
    } else {
      if (goingToShow) {
        this._viewer?.addLayer(this)
      }
    }
  }

  private viewerHasThisLayer () {
    const viewer = this._viewer || this._map
    return viewer.hasLayer(this)
  }

  public getAllPointLikeLayers (layers: Array<Layer>) {
    const result: Array<Marker | Circle | CircleMarker> = []
    layers.forEach(layer => {
      if (layer instanceof Marker || layer instanceof Circle || layer instanceof CircleMarker) {
        result.push(layer)
      }
    })
    return result
  }
}

export default JSDCLayerGroup
