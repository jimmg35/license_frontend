import { Map, MapOptions } from 'leaflet'
import { defaults } from 'lodash'
import { ViewerTask } from './Viewer'
import AssetLoader from './AssetLoader'
import BaseAsset from './Asset/BaseAsset'
import BaseLoaderStrategy from './AssetLoader/Strategy/BaseLoaderStrategy'
import LayerController from './Controller/LayerController'

import 'leaflet.heat'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'

class JSDC {
  private _viewer: Map | undefined
  private ViewerTask: ViewerTask = new ViewerTask()
  public LayerController: LayerController = new LayerController()

  public get viewer () {
    return this.ViewerTask.promise()
  }

  createViewer (element: string | HTMLElement, options?: MapOptions) {
    const _option = defaults(options, {
      center: [24.86471, 121.29002],
      zoom: 13
    })

    this._viewer = new Map(element, _option)
    this.ViewerTask.setViewer(this._viewer)
    this.LayerController.setViewer(this._viewer)
    return this._viewer
  }

  public async loadAsset (asset: BaseAsset) {
    const viewer = await this.viewer
    const layer = await new AssetLoader(viewer).load(asset)
    if (layer) {
      this.LayerController.add(asset.id, {
        content: layer,
        asset
      })
    }
    return layer
  }

  public async loadAssetByStrategy (asset: BaseAsset, Strategy: { new(viewer: Map): BaseLoaderStrategy }) {
    const viewer = await this.viewer
    const layer = await new AssetLoader(viewer).loadByStrategy(asset, new Strategy(viewer))
    if (layer) {
      this.LayerController.add(asset.id, {
        content: layer,
        asset
      })
    }
  }
}

export default new JSDC()
