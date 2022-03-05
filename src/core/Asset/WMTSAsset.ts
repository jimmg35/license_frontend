import { AssetTypeMap } from '../types/Asset'
import BaseAsset, { BaseAssetConstructor } from './BaseAsset'

export interface WMTSAssetConstructor extends BaseAssetConstructor { }

class WMTSAsset extends BaseAsset {
  constructor (options: WMTSAssetConstructor) {
    super(options)
    this.type = AssetTypeMap.WMTS
  }
}

export default WMTSAsset
