import { GeoJSON } from 'leaflet'
import GeoJSONAsset from '../../Asset/GeoJSONAsset'
import BaseLoaderStrategy from './BaseLoaderStrategy'
import JSDCLayerGroup from '../../CustomLayer/JSDCLayerGroup'

class GeoJSONLoaderStrategy extends BaseLoaderStrategy {
  load = async (asset: GeoJSONAsset) => {
    let layer: GeoJSON
    if (asset.isSourceObject()) {
      layer = new GeoJSON(asset.source as any)
    } else if (asset.isSourceUrl()) {
      const resp = await (await fetch(asset.source as string)).json()
      layer = new GeoJSON(resp)
    } else {
      const geoJSON = JSON.parse(asset.source as string)
      layer = new GeoJSON(geoJSON)
    }
    const jsdcLayerGroup = new JSDCLayerGroup(layer.getLayers())
    this.viewer.addLayer(jsdcLayerGroup)
    return jsdcLayerGroup
  }
}

export default GeoJSONLoaderStrategy
