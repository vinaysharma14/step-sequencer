import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Container, Row, Col } from 'react-bootstrap';

import './style.css';

class StepSequencer extends Component {
  getBeatBarClass(beatActive, beatIndex) {
    const { playing, paused } = this.props.store.playBarStore;
    let { beatCount } = this.props.store.playBarStore;
    let barClass = "beat-bar";

    beatCount = beatCount - 1;
    if (beatCount === -1) {
      beatCount = 15;
    }

    if (beatIndex === beatCount && (playing || paused)) {
      if (beatActive) {
        return barClass.concat(" activePlay");
      }
      return barClass.concat(" playing");
    }

    if (beatActive) {
      return barClass.concat(" active");
    }

    return barClass;
  }
  render() {
    const { channelRack, toggleBeatBar } = this.props.store.stepSequencerStore;
    return (
      <Container className="step-sequencer">
        {
          channelRack.map((item, index) =>
            <Row key={index}>
              <Col lg={3} className={index === channelRack.length - 1 ? "mt-3 mb-3" : "mt-3"}>
                <div className="sample-button">
                  {item.sampleName}
                </div>
              </Col>
              <Col lg={9} className="border-left">
                <div className="sample-button mt-3 flex">
                  {
                    item.beatBars.map((beatActive, index) =>
                      <div
                        key={index}
                        onClick={e => toggleBeatBar(item.sampleName, index)}
                        className={this.getBeatBarClass(beatActive, index)}
                      />)
                  }
                </div>
              </Col>
            </Row>)
        }
      </Container>
    )
  }
}

export default inject('store')(observer(StepSequencer));
