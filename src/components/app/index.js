import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import _ from 'lodash';

import PlayBar from '../PlayBar';
import StepSequencer from '../StepSequencer';
import './style.css';

class App extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyEvent);
  }

  playBeats = (beatCount, sampleIndex) => {
    const { playBeats, playSample } = this.props.store.stepSequencerStore;
    if (beatCount !== null) {
      playBeats(beatCount);
    }
    if (sampleIndex !== undefined) {
      playSample(sampleIndex);
    }
  }

  handleKeyEvent = _.throttle((event) => {
    const { getKeyBindedSample, recordingNotes, recordNotes } = this.props.store.stepSequencerStore;
    const { beatCount, playing } = this.props.store.playBarStore;
    const keyCode = event.keyCode;
    const sampleIndex = getKeyBindedSample(keyCode);

    if (sampleIndex !== false) {
      if (playing && recordingNotes) {
        recordNotes(sampleIndex, beatCount);
        return;
      }
      this.playBeats(null, sampleIndex);
    }
  }, 50);

  render() {
    return (
      <div className="app">
        <PlayBar
          playBeats={this.playBeats}
        />
        <StepSequencer
          playBeats={this.playBeats}
        />
      </div>
    );
  }
}

export default inject('store')(observer(App));
