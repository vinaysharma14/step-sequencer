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
  playBeats = (beatCount, previewSample) => {
    const { getActiveSamples, getSampleVolume } = this.props.store.stepSequencerStore;
    const activeSamples = getActiveSamples(beatCount);

    if (activeSamples.includes('kick') || previewSample === 0) {
      const kickSample = new Audio(kick);
      kickSample.volume = getSampleVolume(0);
      kickSample.play();
    }
    if (activeSamples.includes('snare') || previewSample === 1) {
      const snareSample = new Audio(snare);
      snareSample.volume = getSampleVolume(1);
      snareSample.play();
    }
    if (activeSamples.includes('clap') || previewSample === 2) {
      const clapSample = new Audio(clap);
      clapSample.volume = getSampleVolume(2);
      clapSample.play();
    }
    if (activeSamples.includes('ride') || previewSample === 3) {
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
