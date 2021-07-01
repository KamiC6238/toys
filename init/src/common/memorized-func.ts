type MemorizedResult = {
  [key: string]: any
}

export function memorizedFunction (fn: Function) {
  let memorized: MemorizedResult = {}
  // @ts-ignore
  let _this = this

  return function (...restArgs: any[]) {
    let key = JSON.stringify(restArgs)
  
    if (!memorized[key]) {
      memorized[key] = fn.apply(_this, restArgs)
    }

    return memorized[key]
  }
}