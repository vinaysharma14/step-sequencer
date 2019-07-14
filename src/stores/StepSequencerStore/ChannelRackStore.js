import { types } from 'mobx-state-tree';

const ChannelRackStore = types.model('ChannelRackStore', {
  sampleName: types.string,
  activeBeats: types.array(types.number),
  beatBars: types.array(types.boolean),
  sampleVolume: types.number,
  mutedVolume: types.number,
  masterVolume: types.number,
});

export default ChannelRackStore;
