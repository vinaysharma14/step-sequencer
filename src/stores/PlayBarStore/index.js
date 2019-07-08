import { types } from 'mobx-state-tree';

export const PlayBarStore = types.model('PlayBarStore', {
  playing: false,
  stopped: true,
  metronomeActive: false,
  bpmCount: '100',
}).actions((self) => ({
  playAudio() {
    self.playing = true;
    self.stopped = false;
  },
  stopAudio() {
    self.playing = false;
    self.stopped = true;
  },
  toggleMetronome() {
    self.metronomeActive = !self.metronomeActive;
  },
  handleBpmChange(bpmCount) {
    self.bpmCount = bpmCount;
  },
}));

export const PlayBarStoreInstance = PlayBarStore.create({});
