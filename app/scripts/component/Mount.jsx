import React, { Component } from 'react';

class Mount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      anz: 'あんず'
    };
    // this.click = this.click.bind(this);
    console.log('constructor');
  }

  static getDerivedStateFromProps(props, state) {
    /* 最初のマウント時とその後の更新時の両方で、
    * renderメソッドを呼び出す直前に呼び出されます。
    * 状態を更新するオブジェクトを返す必要があります
    * 何も更新しない場合はnullを返します。*/
    console.log(props);
    console.log(state);
    console.log('getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    // コンポーネントがマウントされた直後に（ツリーに挿入されて）呼び出されます。
    console.log('componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps);
    console.log(nextState);
    console.log('shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // コンポーネントが更新された後、直前の情報が取れる
    // componentDidUpdateと同時に使う事
    // returnがcomponentDidUpdateの第三引数に渡る
    console.log(prevProps);
    console.log(prevState);
    console.log('getSnapshotBeforeUpdate');
    return prevState;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(prevProps);
    console.log(prevState);
    console.log(snapshot);
    console.log('componentDidUpdate');
    if (prevState.anz === this.state.anz) {
      console.log('おなじだよ');
    }
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
    console.log('componentDidCatch');
  }

  click() {
    this.setState({anz: 'あんずちゃん'})
  }

  render() {
    console.log('render');
    return(
      <div>
        <button type="button" onClick={() => this.click()}>on</button>
        <p>{this.state.anz}</p>
      </div>
    );
  }
}

Mount.defaultProps = {
  name: 'あんずさん'
};

export default Mount;