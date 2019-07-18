import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic, faKeyboard } from '@fortawesome/free-solid-svg-icons'

import './style.css';
import ChannelRackSettings from '../ChannelRackSettings';

class ChannelRack extends Component {
  state = {
    inputKey: false,
    bindedKey: '',
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

  inputKey = () => {
    this.setState({
      inputKey: true,
    })
  }

  handleKeyInput = (event) => {
    const { getKeyBindedSample } = this.props.store.stepSequencerStore
    let keyInput = event.target.value;
    if (keyInput === ' ' || keyInput[1] === ' ') {
      return;
    }
    if (keyInput.length > 1) {
      keyInput = keyInput[1];
    }
    if (getKeyBindedSample(keyInput.toUpperCase().charCodeAt(0)) === false) {
      this.setState({
        bindedKey: keyInput.toUpperCase(),
      })
    }
  }

  handleKeyBinding = (event) => {
    const { bindKey } = this.props.store.stepSequencerStore;
    const { bindedKey } = this.state;
    const { sampleIndex, item } = this.props;

    if (event.keyCode === 27) {
      this.setState({
        inputKey: false,
        bindedKey: item.bindedKey ? String.fromCharCode(item.bindedKey) : '',
      })
    } else if (event.keyCode === 13) {
      bindKey(sampleIndex, bindedKey);
      this.setState({
        inputKey: false,
      })
    }
  }

  render() {
    const { sampleIndex, item, playBeats, masterKeyboardToggled } = this.props;
    const { toggleBeatBar, masterVolume } = this.props.store.stepSequencerStore;

    return (
      <Row key={sampleIndex}>
        <Col lg={2} className="mt-3">
          <div className="sample-button">
            {item.sampleName}
            <FontAwesomeIcon
              icon={faMusic}
              className="sample-preview"
              onClick={e => playBeats(null, sampleIndex)}
            />
            {
              this.state.inputKey || masterKeyboardToggled?
                <input
                  value={this.state.bindedKey}
                  className="key-binding-input"
                  onChange={this.handleKeyInput}
                  onKeyDown={this.handleKeyBinding}
                  autoFocus
                /> :
                <FontAwesomeIcon
                  icon={faKeyboard}
                  className="key-binding"
                  onClick={this.inputKey}
                />
            }
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
            sampleVolume={masterVolume !== 100 ? item.masterVolume : item.sampleVolume}
          />
        </Col>
      </Row>
    )
  }
}

export default inject('store')(observer(ChannelRack));