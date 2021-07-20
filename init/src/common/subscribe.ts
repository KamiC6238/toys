type EventCallback = Function[]

type Events = {
  [type: string]: EventCallback
}

export class PublishSubscribe {
  private events: Events = {}

  subscribe (type: string, callback: Function) {
    if (this.events[type]) {
      this.events[type].push(callback)
    } else {
      this.events[type] = [callback]
    }
  }

  publish (type: string) {
    if (this.events[type]) {
      this.events[type].forEach(callback => {
        try {
          callback()
        } catch (error: any) {
          throw new Error(`callback excute error: ${error}`)
        }
      })
    }
  }

  once (type: string, callback: Function) {
    const _callback = () => {
      callback()

      this.unsubsribe(type, _callback)
    }
    this.subscribe(type, _callback)
  }

  unsubsribe (type?: string, callback?: Function) {
    if (!type) {
      this.events = {}
      return
    }
    if (type && !callback) {
      delete this.events[type]
      return
    } 
    if (this.events[type]) {
      const callbackIndex = this.events[type].findIndex(cb => cb === callback)

      if (callbackIndex !== -1) {
        this.events[type].splice(callbackIndex, 1)
      }
      if (this.events[type].length === 0) {
        delete this.events[type]
      }
    }
  }
}