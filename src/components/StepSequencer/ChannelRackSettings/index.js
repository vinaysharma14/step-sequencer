import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

import './style.css';

class ChannelRackSettings extends Component {
  handleVolumeChange = (event) => {
    const { handleVolumeChange, changeMasterVolume } = this.props.store.stepSequencerStore;
    const { sampleIndex, masterSettings } = this.props;
    const sampleVolume = event.target.value;
    if (masterSettings) {
      changeMasterVolume(sampleVolume);
      return;
    }
    handleVolumeChange(sampleIndex, sampleVolume);
  }

  muteVolume = () => {
    const { muteVolume, muteMaster } = this.props.store.stepSequencerStore;
    const { sampleIndex, masterSettings } = this.props;
    if (masterSettings) {
      muteMaster();
      return;
    }
    muteVolume(sampleIndex);
  }

  unMuteVolume = () => {
    const { unMuteVolume, unMuteMaster } = this.props.store.stepSequencerStore;
    const { sampleIndex, masterSettings } = this.props;
    if (masterSettings) {
      unMuteMaster();
      return;
    }
    unMuteVolume(sampleIndex);
  }

  resetChannelRack = () => {
    const { resetChannelRack, resetMaster } = this.props.store.stepSequencerStore;
    const { sampleIndex, masterSettings } = this.props;
    if (masterSettings) {
      resetMaster();
      return;
    }
    resetChannelRack(sampleIndex);
  }

  setChannelFrequency = (frequencyCount) => {
    const { setChannelFrequency, setMasterFrequency } = this.props.store.stepSequencerStore;
    const { sampleIndex, masterSettings } = this.props;
    if (masterSettings) {
      setMasterFrequency(frequencyCount);
      return;
    }
    setChannelFrequency(sampleIndex, frequencyCount);
  }

  render() {
    return (
      <div className="channel-settings mt-3">
        <p
          className="cursor vertical-mid"
          onClick={e => this.setChannelFrequency(1)}
        >
          x1</p>
        <p
          className="cursor vertical-mid"
          onClick={e => this.setChannelFrequency(2)}
        >
          x2</p>
        <p
          className="cursor vertical-mid"
          onClick={e => this.setChannelFrequency(4)}
        >
          x4</p>
        <p
          className="cursor vertical-mid"
          onClick={e => this.setChannelFrequency(8)}
        >
          x8</p>
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