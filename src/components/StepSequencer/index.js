import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Container, Row, Col } from 'react-bootstrap';

import './style.css';

class StepSequencer extends Component {
  render() {
    const { beatCount, playing, paused } = this.props.store.playBarStore;
    const beatBars = [];
    for (var i = 0; i < 16; i++) {
      beatBars.push(i);
    }
    let activeBar = beatCount - 1;
    if (activeBar === -1) {
      activeBar = 15;
    }
    return (
      <Container className="step-sequencer">
        <Row>
          <Col lg={3} className="mt-3">
            <div className="sample-button">
              Kick
            </div>
          </Col>
          <Col lg={9} className="border-left">
            <div className="sample-button mt-3 flex">
              {
                beatBars.map((item, index) =>
                  <div
                    key={index}
                    className={(item === activeBar && (playing || paused)) ? "beat-bar active" : "beat-bar"}
                  />)
              }
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={3} className="mt-3">
            <div className="sample-button">
              Snare
            </div>
          </Col>
          <Col lg={9} className="border-left">
            <div className="sample-button mt-3 flex">
              {
                beatBars.map((item, index) =>
                  <div
                    key={index}
                    className={(item === activeBar && (playing || paused)) ? "beat-bar active" : "beat-bar"}
                  />)
              }
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={3} className="mt-3">
            <div className="sample-button">
              Clap
            </div>
          </Col>
          <Col lg={9} className="border-left">
            <div className="sample-button mt-3 flex">
              {
                beatBars.map((item, index) =>
                  <div
                    key={index}
                    className={(item === activeBar && (playing || paused)) ? "beat-bar active" : "beat-bar"}
                  />)
              }
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={3} className="mt-3 mb-3">
            <div className="sample-button">
              Riders
            </div>
          </Col>
          <Col lg={9} className="border-left">
            <div className="sample-button mt-3 flex">
              {
                beatBars.map((item, index) =>
                  <div
                    key={index}
                    className={(item === activeBar && (playing || paused)) ? "beat-bar active" : "beat-bar"}
                  />)
              }
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default inject('store')(observer(StepSequencer));
