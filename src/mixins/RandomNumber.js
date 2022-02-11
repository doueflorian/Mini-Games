export default {
    methods: {
        RandomNumber(a, b) {
            return Math.round(Math.random() * ( a - b) + b);
        }
    }
}