export default {
  methods: {
    getEndTiming() {
      this.minutesElapsed = this.time.minutesPassed;
      this.secondsElapsed = this.time.secondsPassed;
    },
    async endGame(valueToReset, valueToStoreIn, valueToStore) {
      await this.getEndTiming();
      this.isGameFinished = true;
      this[valueToReset] = null;
      this[valueToStoreIn] = valueToStore;
    }
  }
}