import { Map } from 'leaflet'
import BaseAsset from '../Asset/BaseAsset'
import { AssetTypeMap } from '../types/Asset'
import BaseLoaderStrategy from './Strategy/BaseLoaderStrategy'
import WMTSLoaderStrategy from './Strategy/WMTSLoaderStrategy'
import GeoJSONLoaderStrategy from './Strategy/GeoJSONLoaderStrategy'

class AssetLoader {
  viewer: Map
  constructor (viewer: Map) {
    this.viewer = viewer
  }

  public async load (asset: BaseAsset) {
    switch (asset.type) {
      case AssetTypeMap.WMTS:
        return await new WMTSLoaderStrategy(this.viewer).load(asset)
      case AssetTypeMap.GEOJSON:
        return await new GeoJSONLoaderStrategy(this.viewer).load(asset)
      default:
        console.warn(`asset type: ${asset.type} has not been implement yet`)
    }
  }

  public async loadByStrategy<T extends BaseLoaderStrategy> (asset: BaseAsset, strategy: T) {
    return await strategy.load(asset) as ReturnType<
      WMTSLoaderStrategy['load'] | WMTSLoaderStrategy['load']
      >
  }
}

export default AssetLoader
