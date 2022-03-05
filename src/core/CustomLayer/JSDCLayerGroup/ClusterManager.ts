import { Layer, MarkerClusterGroup } from 'leaflet'
import JSDCLayerGroup from './JSDCLayerGroup'
import ManagerInterface from './ManagerInterface'

class ClusterManager implements ManagerInterface {
  private _ref: JSDCLayerGroup
  private _clusterLayer: MarkerClusterGroup | undefined
  public _replacedlLayers: Array<Layer> = []
  constructor (ref: JSDCLayerGroup) {
    this._ref = ref
  }

  public get using () {
    return this._clusterLayer !== undefined
  }

  public use () {
    if (this.using) {
      console.warn('hotspot is already applied, maybe u want to update hotspot ?')
      return
    }
    const cluster = new MarkerClusterGroup()
    this._replacedlLayers = this._ref.getAllPointLikeLayers(this._ref.getLayers())
    this._replacedlLayers.forEach(layer => {
      this._ref.removeLayer(layer)
      cluster.addLayer(layer)
    })
    this._ref.addLayer(cluster)
    this._clusterLayer = cluster
  }

  public clear () {
    if (this.using) {
      this._ref.removeLayer(this._clusterLayer as MarkerClusterGroup)
      this._clusterLayer = undefined
      this._replacedlLayers.forEach(layer => this._ref.addLayer(layer))
    }
  }
}

export default ClusterManager
