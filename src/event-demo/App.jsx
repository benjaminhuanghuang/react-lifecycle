import React, { Component } from 'react';
import PropTypes from 'prop-types';
//
import loggify from './loggify-start';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class App extends Component {
  constructor() {
    super();
    this.canvasRef = React.createRef();
    this.state = {
      data: 'No data',
    };
  }

  componentDidMount() {
    this.fetchData();
    // can not acces canvas in willMount and constructor
    const canvasCxt = this.canvasRef.current.getContext('2d');
    canvasCxt.fillStyles = 'blue';
    canvasCxt.arc(75, 75, 50, 0, 2 * Math.PI);
    canvasCxt.fill();
  }

  fetchData = () => {
    console.log('Going to fetch data');
    setTimeout(() => {
      console.log('Data retrieved');
      this.setState({
        data: Math.random(),
      });
    }, 2000);
  };

  render() {
    const { showPollChild } = this.state;
    return (
      <div>
        Hello
        <h4>{this.state.data}</h4>
        <canvas ref={this.canvasRef} />
        <button
          onClick={() => {
            this.setState((prevState) => ({
              showPollChild: !prevState.showPollChild,
            }));
          }}
        >
          {showPollChild ? 'Hide' : 'show'} PollChile
        </button>
        {showPollChild ? <PollChile /> : null} PollChile
      </div>
    );
  }
}

App.displayName = 'App';

class PollChile extends Component {
  componentDidMount() {
    this.pollData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.parentPoll !== this.props.parentPoll) {
      return true;
    }
    if (nextState.poll !== this.state.poll) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    clearInterval(this.pollInterval);
  }

  pollData = () => {
    this.pollInterval = setInterval(() => {
      this.setState({
        poll: getRandomInt(1, 5),
      });
    }, 1000);
  };

  render() {
    const { data, parentPoll } = this.props;
    const { poll } = this.state;
    return (
      <div>
        <h5>poll: {poll}</h5>
        <h5>data: {data}</h5>
        <h5>parentPoll: {parentPoll}</h5>
      </div>
    );
  }
}
PollChile.displayName = 'PollChile';

PollChile.propTypes = {
  data: PropTypes.number.isRequired,
  parentPoll: PropTypes.number.isRequired,
};

export default loggify(App);
