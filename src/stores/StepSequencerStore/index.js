import { types } from 'mobx-state-tree';

import ChannelRackStore from './ChannelRackStore';

export const StepSequencerStore = types.model('StepSequencer', {
  channelRack: types.array(ChannelRackStore),
}).actions((self) => ({
  toggleBeatBar(sampleName, beatIndex) {
    for (let i = 0; i < self.channelRack.length; i++) {
      if (self.channelRack[i].sampleName === sampleName) {
        self.channelRack[i].beatBars[beatIndex] = !self.channelRack[i].beatBars[beatIndex];
        break;
      }
    }
  },
  loadChannelRack() {
    const samples = ['Kick', 'Snare', 'Clap', 'Ride'];
    let channelRack = [];
    samples.forEach((sample) => {
      channelRack.push({
        sampleName: sample,
        isActive: true,
        activeBeats: [],
        beatBars: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
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
  }
}));

export const StepSequencerStoreInstance = StepSequencerStore.create({});