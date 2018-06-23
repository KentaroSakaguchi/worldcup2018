
interface AnzuInterFace {
  a: string;
  b: string;
}

class AnzuTs implements AnzuInterFace {

  /*
  public
  クラス外からのアクセス可能。
  
  private
  クラス内でのみアクセス可能。
  
  protected
  継承クラス内でのみアクセス可能。
  
  static
  静的なのでクラスで共有。
  */

  a = '';
  b = 'this.b';

  constructor(text: string) {
    this.a = text;
    this.b;
    console.log(`azTs: constructor/${this.a}`);
  }

  static static() {
    console.log('azTS: static');
  }

  protected func() {
    console.log('azTS: func');
  }
}


class AnzuTsEx extends AnzuTs {
  constructor(text) {
    super(text);
  }

  funcEx() {
    super.func();
    // console.log('exaz: func');
  }
}

export default AnzuTsEx;
