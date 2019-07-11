import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

import './style.css';

class ChannelRackSettings extends Component {
  handleVolumeChange = (event) => {
    const { handleVolumeChange } = this.props.store.stepSequencerStore;
    const { sampleIndex } = this.props;
    const sampleVolume = event.target.value;
    handleVolumeChange(sampleIndex, sampleVolume);
  }

  muteVolume = () => {
    const { muteVolume } = this.props.store.stepSequencerStore;
    const { sampleIndex } = this.props;
    muteVolume(sampleIndex);
  }

  unMuteVolume = () => {
    const { unMuteVolume } = this.props.store.stepSequencerStore;
    const { sampleIndex } = this.props;
    unMuteVolume(sampleIndex);
  }

  resetChannelRack = () => {
    const { resetChannelRack } = this.props.store.stepSequencerStore;
    const { sampleIndex } = this.props;
    resetChannelRack(sampleIndex);
  }

  setChannelFrequency = (frequencyCount) => {
    const { setChannelFrequency } = this.props.store.stepSequencerStore;
    const { sampleIndex } = this.props;
    setChannelFrequency(sampleIndex, frequencyCount);
  }

  render() {
    return (
      <div className="channel-settings mt-3">
        <p
          className="cursor"
          onClick={e => this.setChannelFrequency(1)}
        >
          x1</p>
        <p
          className="cursor"
          onClick={e => this.setChannelFrequency(2)}
        >
          x2</p>
        <p
          className="cursor"
          onClick={e => this.setChannelFrequency(4)}
        >
          x4</p>
        <FontAwesomeIcon
          icon={faUndo}
          className="cursor"
          onClick={this.resetChannelRack}
        />
        {
          this.props.sampleVolume ?
            <FontAwesomeIcon
              icon={faVolumeUp}
              onClick={this.muteVolume}
              className="cursor" /> :
            <FontAwesomeIcon
              icon={faVolumeMute}
              onClick={this.unMuteVolume}
              className="cursor" />
        }
        <input
          type="range"
          value={this.props.sampleVolume}
          onChange={this.handleVolumeChange}
          className="volumeSlider" />
      </div>
    )
  }
}

export default inject('store')(observer(ChannelRackSettings));