import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Container, Row, Col } from 'react-bootstrap';
import { Howl } from 'howler';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faStop, faMicrophone, faMicrophoneAltSlash } from '@fortawesome/free-solid-svg-icons'

import tick from '../../assets/sounds/tick.wav';
import tock from '../../assets/sounds/tock.wav';

import './style.css';

class PlayBar extends Component {
  constructor(props) {
    super(props);
    this.tick = new Howl({
      src: [tick],
    });
    this.tick.load();
    this.tock = new Howl({
      src: [tock],
    });
    this.tock.load();
  }

  state = {
    playAudio: true,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyEvent);
  }

  incrementBeat = () => {
    const { beatCount, metronomeActive, handleBeatCountChange, playing } = this.props.store.playBarStore;
    const { playBeats } = this.props;

    if (metronomeActive) {
      this.playMetronome(beatCount);
    }
    if (playing) {
      playBeats(beatCount);
    }
    handleBeatCountChange(beatCount);
  }

  playMetronome(beatCount) {
    if (beatCount === 0) {
      this.tick.play();
    } else if (beatCount === 8 || beatCount === 16 || beatCount === 24) {
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
    this.setState({
      playAudio: true,
    });
  }

  delayMetronome = ms => new Promise(res => setTimeout(res, ms));

  playMetronomeBeforeRecord = async () => {
    const { playBarStore } = this.props.store;
    this.tick.play();
    await this.delayMetronome((60 / playBarStore.bpmCount) * 1000);
    this.tock.play();
    await this.delayMetronome((60 / playBarStore.bpmCount) * 1000);
    this.tock.play();
    await this.delayMetronome((60 / playBarStore.bpmCount) * 1000);
    this.tock.play();
    await this.delayMetronome((60 / playBarStore.bpmCount) * 1000);
  }

  playAudio = async () => {
    const { playBarStore } = this.props.store;
    const { recordingNotes } = this.props.store.stepSequencerStore;

    if (recordingNotes) {
      clearInterval(this.beatIncrementer);
      await this.playMetronomeBeforeRecord();
    }

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
    this.setState({
      playAudio: false,
    });
  }

  pauseAudio = () => {
    const { playBarStore } = this.props.store;
    playBarStore.pauseAudio();
    clearInterval(this.beatIncrementer);
    this.setState({
      playAudio: true,
    });
  }

  triggerBeatIncrement = () => {
    const { playBarStore } = this.props.store;
    this.beatIncrementer = setInterval(
      this.incrementBeat,
      (60 / playBarStore.bpmCount) * 125
    );
  }

  handleKeyEvent = (event) => {
    const keyCode = event.keyCode;
    const { playAudio } = this.state;

    if (keyCode === 32) {
      if (playAudio) {
        this.playAudio();
      }
      else {
        this.pauseAudio();
      }
    }
  }

  render() {
    const { playBarStore } = this.props.store;
    const { recordingNotes, toggleNoteRecording } = this.props.store.stepSequencerStore;
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
            {
              recordingNotes ?
                <FontAwesomeIcon
                  className="playbar-icon"
                  icon={faMicrophone}
                  onClick={toggleNoteRecording} /> :
                <FontAwesomeIcon
                  className="playbar-icon inactive"
                  icon={faMicrophoneAltSlash}
                  onClick={toggleNoteRecording} />
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
              <span className="bpm">BPM</span>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default inject('store')(observer(PlayBar));
