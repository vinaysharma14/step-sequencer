import { observable, action } from 'mobx';
import { Howl } from 'howler';

class StepSequencerStore {
  @observable channelRack = [];

  @observable masterVolume = 100;

  @observable masterMuted = 100;

  @observable recordingNotes = false;

  @action toggleBeatBar = (sampleIndex, beatIndex) => {
    this.channelRack[sampleIndex].beatBars[beatIndex] = !this.channelRack[sampleIndex].beatBars[beatIndex];
  }

  @action loadChannelRack = () => {
    const samples = ['Kick', 'Snare', 'Clap', 'Ride', '808', 'Trap'];
    let channelRack = [];
    let beatBars = [];
    for (var i = 0; i < 32; i++) {
      beatBars.push(false);
    }
    samples.forEach((sample) => {
      channelRack.push({
        sampleName: sample,
        activeBeats: [],
        beatBars,
        sampleVolume: 75,
        mutedVolume: 75,
        masterVolume: 75,
      });
    });
    this.channelRack = channelRack;
  }

  @action getActiveSamples = (beatCount) => {
    let activeSamples = [];
    for (var i = 0; i < this.channelRack.length; i++) {
      if (this.channelRack[i].beatBars[beatCount]) {
        activeSamples.push(i);
      }
    }
    return activeSamples;
  }

  @action handleVolumeChange = (sampleIndex, sampleVolume) => {
    if (this.masterVolume !== 100) {
      return;
    }
    this.channelRack[sampleIndex].sampleVolume = Number(sampleVolume);
  }

  @action muteVolume = (sampleIndex) => {
    let channelRack = this.channelRack[sampleIndex];
    if (this.masterVolume !== 100) {
      channelRack.masterVolume = 0;
      return;
    }
    channelRack.mutedVolume = channelRack.sampleVolume;
    channelRack.sampleVolume = 0;
  }

  @action unMuteVolume = (sampleIndex) => {
    let channelRack = this.channelRack[sampleIndex];
    if (this.masterVolume !== 100) {
      channelRack.masterVolume = channelRack.sampleVolume * (this.masterVolume / 100);
      return;
    }
    channelRack.sampleVolume = channelRack.mutedVolume;
  }

  @action getSampleVolume = (sampleIndex) => {
    if (this.masterVolume !== 100) {
      return this.channelRack[sampleIndex].masterVolume / 100;
    }
    return this.channelRack[sampleIndex].sampleVolume / 100;
  }

  @action resetChannelRack = (sampleIndex) => {
    this.channelRack[sampleIndex].beatBars.fill(false, 0, 32);
  }

  @action setChannelFrequency = (sampleIndex, frequencyCount) => {
    for (let i = 0; i < this.channelRack[sampleIndex].beatBars.length; i++) {
      if (i % frequencyCount === 0) {
        this.channelRack[sampleIndex].beatBars[i] = true;
      } else {
        this.channelRack[sampleIndex].beatBars[i] = false;
      }
    }
  }

  @action resetMaster = () => {
    for (var i = 0; i < this.channelRack.length; i++) {
      this.resetChannelRack(i);
    }
  }

  @action setMasterFrequency = (frequencyCount) => {
    for (var i = 0; i < this.channelRack.length; i++) {
      this.setChannelFrequency(i, frequencyCount);
    }
  }

  @action muteMaster = () => {
    this.masterMuted = this.masterVolume;
    this.masterVolume = 0;
    for (var sampleIndex = 0; sampleIndex < this.channelRack.length; sampleIndex++) {
      this.muteVolume(sampleIndex);
    }
  }

  @action unMuteMaster = () => {
    this.masterVolume = this.masterMuted;
    for (var sampleIndex = 0; sampleIndex < this.channelRack.length; sampleIndex++) {
      this.unMuteVolume(sampleIndex);
    }
  }

  @action changeMasterVolume = (newMasterVolume) => {
    newMasterVolume = Number(newMasterVolume);
    for (var sampleIndex = 0; sampleIndex < this.channelRack.length; sampleIndex++) {
      let channelRack = this.channelRack[sampleIndex];
      channelRack.masterVolume = (channelRack.sampleVolume * (newMasterVolume / 100));
    }
    this.masterVolume = newMasterVolume;
  }

  @action handleSampleUpload = (uploadedSample) => {
    let sampleName = uploadedSample.name.split('.')[0];
    sampleName = sampleName.charAt(0).toUpperCase() + sampleName.slice(1);
    let beatBars = [];
    for (var i = 0; i < 32; i++) {
      beatBars.push(false);
    }
    const newSample = {
      sampleName,
      activeBeats: [],
      beatBars,
      sampleVolume: 75,
      mutedVolume: 75,
      masterVolume: 75,
      base64: uploadedSample.base64,
    };
    this.channelRack.push(newSample);
  }

  @action playUploadedSamples = (beatCount, previewSample) => {
    const channelRack = this.channelRack;
    if (previewSample && previewSample > 5) {
      const uploadedSample = new Howl({
        src: [channelRack[previewSample].base64],
        volume: this.getSampleVolume(previewSample),
      });
      uploadedSample.play();
    } else {
      for (var sampleIndex = 5; sampleIndex < channelRack.length; sampleIndex++) {
        if (channelRack[sampleIndex].beatBars[beatCount]) {
          const uploadedSample = new Howl({
            src: [channelRack[sampleIndex].base64],
            volume: this.getSampleVolume(sampleIndex),
          });
          uploadedSample.play();
        }
      }
    }
  }

  @action bindKey = (sampleIndex, keyInput) => {
    const keyCode = keyInput.charCodeAt(0);
    if (!isNaN(keyCode) || keyInput === '') {
      this.channelRack[sampleIndex].bindedKey = keyCode;
    }
  }

  @action getKeyBindedSample = (keyCode) => {
    for (var sampleIndex = 0; sampleIndex < this.channelRack.length; sampleIndex++) {
      if (this.channelRack[sampleIndex].bindedKey === keyCode) {
        return sampleIndex;
      }
    }
    return false;
  }

  @action toggleNoteRecording = () => {
    this.recordingNotes = !this.recordingNotes;
  }

  @action recordNotes = (sampleIndex, beatCount) => {
    this.channelRack[sampleIndex].beatBars[beatCount] = true;
  }
}

export default StepSequencerStore;
