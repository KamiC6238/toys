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

Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw TypeError('myBind can only be called by function')
  }

  let _context = context ? context : window
  let fnSymbol = Symbol()
  _context[fnSymbol] = this

  let _this = this
  let fnProto = function () {}
  let fnResult = function () {
    _this.apply(
      this instanceof fnResult
        ? this
        : _context,
        Array.prototype.slice.call(arguments, 1)
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