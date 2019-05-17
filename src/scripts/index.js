import '../styles/index.scss';
import 'bootstrap';
console.log('webpack starterkit');

class User {
  constructor(name) {
    this.name = name;
  }

  hello() {
    console.log(`hello ${this.name}`);
  }
}

const user = new User('Bruce');
user.hello();