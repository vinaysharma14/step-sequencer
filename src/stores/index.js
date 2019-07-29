import PlayBarStore from './PlayBarStore';
import StepSequencerStore from './StepSequencerStore';

class Store {
  constructor() {
    this.playBarStore = new PlayBarStore(this);
    this.stepSequencerStore = new StepSequencerStore(this);
  }
}

export default Store;
