import { TileLayer } from 'leaflet'
import WMTSAsset from '../../Asset/WMTSAsset'
import BaseLoaderStrategy from './BaseLoaderStrategy'

class WMTSLoaderStrategy extends BaseLoaderStrategy {
  load = async (asset: WMTSAsset) => {
    const layer = new TileLayer(asset.source as string, { id: asset.id })
    this.viewer.addLayer(layer)
    return layer
  }
}

export default WMTSLoaderStrategy
