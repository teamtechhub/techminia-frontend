import React from "react";

export class Debounce extends React.Component {
  timer = null;

  handleDebounce = (...args) => {
    const { debounceFn, time } = this.props;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => debounceFn(...args), time || 200);
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    return this.props.children(this.handleDebounce);
  }
}
export default Debounce;
