
class Event<T> {
  private _listeners: Array<(data: T) => void> = []

  addEventListener (fn: (data: T) => void) {
    this._listeners.push(fn)
  }

  removeEventListener (fn: (data: T) => void) {
    this._listeners = this._listeners.filter(e => e === fn)
  }

  raise (data: T) {
    for (const event of this._listeners) {
      event(data)
    }
  }
}

export default Event
