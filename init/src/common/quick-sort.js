function partition (arr, beg, end) {
  let pivotIndex = beg
  let left = beg
  let right = end - 1

  while (true) {
    while (left <= right && arr[left] <= arr[pivotIndex]) {
      left += 1
    }
    while (right >= left && arr[right] >= arr[pivotIndex]) {
      right -= 1
    }
    if (left < right) {
      [arr[left], arr[right]] = [arr[right], arr[left]]
    } else {
      break
    }
  }
  [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]]
  return right
}

function quickSort (arr, beg, end) {
  if (beg < end) {
    let pivot = partition(arr, beg, end)
    quickSort(arr, beg, pivot)
    quickSort(arr, pivot + 1, end)
  }
  return arr
}