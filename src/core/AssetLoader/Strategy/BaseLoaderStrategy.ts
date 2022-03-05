import { Map } from 'leaflet'
import BaseAsset from '../../Asset/BaseAsset'

abstract class BaseLoaderStrategy {
  viewer: Map
  constructor (viewer: Map) {
    this.viewer = viewer
  }

  public load (asset: BaseAsset) { return new Promise(resolve => resolve({})) }
}

export default BaseLoaderStrategy
