import { types } from 'mobx-state-tree';

import { PlayBarStore, PlayBarStoreInstance } from './PlayBarStore';
import { StepSequencerStore, StepSequencerStoreInstance } from './StepSequencerStore';

const GlobalStore = types.model({
  playBarStore: PlayBarStore,
  stepSequencerStore: StepSequencerStore,
});

const Store = GlobalStore.create({
  playBarStore: PlayBarStoreInstance,
  stepSequencerStore: StepSequencerStoreInstance,
});

export default Store;
