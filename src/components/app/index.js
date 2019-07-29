import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Howl } from 'howler';
import _ from 'lodash';

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
  state = {
    trapKickSample: new Howl({
      src: [trapKick],
      volume: 0.75,
    }),
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyEvent);
  }

  playBeats = (beatCount, previewSample) => {
    const { playUploadedSamples } = this.props.store.stepSequencerStore;
    this.playDefaultSamples(beatCount, previewSample);
    playUploadedSamples(beatCount, previewSample);
  }

  playDefaultSamples = (beatCount, previewSample) => {
    const { getActiveSamples, getSampleVolume } = this.props.store.stepSequencerStore;
    const activeSamples = getActiveSamples(beatCount);

    if (activeSamples.includes(0) || previewSample === 0) {
      const kickSample = new Howl({
        src: [kick],
        volume: getSampleVolume(0),
      });
      kickSample.play();
    }
    if (activeSamples.includes(1) || previewSample === 1) {
      const snareSample = new Howl({
        src: [snare],
        volume: getSampleVolume(1),
      });
      snareSample.play();
    }
    if (activeSamples.includes(2) || previewSample === 2) {
      const clapSample = new Howl({
        src: [clap],
        volume: getSampleVolume(2),
      });
      clapSample.play();
    }
    if (activeSamples.includes(3) || previewSample === 3) {
      const rideSample = new Howl({
        src: [ride],
        volume: getSampleVolume(3),
      });
      rideSample.play();
    }
    if (activeSamples.includes(4) || previewSample === 4) {
      const thisRef = this;
      this.state.trapKickSample.pause();
      let trapKickSample = new Howl({
        src: [trapKick],
        volume: getSampleVolume(4),
      });
      this.setState({
        trapKickSample,
      }, () => {
        thisRef.state.trapKickSample.play();
      })
    }
    if (activeSamples.includes(5) || previewSample === 5) {
      const trapSnareSample = new Howl({
        src: [trapSnare],
        volume: getSampleVolume(5),
      });
      trapSnareSample.play();
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
