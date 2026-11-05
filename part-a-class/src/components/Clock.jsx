import { Component } from 'react';

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { time: new Date() };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="clock">
        <time>{this.state.time.toLocaleTimeString('vi-VN', { hour12: false })}</time>
        <span>{this.state.time.toLocaleDateString('vi-VN')}</span>
      </div>
    );
  }
}
