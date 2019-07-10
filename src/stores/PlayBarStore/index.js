import { types } from 'mobx-state-tree';

export const PlayBarStore = types.model('PlayBarStore', {
  playing: false,
  paused: false,
  stopped: true,
  metronomeActive: false,
  bpmCount: '128',
  beatCount: 0,
}).actions((self) => ({
  playAudio() {
    self.playing = true;
    self.paused = false;
    self.stopped = false;
  },
  pauseAudio() {
    self.playing = false;
    self.paused = true;
    self.stopped = false;
  },
  stopAudio() {
    self.playing = false;
    self.paused = false;
    self.stopped = true;
  },
  toggleMetronome() {
    self.metronomeActive = !self.metronomeActive;
  },
  handleBpmChange(bpmCount) {
    self.bpmCount = bpmCount;
  },
  handleBeatCountChange() {
    self.beatCount = (self.beatCount + 1) % 16;
  },
  resetBeatCount() {
    self.beatCount = 0;
  },
}));

export const PlayBarStoreInstance = PlayBarStore.create({});
