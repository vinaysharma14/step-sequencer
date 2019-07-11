import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Container, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons'

import tick from '../../assets/sounds/tick.wav';
import tock from '../../assets/sounds/tock.wav';

import kick from '../../assets/sounds/kick.wav';
import snare from '../../assets/sounds/snare.wav';
import clap from '../../assets/sounds/clap.wav';
import ride from '../../assets/sounds/ride.wav';

import './style.css';

class PlayBar extends Component {
  constructor(props) {
    super(props);
    this.tick = new Audio(tick);
    this.tick.load();
    this.tock = new Audio(tock);
    this.tock.load();
  }

  incrementBeat = () => {
    const { beatCount, metronomeActive, handleBeatCountChange, playing } = this.props.store.playBarStore;
    const { getActiveSamples } = this.props.store.stepSequencerStore;
    let activeSamples = [];
    if (metronomeActive) {
      this.playMetronome(beatCount);
    }
    if (playing) {
      activeSamples = getActiveSamples(beatCount);
      this.playBeats(activeSamples);
    }
    handleBeatCountChange(beatCount);
  }

  playBeats(activeSamples) {
    const { getSampleVolume } = this.props.store.stepSequencerStore;
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

  playMetronome(beatCount) {
    if (beatCount === 0) {
      this.tick.play();
    } else if (beatCount === 4 || beatCount === 8 || beatCount === 12) {
      this.tock.play();
    }
  }

  stopBeatIncrement = () => {
    clearInterval(this.beatIncrementer);
    const { resetBeatCount } = this.props.store.playBarStore;
    resetBeatCount();
  }

  toggleMetronome = () => {
    const { playBarStore } = this.props.store;
    playBarStore.toggleMetronome();

    if (playBarStore.playing || playBarStore.paused) {
      return;
    }

    if (playBarStore.metronomeActive) {
      this.triggerBeatIncrement();
      this.incrementBeat();
    } else {
      this.stopBeatIncrement();
    }
  }

  handleBpmChange = (event) => {
    const { playBarStore } = this.props.store;
    const bpmCount = event.target.value;

    if (!bpmCount || isNaN(bpmCount) || bpmCount === ' ') {
      playBarStore.handleBpmChange('');
      return;
    }

    if (bpmCount === '00') {
      playBarStore.handleBpmChange('00');
      return;
    }

    if (Number(bpmCount) >= 1 && Number(bpmCount) <= 9 && bpmCount.length <= 2) {
      playBarStore.handleBpmChange(bpmCount);
      return;
    }

    if (Number(bpmCount) > 0 && Number(bpmCount) <= 999) {
      playBarStore.handleBpmChange(Number(bpmCount).toString());
      if (playBarStore.paused) {
        return;
      }
      if (playBarStore.metronomeActive || playBarStore.playing) {
        this.stopBeatIncrement();
        this.triggerBeatIncrement();
      }
    }
  }

  bpmIncreased(bpmCount) {
    const { playBarStore } = this.props.store;
    return Number(bpmCount) > Number(playBarStore.bpmCount);

  }

  stopAudio = () => {
    const { playBarStore } = this.props.store;
    playBarStore.stopAudio();
    this.stopBeatIncrement();
    if (playBarStore.metronomeActive) {
      this.toggleMetronome();
    }
  }

  playAudio = () => {
    const { playBarStore } = this.props.store;
    playBarStore.playAudio();
    if (playBarStore.metronomeActive && playBarStore.playing) {
      clearInterval(this.beatIncrementer);
      playBarStore.resetBeatCount();
      this.triggerBeatIncrement();
      this.incrementBeat();
    } else {
      this.triggerBeatIncrement();
      this.incrementBeat();
    }
  }

  pauseAudio = () => {
    const { playBarStore } = this.props.store;
    playBarStore.pauseAudio();
    clearInterval(this.beatIncrementer);
  }

  triggerBeatIncrement = () => {
    const { playBarStore } = this.props.store;
    this.beatIncrementer = setInterval(
      this.incrementBeat,
      (60 / playBarStore.bpmCount) * 250
    );
  }

  render() {
    const { playBarStore } = this.props.store;
    return (
      <Container className="playbar">
        <Row>
          <Col>
            {
              (playBarStore.paused || playBarStore.stopped) &&
              <FontAwesomeIcon
                className={playBarStore.stopped ? "playbar-icon inactive" : "playbar-icon"}
                icon={faPlay}
                onClick={this.playAudio} />
            }
            {
              playBarStore.playing &&
              <FontAwesomeIcon
                className={playBarStore.playing ? "playbar-icon" : "playbar-icon inactive"}
                icon={faPause}
                onClick={this.pauseAudio} />
            }
          </Col>
          <Col className="border-left">
            <FontAwesomeIcon
              className={playBarStore.stopped ? "playbar-icon" : "playbar-icon inactive"}
              icon={faStop}
              onClick={this.stopAudio} />
          </Col>
          <Col className="border-left">
            <span>
              <img
                className={playBarStore.metronomeActive ? "metronome-icon" : "metronome-icon metronome-inactive"}
                src={require('../../assets/icons/metronome.png')}
                alt=''
                onClick={this.toggleMetronome} />
            </span>
          </Col>
          <Col className="border-left">
            <input
              value={playBarStore.bpmCount}
              onChange={this.handleBpmChange}
              id="bpm_input"
              type="text"
              name="name" />
            BPM
          </Col>
        </Row>
      </Container>
    )
  }
}

export default inject('store')(observer(PlayBar));
