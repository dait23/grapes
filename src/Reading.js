import React from 'react'

import PropTypes from 'prop-types';

export default class ReadingTime extends React.Component {
  static propTypes = {
    wordsPerMinute: PropTypes.number,
    textColor: PropTypes.string
  };

  // static defaultProps = {
  //   wordsPerMinute: 170,
  //   textColor: 'blue'
  // };

  constructor(props) {
    super(props);

    this.state = {
      readTime: 0
    }
  }

  componentWillMount() {
    this.updateReadingTime(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateReadingTime(nextProps);
  }

  updateReadingTime(props) {
    const words = this.countWords(props.text);
    const readTime = Math.round(words / props.wordsPerMinute);

    this.setState({ readTime });
  }

  countWords(text) {
    return text.split(/\s+/).length
  }

  render() {
    const { textColor, ...rest } = this.props;
    const { readTime } = this.state;
    const minutes = readTime === 1 ? 'minute' : 'minutes';

    return (
      <div {...rest}>
        <p style={{ color: textColor }}>
          Estimated read time:<br /><br />
          <span>{readTime} {minutes}</span>
        </p>
      </div>
    )
  }
}