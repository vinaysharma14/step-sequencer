import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Container, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'

import ChannelRackSettings from './ChannelRackSettings'
import './style.css';

class StepSequencer extends Component {
  constructor(props) {
    super(props);
    const { loadChannelRack } = this.props.store.stepSequencerStore;
    loadChannelRack();
  }

  getBeatBarClass(beatActive, beatIndex) {
    const { playing, paused } = this.props.store.playBarStore;
    let { beatCount } = this.props.store.playBarStore;
    let barClass = "beat-bar";

    beatCount = beatCount - 1;
    if (beatCount === -1) {
      beatCount = 31;
    }

    if (beatIndex === beatCount && (playing || paused)) {
      if (beatActive) {
        return barClass.concat(" activePlay");
      }
      return barClass.concat(" playing");
    }

    if (beatActive) {
      return barClass.concat(" playing");
    }

    return barClass;
  }

  render() {
    const { channelRack, toggleBeatBar } = this.props.store.stepSequencerStore;
    const { playBeats } = this.props;

    return (
      <Container className="step-sequencer">
        {
          channelRack.map((item, sampleIndex) =>
            <Row key={sampleIndex}>
              <Col lg={2} className={sampleIndex === channelRack.length - 1 ? "mt-3 mb-3" : "mt-3"}>
                <div className="sample-button">
                  {item.sampleName}
                  <FontAwesomeIcon
                    icon={faMusic}
                    className="sample-preview"
                    onClick={e => playBeats(null, sampleIndex)}
                  />
                </div>
              </Col>
              <Col lg={6} className="border-left">
                <div className="sample-button mt-3 flex">
                  {
                    item.beatBars.map((beatActive, index) =>
                      <div
                        key={index}
                        onClick={e => toggleBeatBar(sampleIndex, index)}
                        className={this.getBeatBarClass(beatActive, index)}
                      />)
                  }
                </div>
              </Col>
              <Col lg={4} className="border-left">
                <ChannelRackSettings
                  sampleIndex={sampleIndex}
                  sampleVolume={item.sampleVolume}
                />
              </Col>
            </Row>)
        }
      </Container>
    )
  }
}

export default inject('store')(observer(StepSequencer));
