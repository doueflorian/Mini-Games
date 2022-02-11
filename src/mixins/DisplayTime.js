export default {
    data () {
        return {
            time: {minutesPassed: 0, secondsPassed: 0}
        }
    },
    methods: {
        getPassedTime() {
            setInterval(() => {
                if(this.time.secondsPassed == 59) {
                let minutes = ++this.time.minutesPassed;
                return this.time = {minutesPassed: minutes, secondsPassed:  0};
                }
                return this.time.secondsPassed++;
            }, 1000);
        }
    },
    mounted() {
        this.getPassedTime();
    }
}