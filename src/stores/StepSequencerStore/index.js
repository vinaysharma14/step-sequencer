import { types } from 'mobx-state-tree';

import ChannelRackStore from './ChannelRackStore';

export const StepSequencerStore = types.model('StepSequencer', {
  channelRack: types.array(ChannelRackStore),
  masterVolume: 100,
  masterMuted: 100,
}).actions((self) => ({
  toggleBeatBar(sampleIndex, beatIndex) {
    self.channelRack[sampleIndex].beatBars[beatIndex] = !self.channelRack[sampleIndex].beatBars[beatIndex];
  },
  loadChannelRack() {
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
    self.channelRack = channelRack;
  },
  getActiveSamples(beatCount) {
    let activeSamples = [];
    for (var i = 0; i < self.channelRack.length; i++) {
      if (self.channelRack[i].beatBars[beatCount]) {
        activeSamples.push(self.channelRack[i].sampleName.toLowerCase());
      }
    }
    return activeSamples;
  },
  handleVolumeChange(sampleIndex, sampleVolume) {
    if (self.masterVolume !== 100) {
      return;
    }
    self.channelRack[sampleIndex].sampleVolume = Number(sampleVolume);
  },
  muteVolume(sampleIndex) {
    let channelRack = self.channelRack[sampleIndex];
    if (self.masterVolume !== 100) {
      channelRack.masterVolume = 0;
      return;
    }
    channelRack.mutedVolume = channelRack.sampleVolume;
    channelRack.sampleVolume = 0;
  },
  unMuteVolume(sampleIndex) {
    let channelRack = self.channelRack[sampleIndex];
    if (self.masterVolume !== 100) {
      channelRack.masterVolume = channelRack.sampleVolume * (self.masterVolume / 100);
      return;
    }
    channelRack.sampleVolume = channelRack.mutedVolume;
  },
  getSampleVolume(sampleIndex) {
    if (self.masterVolume !== 100) {
      return self.channelRack[sampleIndex].masterVolume / 100;
    }
    return self.channelRack[sampleIndex].sampleVolume / 100;
  },
  resetChannelRack(sampleIndex) {
    self.channelRack[sampleIndex].beatBars.fill(false, 0, 32);
  },
  setChannelFrequency(sampleIndex, frequencyCount) {
    for (let i = 0; i < self.channelRack[sampleIndex].beatBars.length; i++) {
      if (i % frequencyCount === 0) {
        self.channelRack[sampleIndex].beatBars[i] = true;
      } else {
        self.channelRack[sampleIndex].beatBars[i] = false;
      }
    }
  },
  resetMaster() {
    for (var i = 0; i < self.channelRack.length; i++) {
      this.resetChannelRack(i);
    }
  },
  setMasterFrequency(frequencyCount) {
    for (var i = 0; i < self.channelRack.length; i++) {
      this.setChannelFrequency(i, frequencyCount);
    }
  },
  muteMaster() {
    self.masterMuted = self.masterVolume;
    self.masterVolume = 0;
    for (var sampleIndex = 0; sampleIndex < self.channelRack.length; sampleIndex++) {
      this.muteVolume(sampleIndex);
    }
  },
  unMuteMaster() {
    self.masterVolume = self.masterMuted;
    for (var sampleIndex = 0; sampleIndex < self.channelRack.length; sampleIndex++) {
      this.unMuteVolume(sampleIndex);
    }
  },
  changeMasterVolume(newMasterVolume) {
    newMasterVolume = Number(newMasterVolume);
    for (var sampleIndex = 0; sampleIndex < self.channelRack.length; sampleIndex++) {
      let channelRack = self.channelRack[sampleIndex];
      channelRack.masterVolume = (channelRack.sampleVolume * (newMasterVolume / 100));
    }
    self.masterVolume = newMasterVolume;
  }
}));

export const StepSequencerStoreInstance = StepSequencerStore.create({});