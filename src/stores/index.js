import { types } from 'mobx-state-tree';

import { PlayBarStore, PlayBarStoreInstance } from './PlayBarStore';

const GlobalStore = types.model({
  playBarStore: PlayBarStore,
});

const Store = GlobalStore.create({
  playBarStore: PlayBarStoreInstance,
});

export default Store;
