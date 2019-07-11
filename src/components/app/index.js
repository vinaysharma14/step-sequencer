import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import kick from '../../assets/sounds/kick.wav';
import snare from '../../assets/sounds/snare.wav';
import clap from '../../assets/sounds/clap.wav';
import ride from '../../assets/sounds/ride.wav';

import PlayBar from '../PlayBar';
import StepSequencer from '../StepSequencer';
import './style.css';

class App extends Component {
  playBeats = (beatCount) => {
    const { getActiveSamples, getSampleVolume } = this.props.store.stepSequencerStore;
    const activeSamples = getActiveSamples(beatCount);

    if (activeSamples.includes('kick')) {
      const kickSample = new Audio(kick);
      kickSample.volume = getSampleVolume(0);
      kickSample.play();
    }
    if (activeSamples.includes('snare')) {
      const snareSample = new Audio(snare);
      snareSample.volume = getSampleVolume(1);
      snareSample.play();
    }
    if (activeSamples.includes('clap')) {
      const clapSample = new Audio(clap);
      clapSample.volume = getSampleVolume(2);
      clapSample.play();
    }
    if (activeSamples.includes('ride')) {
      const rideSample = new Audio(ride);
      rideSample.volume = getSampleVolume(3);
      rideSample.play();
    }
  }

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
