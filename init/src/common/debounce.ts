export const debounce = (callback: Function, delay: number, ...restArgs: any[]) => {
  let timeout: NodeJS.Timeout | null = null
  let _this = this

  return function () {
    timeout && clearTimeout(timeout)

    timeout = setTimeout(() => {
      // 如果是 JavaScript, 可以用 Array.prototype.slice.call(arguments, 2) 来获取传入的参数
      callback.apply(_this, restArgs)
    }, delay)
  }
}