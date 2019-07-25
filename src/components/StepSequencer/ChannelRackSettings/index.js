import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUndo, faVolumeUp, faVolumeMute, faKeyboard } from '@fortawesome/free-solid-svg-icons'

import './style.css';

class ChannelRackSettings extends Component {
  state = {
    patternRepeaters: [1, 2, 4, 8],
  }

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
    const { masterSettings, toggleMasterKeyboard, masterKeyboardToggled } = this.props;
    const { patternRepeaters } = this.state;
    return (
      <div className="channel-settings mt-3">
        {
          masterSettings &&
          <div className={masterKeyboardToggled ? "master-keyboard toggled" : "master-keyboard"}>
            <FontAwesomeIcon
              icon={faKeyboard}
              className="cursor"
              onClick={toggleMasterKeyboard}
            />
          </div>
        }
        {
          patternRepeaters.map((frequencyCount, index) => (
            <p
              key={index}
              className="cursor vertical-mid"
              onClick={e => this.setChannelFrequency(frequencyCount)}
            >
              {frequencyCount.toString().concat('x')}</p>
          ))
        }
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