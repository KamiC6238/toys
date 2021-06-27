export const throttle = (callback: Function, delay: number, ...restArgs: any[]) => {
  let startTime = Date.now()
  let timeout: number | null = null
  let _this = this

  return function () {
    let curTime = Date.now()
    let restTime = delay - (curTime - startTime)

    if (restTime <= 0) {
      callback.apply(_this, restArgs)
      startTime = Date.now()
    } else {
      timeout && clearTimeout(timeout)
      timeout = setTimeout(() => {
        callback.apply(_this, restArgs)
      }, restTime)
    }
  }
}