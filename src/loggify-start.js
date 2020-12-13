import React, { Component } from 'react';
import { LoggerContainer, H2, Border } from './styled';

function loggify(Wrapped) {
  const methodsToLog = ['componentWillMount'];

  const originals = {};

  methodsToLog.forEach((method) => {
    // preserve the original funtions
    if (Wrapped.prototype[method]) {
      originals[method] = Wrapped.prototype[method];
    }
    // replace
    Wrapped.prototype[method] = (...args) => {
      let original = originals[method];

      console.groupCollapsed(`${Wrapped.displayName} called ${method}`);

      console.groupEnd();

      if (original) {
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
          <H2>{Wrapped.displayName} is now loggified:</H2>
          <Border>
            <Wrapped {...this.props} />
          </Border>
        </LoggerContainer>
      );
    }
  };
}

export default loggify;
