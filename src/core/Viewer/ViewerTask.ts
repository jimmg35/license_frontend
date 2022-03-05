import { Map } from 'leaflet'

type Task = (viewer: Map) => void

export default class ViewerTask {
  private _viewer: Map | undefined
  private _stack: Array<Task>
  constructor (viewer?: Map) {
    this._viewer = viewer
    this._stack = []
  }

  public setViewer (viewer: Map) {
    this._viewer = viewer
    this._stack.forEach(task => task(viewer))
    this._stack = []
  }

  private addTask (task: Task) {
    if (this._viewer instanceof Map) {
      task(this._viewer)
    } else {
      this._stack.push(task)
    }
  }

  public promise () {
    return new Promise<Map>(resolve => {
      this.addTask(viewer => resolve(viewer))
    })
  }
}
