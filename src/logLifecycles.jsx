import React, { Component } from 'react';

export default function logLifecycles(Wrapped) {
  const methods = [
    'componentWillMount',
    'componentDidMount',
    'componentWillReceiveProps',
    'shouldComponentUpdate',
    'componentWillUpdate',
    'componentDidUpdate',
    'componentWillUnmount',
  ];

  const oldMethods = {};

  methods.forEach((method) => {
    if (Wrapped.prototype[method]) {
      oldMethods[method] = Wrapped.prototype[method];
    }
    Wrapped.prototype[method] = (...args) => {
      console.groupCollapsed(`${Wrapped.displayName} ${method}`);
      let oldFunction = oldMethods[method];
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
        console.log('prevProps', args[0]);
        console.log('prevState', args[1]);
      }
      console.groupEnd();
      if (oldFunction) {
        oldFunction = oldFunction.bind(this);
        oldFunction(...args);
      }
      if (
        method === 'shouldComponentUpdate' &&
        typeof oldFunction === 'undefined'
      ) {
        return true;
      }
      return false;
    };
  });

  Wrapped.prototype.setState = function (partialState, callback) {
    console.groupCollapsed(`${Wrapped.displayName} setState`);
    console.log('partialState', partialState);
    console.log('callback', callback);
    console.groupEnd();
    this.updater.enqueueSetState(this, partialState, callback, 'setState');
  };

  return class extends Component {
    static displayName = 'Logger';

    render() {
      return <Wrapped {...this.props} />;
    }
  };
}
