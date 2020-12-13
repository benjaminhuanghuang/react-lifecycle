import React, { Component } from 'react';
import { LoggerContainer, H2, Border } from '../styled';

function loggify(Wrapped) {
  const methodsToLog = ['componentWillMount', 'componentDidMount'];

  const originals = {};

  methodsToLog.forEach((method) => {
    // preserve the original funtions
    if (Wrapped.prototype[method]) {
      originals[method] = Wrapped.prototype[method];
    }
    // replace
    // Do not use => function here.
    // => function will lost "this" points to Wrapped
    Wrapped.prototype[method] = function newFunc(...args) {
      let original = originals[method];

      console.groupCollapsed(`${Wrapped.displayName} called ${method}`);

      console.groupEnd();

      if (original) {
        // Whithout this line, can not call the metod in the Wrapped component
        original = original.bind(this);
        original(...args);
      }
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
          <Border>
            <Wrapped {...this.props} />
          </Border>
        </LoggerContainer>
      );
    }
  };
}

export default loggify;
