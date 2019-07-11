import { types } from 'mobx-state-tree';

import ChannelRackStore from './ChannelRackStore';

export const StepSequencerStore = types.model('StepSequencer', {
  channelRack: types.array(ChannelRackStore),
}).actions((self) => ({
  toggleBeatBar(sampleIndex, beatIndex) {
    self.channelRack[sampleIndex].beatBars[beatIndex] = !self.channelRack[sampleIndex].beatBars[beatIndex];
  },
  loadChannelRack() {
    const samples = ['Kick', 'Snare', 'Clap', 'Ride'];
    let channelRack = [];
    samples.forEach((sample) => {
      channelRack.push({
        sampleName: sample,
        activeBeats: [],
        beatBars: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        sampleVolume: 75,
        mutedVolume: 75,
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
    self.channelRack[sampleIndex].sampleVolume = Number(sampleVolume);
  },
  muteVolume(sampleIndex) {
    let channelRack = self.channelRack[sampleIndex];
    channelRack.mutedVolume = channelRack.sampleVolume;
    channelRack.sampleVolume = 0;
  },
  unMuteVolume(sampleIndex) {
    let channelRack = self.channelRack[sampleIndex];
    channelRack.sampleVolume = channelRack.mutedVolume;
  },
  getSampleVolume(sampleIndex) {
    return self.channelRack[sampleIndex].sampleVolume / 100;
  },
  resetChannelRack(sampleIndex) {
    self.channelRack[sampleIndex].beatBars.fill(false, 0, 31);
  },
  setChannelFrequency(sampleIndex, frequencyCount) {
    for (let i = 0; i < self.channelRack[sampleIndex].beatBars.length; i++) {
      if (i % frequencyCount === 0) {
        self.channelRack[sampleIndex].beatBars[i] = true;
      } else {
        self.channelRack[sampleIndex].beatBars[i] = false;
      }
    }
  }
}));

export const StepSequencerStoreInstance = StepSequencerStore.create({});