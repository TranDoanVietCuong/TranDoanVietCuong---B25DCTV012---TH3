import { Component } from 'react';

export default class ExpenseSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { keyword: '' };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.keyword !== this.state.keyword) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.props.onSearch(this.state.keyword);
      }, 400);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleChange = (event) => {
    this.setState({ keyword: event.target.value });
  };

  render() {
    return (
      <div className="search-box">
        <label htmlFor="search">Tìm theo nội dung</label>
        <input id="search" type="search" placeholder="Nhập nội dung cần tìm..."
          value={this.state.keyword} onChange={this.handleChange} />
      </div>
    );
  }
}
