Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw TypeError('myCall can only be called by function')
  }

  let _context = context ? context : window
  let fnSymbol = Symbol()
  _context[fnSymbol] = this

  let result = _context[fnSymbol](...Array.prototype.slice.call(arguments, 1))
  delete _context[fnSymbol]

  return result
}

Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw TypeError('myApply can only be called by function')
  }
  let _context = context ? context : window
  let fnSymbol = Symbol()
  _context[fnSymbol] = this

  let result = _context[fnSymbol](Array.prototype.slice.call(arguments, 1))
  delete _context[fnSymbol]

  return result
}

Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw TypeError('myBind can only be called by function')
  }

  let _context = context ? context : window

  let _this = this
  let fnProto = function () {}
  let fnResult = function () {
    _this.apply(
      this instanceof _this
        ? this
        : _context,
        args.concat(Array.prototype.slice.call(arguments))
      )
  }

  // 这里不直接通过 fnResult.prototype = this.prototype
  // 是因为这样做的话，在外部可以直接对 this.prototype 进行修改，这样会影响其他使用了该原型对象上的其他对象
  // 所以通过一个 fnProto 来让 fnResult 继承 this 的原型对象
  fnProto.prototype = this.prototype
  fnResult.prototype = new fnProto()

  return fnResult
}

function myInstanceof (left, right) {
  if (typeof right !== 'object' && typeof right !== 'function') {
    throw TypeError('right-hand of myInstanceof is not an object or function')
  }

  let proto = left.__proto__
  let prototype = right.prototype

  while (true) {
    if (!proto) {
      return false
    }
    if (proto === prototype) {
      return true
    }
    proto = proto__proto__
  }
}

// 删除指定数组中的元素，要求原地修改
function without (arr, args) {
  let i = 0

  while (i < arr.length) {
    if (args.includes(arr[i])) {
      arr.splice(i, 1)
    } else {
      i++
    }
  }
  return arr
}

// 大数相加，考察相加进位
function addStrings (num1, num2) {
  let res = ''
  let i = num1.length - 1
  let j = num2.length - 1
  let carry = 0

  while (i >= 0 || j >= 0) {
    let n1 = i >= 0 ? Number(num1[i]) : 0
    let n2 = j >= 0 ? Number(num2[j]) : 0
    let tmp = n1 + n2 + carry
    carry = Math.floor(tmp / 10)
    res = String(tmp % 10) + res
    i -= 1
    j -= 1
  }
  return carry ? '1' + res : res
}