import { TileLayer, GeoJSON, Map, Layer } from 'leaflet'
import { Event } from '../../../utils'
import BaseAsset from '../../Asset/BaseAsset'
import LayerState from './LayerState'
import HotspotLayer from '../../CustomLayer/HotspotLayer'
console.log(HotspotLayer)
export type LayerBag = {
  content: TileLayer | GeoJSON<any> | Layer
  asset: BaseAsset
}

export interface AddedEvent extends LayerBag {

}

class LayerController {
  viewer: Map | undefined
  hashMap: { [k: string]: LayerBag } = {}
  addedEvent: Event<AddedEvent> = new Event<AddedEvent>()
  removedEvent: Event<AddedEvent> = new Event<AddedEvent>()
  updatedEvent: Event<AddedEvent> = new Event<AddedEvent>()
  constructor (viewer?: Map) {
    this.viewer = viewer
    this.addedEvent.addEventListener((e) => {
      console.log(e)
    })
  }

  public setViewer (viewer: Map) {
    this.viewer = viewer
  }

  public listAll () {
    const bags = Object.values(this.hashMap)
    const states = bags.map(bag => new LayerState(bag, this.viewer))
    return states
  }

  public listAllKeys () {
    return Object.keys(this.hashMap)
  }

  public get (key: string) {
    if (this.isKeyExist(key)) {
      return this.hashMap[key]
    }
  }

  public add (key: string, layerBag: LayerBag) {
    if (this.isKeyExist(key)) {
      console.warn(`key: ${key} already exist, this execution will be ignored`)
      return
    }
    this.hashMap[key] = layerBag
    this.addedEvent.raise(layerBag)
    this.updatedEvent.raise(layerBag)
  }

  public removeFromControll (key: string) {
    if (this.isKeyExist(key)) {
      const target = this.get(key) as LayerBag
      delete this.hashMap[key]
      this.removedEvent.raise(target)
      this.updatedEvent.raise(target)
    }
  }

  public removeFromMap (key: string) {
    const target = this.get(key)
    if (target && this.viewer) {
      this.viewer.removeLayer(target?.content)
      this.removeFromControll(key)
    }
  }

  public isKeyExist (key: string) {
    return this.hashMap[key] !== undefined
  }
}

export default LayerController
