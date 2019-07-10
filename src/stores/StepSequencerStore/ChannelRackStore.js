import { types } from 'mobx-state-tree';

const ChannelRackStore = types.model('ChannelRackStore', {
  sampleName: types.string,
  isActive: true,
  activeBeats: types.array(types.number),
  beatBars: types.array(types.boolean),
});

export default ChannelRackStore;
