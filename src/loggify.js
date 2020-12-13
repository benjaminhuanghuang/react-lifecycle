import React, { Component } from 'react';
import { LoggerContainer, H2 } from './styled';

function loggify(Wrapped) {
  const methodsToLog = [
    'componentWillMount',
    'componentDidMount',
    'componentWillUnmount',
    'componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'componentDidUpdate',
  ];

  const originals = {};

  methodsToLog.forEach((method) => {
    // preserve the original funtions
    if (Wrapped.prototype[method]) {
      originals[method] = Wrapped.prototype[method];
    }
    // replace
    Wrapped.prototype[method] = function (...args) {
      let original = originals[method];

      console.groupCollapsed(`${Wrapped.displayName} called ${method}`);

      if (
        method === 'componentWillReceiveProps' ||
        'shouldComponentUpdate' ||
        'componentWillUpdate'
      ) {
        console.log('nextProps', args[0]);
      }

      if (method === 'shouldComponentUpdate' || 'componentWillUpdate') {
        console.log('nextState', args[1]);
      }

      if (method === 'componentDidUpdate') {
        console.log('prevState', args[0]);

        console.log('prevProps', args[1]);
      }

      console.groupEnd();

      if (original) {
        original = original.bind(this);
        return original(...args);
      }
      if (
        method === 'shouldComponentUpdate' &&
        typeof original === 'undefined'
      ) {
        return true;
      }
      return false;
    };

    Wrapped.prototype.setState = function (partialState, callback) {
      console.groupCollapsed(`${Wrapped.displayName} setState`);
      console.log('partialState', partialState);
      console.log('callback', callback);
      console.groupEnd();
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };
  });

  return class extends Component {
    static displayName = `Loggified${Wrapped.displayName}`;

    constructor(props) {
      super(props);
      console.groupCollapsed(`${Wrapped.displayName} Constructor`);
      console.log('props', props);
      console.groupEnd();
    }

    render() {
      return (
        <LoggerContainer>
          <H2>{Wrapped.displayName} is now loggified:</H2>
          <Wrapped {...this.props} />
        </LoggerContainer>
      );
    }
  };
}

export default loggify;
