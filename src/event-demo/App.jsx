import React, { Component } from 'react';
import loggify from './loggify-start';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: 'No data',
    };
  }

  componentDidMount() {
    this.fetchData();
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
    return (
      <div>
        Hello
        <h4>{this.state.data}</h4>
      </div>
    );
  }
}

App.displayName = 'App';

export default loggify(App);
