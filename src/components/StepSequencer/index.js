import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Container, Row, Col } from 'react-bootstrap';

import ChannelRack from './ChannelRack';
import ChannelRackSettings from './ChannelRackSettings'
import SampleUploader from './SampleUploader';
import './style.css';

class StepSequencer extends Component {
  constructor(props) {
    super(props);
    const { loadChannelRack } = this.props.store.stepSequencerStore;
    loadChannelRack();
  }

  state = {
    masterKeyboardToggled: false,
  }

  toggleMasterKeyboard = () => {
    this.setState((prevState) => ({
      masterKeyboardToggled: !prevState.masterKeyboardToggled,
    }))
  }

  render() {
    const { channelRack, masterVolume } = this.props.store.stepSequencerStore;
    const { playBeats } = this.props;

    return (
      <Container className="step-sequencer">
        {
          channelRack.map((item, sampleIndex) =>
            <ChannelRack
              key={sampleIndex}
              sampleIndex={sampleIndex}
              item={item}
              playBeats={playBeats}
              masterKeyboardToggled={this.state.masterKeyboardToggled}
            />)
        }
        <Row>
          <Col lg={2} className="mt-3 mb-3">
            <SampleUploader />
          </Col>
          <Col lg={10} className="border-left">
            <div className="master-settings">
              <ChannelRackSettings
                masterSettings
                sampleVolume={masterVolume}
                toggleMasterKeyboard={this.toggleMasterKeyboard}
                masterKeyboardToggled={this.state.masterKeyboardToggled}
              />
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default inject('store')(observer(StepSequencer));
