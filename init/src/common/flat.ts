// 数组的扁平化实现

export function flatArray (arr: any[]): any[] {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatArray(cur) : cur)
  }, [])
}