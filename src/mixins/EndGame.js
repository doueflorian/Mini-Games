export default {
  methods: {
    getEndTiming() {
      this.minutesElapsed = this.time.minutesPassed;
      this.secondsElapsed = this.time.secondsPassed;
    },
    async endGame(valueToReset) {
      await this.getEndTiming();
      this.isGameFinished = true;
      this[valueToReset] = null;
    }
  }
}