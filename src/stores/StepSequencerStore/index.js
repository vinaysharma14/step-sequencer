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
  }
}));

export const StepSequencerStoreInstance = StepSequencerStore.create({
  channelRack: [
    {
      sampleName: 'Kick',
      isActive: true,
      activeBeats: [],
      beatBars: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    },
    {
      sampleName: 'Snare',
      isActive: true,
      activeBeats: [],
      beatBars: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    },
    {
      sampleName: 'Clap',
      isActive: true,
      activeBeats: [],
      beatBars: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    },
    {
      sampleName: 'Ride',
      isActive: true,
      activeBeats: [],
      beatBars: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    },
  ]
});