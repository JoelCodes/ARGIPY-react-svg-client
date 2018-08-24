import React, {Component} from 'react';

export default class KeyListener extends Component {
  listener = (event) => {
    this.props.listener(event);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.listener);
  }
  componentWillUnmount(){
    document.removeEventListener('keydown', this.listener);
  }
  render(){
    return false;
  }
}