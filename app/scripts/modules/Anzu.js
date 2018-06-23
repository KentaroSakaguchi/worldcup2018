class Anzu {

  constructor(text) {
    console.log(`az: constructor/${text}`);
    this.a = 'this.a';
    this.b = 'this.b';
  }

  static static() {
    console.log('az: static');
  }

  func() {
    console.log('az: func');
  }
}

class ExAnzu extends Anzu {
  constructor(text) {
    super(text);
    // console.log('exaz: constructor');
  }

  funcEx() {
    super.func();
    // console.log('exaz: func');
  }
}

export default ExAnzu;