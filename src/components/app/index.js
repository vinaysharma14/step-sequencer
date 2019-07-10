import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import PlayBar from '../PlayBar';
import StepSequencer from '../StepSequencer';
import './style.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <PlayBar />
        <StepSequencer />
      </div>
    );
  }
}

export default inject('store')(observer(App));
