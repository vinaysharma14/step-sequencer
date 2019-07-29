import { observable, action } from 'mobx';

class PlayBarStore {
  @observable playing = false;

  @observable paused = false;

  @observable stopped = true;

  @observable metronomeActive = false;

  @observable bpmCount = '128';

  @observable beatCount = 0;

  constructor(Store) {
    this.Store = Store;
  }

  @action playAudio = () => {
    this.playing = true;
    this.paused = false;
    this.stopped = false;
  }

  @action pauseAudio = () => {
    this.playing = false;
    this.paused = true;
    this.stopped = false;
  }

  @action stopAudio = () => {
    this.playing = false;
    this.paused = false;
    this.stopped = true;
  }

  @action toggleMetronome = () => {
    this.metronomeActive = !this.metronomeActive;
  }

  @action handleBpmChange = (bpmCount) => {
    this.bpmCount = bpmCount;
  }

  @action handleBeatCountChange = () => {
    this.beatCount = (this.beatCount + 1) % 32;
  }

  @action resetBeatCount = () => {
    this.beatCount = 0;
  }
}

export default PlayBarStore;
