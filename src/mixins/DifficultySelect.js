export default {
    methods: {
        // eslint-disable-next-line no-unused-vars
        difficultySelect(select, element, maxValue) {
          console.log(element)
            if(select.type == "change") {
                this[element] = parseInt(select.target.value);
            } else {
                this[element] = this.RandomNumber(this[maxValue], 2);
            }

            console.log(this[element]);
        }
    }
}