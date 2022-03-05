import { heatLayer, HeatLayer } from 'leaflet'
import JSDCLayerGroup from './JSDCLayerGroup'
import ManagerInterface from './ManagerInterface'

class HotspotManager implements ManagerInterface {
  private _ref: JSDCLayerGroup
  private _hotspotLayer: HeatLayer | undefined
  constructor (ref: JSDCLayerGroup) {
    this._ref = ref
  }

  public get using () {
    return this._hotspotLayer !== undefined
  }

  public use (radius: number) {
    if (this.using) {
      console.warn('hotspot is already applied, maybe u want to update hotspot ?')
      return
    }

    let latLngs = this._ref.getAllPointLikeLayers(this._ref.getLayers()).map(layer => layer.getLatLng())
    if (this._ref.cluster.using) {
      latLngs = latLngs.concat(
        this._ref.getAllPointLikeLayers(
          this._ref.cluster._replacedlLayers
        ).map(layer => layer.getLatLng())
      )
    }
    this._hotspotLayer = heatLayer(latLngs, { radius })
    this._ref.addLayer(this._hotspotLayer)
    return this._hotspotLayer
  }

  public clear () {
    if (this.using) {
      this._ref.removeLayer(this._hotspotLayer as HeatLayer)
      this._hotspotLayer = undefined
    }
  }
}

export default HotspotManager
