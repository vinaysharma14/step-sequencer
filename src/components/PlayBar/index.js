import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStop } from '@fortawesome/free-solid-svg-icons'

import './style.css';

class PlayBar extends Component {
  render() {
    return (
      <Container className="playbar">
        <Row>
          <Col>
            <FontAwesomeIcon className="playbar-icon" icon={faPlay} />
          </Col>
          <Col className="border-left">
            <FontAwesomeIcon className="playbar-icon" icon={faStop} />
          </Col>
          <Col className="border-left">
            <span>
              <img
                className="metronome-icon"
                src={require('../../assets/icons/metronome.png')}
                alt='' />
            </span>
          </Col>
          <Col className="border-left">
            <input
              value="128"
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

export default PlayBar;
