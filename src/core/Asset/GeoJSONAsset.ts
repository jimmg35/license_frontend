import { AssetTypeMap } from '../types/Asset'
import BaseAsset, { BaseAssetConstructor } from './BaseAsset'

export interface GeoJSONAssetConstructor extends BaseAssetConstructor { }

class GeoJSONAsset extends BaseAsset {
  constructor (options: GeoJSONAssetConstructor) {
    super(options)
    this.type = AssetTypeMap.GEOJSON
  }
}

export default GeoJSONAsset
