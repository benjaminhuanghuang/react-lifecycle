import React, { Component } from 'react';
import styled from 'styled-components';
//
import logLifecycles from './logLifecycles';
import ChildComponent from './ChildComponent';

const WrappedChild = logLifecycles(ChildComponent);

class ParentComponent extends Component {
  static x;

  constructor() {
    super();
    this.state = {
      random: Math.random(),
      showChild: true,
    };
  }

  newRandom = () => {
    this.setState({ random: Math.random() });
  };

  toggleChild = () => {
    this.setState((prevState) => ({
      showChild: !prevState.showChild,
    }));
  };

  render() {
    const { showChild } = this.state;
    return (
      <ParentContainer>
        <h2>Parent</h2>
        <button onClick={this.newRandom}>Pass New Props</button>

        <button onClick={this.toggleChild}>
          {showChild ? 'Hide' : 'Show'}
          child
        </button>

        <h3>
          this.state.random
          {this.state.random}
        </h3>

        {showChild ? <WrappedChild random={this.state.random} /> : null}
      </ParentContainer>
    );
  }
}
ParentComponent.displayName = 'Parent';

const ParentContainer = styled.div`
  width: 50%;
  height: 500px;
  margin: auto;
  background-color: salmon;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

export default ParentComponent;
