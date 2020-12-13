import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

class ChildComponent extends Component {
  constructor(props) {
    super(props);
    this.timer = setInterval(() => {
      console.log('timer');
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <ChildContainer>
        <h3>Child</h3>
        <h4>
          this.props.random:
          {this.props.random}
        </h4>
      </ChildContainer>
    );
  }
}

ChildComponent.propTypes = {
  random: PropTypes.number.isRequired,
};

ChildComponent.displayName = 'Child';

const ChildContainer = styled.div`
  width: 50%;
  height: 300px;
  margin: auto;
  background-color: lightgreen;
  align-self: center;
`;

export default ChildComponent;
