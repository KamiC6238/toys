export function myPromiseAll (iterators: any[]) {
  return new Promise((resolve, reject) => {
    let results: any = []
    let count = 0
    if (iterators.length === 0) {
      resolve([])
    } else {
      for (const iterator of iterators) {
        Promise
          .resolve(iterator)
          .then((data) => {
            results.push(data)
            count += 1

            if (count === iterators.length) {
              resolve(results)
            }
          })
          .catch((err) => {
            reject(err)
          })
      }
    }
  })
}

export function myPromiseRace (iterators: any[]) {
  return new Promise((resolve, reject) => {
    if (iterators.length === 0) {
      resolve(undefined)
    } else {
      for (const iterator of iterators) {
        Promise
          .resolve(iterator)
          .then((data) => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      }
    }
  })
}

export function myPromiseAllSettled (iterators: any[]) {
  return new Promise((resolve) => {
    let results: any = []
    let count = 0

    function saveResultAndCheckIfAllDone (data: any) {
      results.push(data)

      if (count === iterators.length) {
        resolve(results)
      }
    }

    if (iterators.length === 0) {
      resolve([])
    } else {
      for (const iterator of iterators) {
        Promise
          .resolve(iterator)
          .then(data => { saveResultAndCheckIfAllDone(data) })
          .catch(err => { saveResultAndCheckIfAllDone(err) })
      }
    }
  })
}