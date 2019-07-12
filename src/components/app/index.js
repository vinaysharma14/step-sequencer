import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import kick from '../../assets/sounds/kick.wav';
import snare from '../../assets/sounds/snare.wav';
import clap from '../../assets/sounds/clap.wav';
import ride from '../../assets/sounds/ride.wav';
import trapKick from '../../assets/sounds/808.wav';
import trapSnare from '../../assets/sounds/trap.wav';

import PlayBar from '../PlayBar';
import StepSequencer from '../StepSequencer';
import './style.css';

class App extends Component {
  state ={
    trapKickSample: new Audio(trapKick),
  }

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
    if (activeSamples.includes('808') || previewSample === 4) {
      const thisRef = this;
      this.state.trapKickSample.pause();
      this.setState({
        trapKickSample: new Audio(trapKick),
      }, () => {
        const trapKickSample = thisRef.state.trapKickSample;
        trapKickSample.volume = getSampleVolume(4);
        this.setState({
          trapKickSample: trapKickSample,
        }, () => {
          thisRef.state.trapKickSample.play();
        })
      })
    }
    if (activeSamples.includes('trap') || previewSample === 5) {
      const trapSnareSample = new Audio(trapSnare);
      trapSnareSample.volume = getSampleVolume(5);
      trapSnareSample.play();
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
