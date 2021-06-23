enum PromiseStatus {
  Pending = 'pending',
  FulFilled = 'fulfilled',
  Rejected = 'rejected'
}

type OnFulFilled<T = any> = (data: T) => any
type OnRejected<T = any> = (error: T) => any

type Executor1 = () => any
type Executor2<T = any> = (resolve: OnFulFilled<T>, reject: OnRejected<T>) => void
type Executor<T = any> = Executor1 | Executor2<T>

export class Promise {
  constructor (executor: Executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  private status = PromiseStatus.Pending
  private value = null
  private reason = null
  private onFulfilledCallbacks: OnFulFilled[] = []
  private onRejectedCallbacks: OnRejected[] = []

  resolve = (value: any) => {
    if (this.status === PromiseStatus.Pending) {
      this.status = PromiseStatus.FulFilled
      this.value = value
      
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()?.(value)
      }
    }
  }

  reject = (reason: any) => {
    if (this.status === PromiseStatus.Pending) {
      this.status = PromiseStatus.Rejected
      this.reason = reason
      
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()?.(reason)
      }
    }
  }

  then (onFulfilled?: OnFulFilled, onRejected?: OnRejected) {
    const _onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value: any) => value
    const _onRejected = typeof onRejected === 'function' ? onRejected : (reason: any) => { throw reason }

    const promise2 = new Promise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = _onFulfilled(this.value)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      const rejectedMicrotask = () => {
        queueMicrotask(() => {
          try {
            const x = _onRejected(this.reason)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      if (this.status === PromiseStatus.FulFilled) {
        fulfilledMicrotask()
      } else if (this.status === PromiseStatus.Rejected) {
        rejectedMicrotask()
      } else {
        this.onFulfilledCallbacks.push(fulfilledMicrotask)
        this.onFulfilledCallbacks.push(rejectedMicrotask)
      }
    })

    return promise2
  }

  private resolvePromise (promise2: Promise, x: Promise | any, resolve: OnFulFilled, reject: OnRejected) {
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }

    if (x instanceof Promise) {
      x.then(resolve, reject)
    } else {
      resolve(x)
    }
  }
}