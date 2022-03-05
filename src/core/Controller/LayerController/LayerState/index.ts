import { Map } from 'leaflet'
import { LayerBag } from '..'

class LayerState {
  private viewer: Map | undefined
  private bag: LayerBag
  private _show: boolean = true
  constructor (bag: LayerBag, viewer?: Map) {
    this.viewer = viewer
    this.bag = bag

    this._show = this.isLayerExist()
  }

  public setViewer (viewer: Map) {
    this.viewer = viewer
    this._show = this.isLayerExist()
  }

  public get info () {
    const asset = this.bag.asset
    return {
      id: asset.id,
      name: asset.name,
      group: asset.meta.group,
      type: asset.type,
      show: this.isLayerExist()
    }
  }

  public get show () {
    return this._show
  }

  public set show (goingToShow: boolean) {
    if (this.viewer) {
      if (this.isLayerExist()) {
        if (goingToShow) {
          return
        } else {
          this.viewer.removeLayer(this.bag.content)
        }
      } else {
        if (goingToShow) {
          this.viewer.addLayer(this.bag.content)
        } else {
          return
        }
      }
    }
    this._show = goingToShow
  }

  private isLayerExist () {
    if (this.viewer) {
      return this.viewer.hasLayer(this.bag.content)
    } else {
      return false
    }
  }
}

export default LayerState
