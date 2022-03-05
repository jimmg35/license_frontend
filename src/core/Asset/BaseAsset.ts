import { isObject, isString } from 'lodash'
import isURL from 'validator/lib/isURL'

export type BaseAssetConstructor = {
  id: string
  type?: string
  name: string
  /** url or data like geojson */
  source: string | Object
  meta?: {[k: string]: any}
}

abstract class BaseAsset {
  id: string
  name: string
  type?: string
  source: string | Object
  meta: {[k: string]: any}
  constructor (options: BaseAssetConstructor) {
    this.id = options.id
    this.name = options.name
    this.type = options.type
    this.source = options.source
    this.meta = options.meta || {}
  }

  public isSourceUrl () {
    if (isString(this.source)) {
      return isURL(this.source)
    }
  }

  public isSourceObject () {
    return isObject(this.source)
  }
}

export default BaseAsset
