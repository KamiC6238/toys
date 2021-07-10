const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
  constructor (executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined
    this.onResolvedCallbacks = []
    this.onRejectedCallbacks = []

    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  static resolve (value) {
    if (value instanceof Promise) {
      return value
    }
    return new Promise(resolve => {
      resolve(value)
    })
  }

  static reject (reason) {
    return new Promise((_, reject) => {
      reject(reason)
    })
  }

  resolve = value => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      
      while (this.onResolvedCallbacks.length > 0) {
        this.onResolvedCallbacks.shift()(value)
      }
    }
  }

  reject = reason => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      
      while (this.onRejectedCallbacks.length > 0) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }

    const resolveCallback = (resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onFulfilled(this.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      }, 0)
    }

    const rejectCallback = (resolve, reject) => {
      setTimeout(() => {
        try {
          const x = onRejected(this.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (err) {
          reject(err)
        }
      }, 0)
    }

    let promise2 = new Promise((resolve, reject) => {
      switch (this.status) {
        case FULFILLED: {
          resolveCallback(resolve, reject)
          break
        }
        case REJECTED: {
          rejectCallback(resolve, reject)
          break
        }
        default:
          this.onResolvedCallbacks.push(() => {
            resolveCallback(resolve, reject)
          })
          this.onRejectedCallbacks.push(() => {
            rejectCallback(resolve, reject)
          })
      }
    })

    return promise2
  }
}

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(new TypeError('Chaning cycle detected for promise #<Promise>'))
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    let then
    try {
      then = x.then
    } catch (err) {
      reject(err)
    }
    if (typeof then === 'function') {
      let called = false
      try {
        then.call(x, y => {
          if (called) return
          called = true
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if (called) return
          called = true
          reject(r)
        })
      } catch (err) {
        if (called) return
        reject(err)
      }
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }
}