type LazyManProps = {
  todos: Function[],
  sayName: () => void
  eat: (food: string) => any
  holdOn: (delay: number) => Function
  sleep: (delay: number) => any
  sleepFirst: (delay: number) => any
  next: () => void
}

export function LazyMan (name: string) {
  const lazyMan: LazyManProps = {
    todos: [],
    sayName () {
      this.todos.push(() => {
        console.log(`Hi! This is ${name}`)
        this.next()
      })
    },
    eat (food: string) {
      this.todos.push(() => {
        console.log(`Eat ${food}`)
        this.next()
      })
      return this
    },
    holdOn (delay: number) {
      return () => {
        setTimeout(() => {
          console.log(`Wake up after ${delay}`)
          this.next()
        }, delay * 1000)
      }
    },
    sleep (delay: number) {
      this.todos.push(this.holdOn(delay))
      return this
    },
    sleepFirst (delay: number) {
      this.todos.unshift(this.holdOn(delay))
      return this
    },
    next () {
      const task = this.todos.shift()
      task && task()
    }
  }

  lazyMan.sayName()

  // 这一步是精髓
  // 当所有执行栈的任务执行完毕再开始进行输出
  // 此时所有的任务已经被推进 lazyMan.todos
  setTimeout(() => {
    lazyMan.next()
  })

  return lazyMan
}

// LazyMan('kaihang').sleep(1).eat('dinner').sleepFirst(2)