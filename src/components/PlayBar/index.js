import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Container, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

import './style.css';

class PlayBar extends Component {
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

    if (Number(bpmCount) >=1 && Number(bpmCount) <=9 && bpmCount.length <= 2) {
      playBarStore.handleBpmChange(bpmCount);
      return;
    }

    if (Number(bpmCount) > 0 && Number(bpmCount) <= 999) {
      playBarStore.handleBpmChange(Number(bpmCount).toString());
    }
  }

  bpmIncreased(bpmCount) {
    const { playBarStore } = this.props.store;
    return Number(bpmCount) > Number(playBarStore.bpmCount);

  }

  render() {
    const { playBarStore } = this.props.store;
    return (
      <Container className="playbar">
        <Row>
          <Col>
            <FontAwesomeIcon
              className={playBarStore.playing ? "playbar-icon" : "playbar-icon inactive"}
              icon={faPlay}
              onClick={playBarStore.playAudio} />
          </Col>
          <Col className="border-left">
            <FontAwesomeIcon
              className={playBarStore.stopped ? "playbar-icon" : "playbar-icon inactive"}
              icon={faStop}
              onClick={playBarStore.stopAudio} />
          </Col>
          <Col className="border-left">
            <span>
              <img
                className={playBarStore.metronomeActive ? "metronome-icon" : "metronome-icon metronome-inactive"}
                src={require('../../assets/icons/metronome.png')}
                alt=''
                onClick={playBarStore.toggleMetronome} />
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
