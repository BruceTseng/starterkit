import '../styles/index.scss'
import 'bootstrap'
console.log('webpack starterkit')

class Greeter {
  constructor(message) {
    this.greeting = message
  }
  greet() {
    return 'Hello, ' + this.greeting
  }
}

let greeter = new Greeter('world')
console.log(greeter.greet())
