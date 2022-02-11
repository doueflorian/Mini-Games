<template>

    <div id="pair-game">

        <div id="pair-game_counter">
            <div id="pair-game_counter-infos">
                <span>{{ pairsFound }} pair<span v-if="pairsFound > 1">s</span> of {{ pairsOnScreen }} found !</span>
                <span>{{ time.minutesPassed }} mins and {{ time.secondsPassed }} seconds passed </span>
            </div>
            <div id="pair-game_counter-select">
                <div>
                    <label for="level">Select your difficulty</label>
                    <select @change="difficultySelect($event, 'pairsOnScreen', 'maximumCards')" name="level" id="level-select">
                        <option value="4">Difficulty</option>
                        <option value="4">Easy (4 Pairs)</option>
                        <option value="8">Medium (8 Pairs)</option>
                        <option value="14">Hard (14 pairs)</option>
                    </select>
                </div>
                <div>
                    Or get it random 
                    <button @click="difficultySelect($event, 'pairsOnScreen', 'maximumCards')"> Randomize </button>
                </div>
            </div>
        </div>

        <div id="pair-game_board">
            <Card v-for='(card, index) in cards' :key="`${cardKey}-${index}`"
                ref="cardComponent"
                @click="pickACard"
                :title='card.title'
                :iconName='card.icon'
                :isNumber='card.isNumber'
            />
        </div>

        <span class="images-credit">Background by <a href="https://www.pexels.com/fr-fr/@fwstudio-33348">FWStudio</a></span>

    </div>

    <FinishedGamePrompt v-if="isGameFinished"
        message = 'You found all the pairs'
        :minutes = 'this.minutesElapsed'
        :seconds = 'this.secondsElapsed'
        @playAgain = 'reloadGame'
    />

</template>

<script>
//Mixins
import CardsData from '../mixins/CardsData'
import RandomNumber from '../mixins/RandomNumber'
import ShuffleArray from '../mixins/ShuffleArray'
import DisplayTime from '../mixins/DisplayTime'
import DifficultySelect from '../mixins/DifficultySelect'
import ReloadGame from '../mixins/ReloadGame'
import EndGame from '../mixins/EndGame'

// Components
import Card from '../components/Card.vue'
import FinishedGamePrompt from '../components/FinishedGamePrompt.vue'


export default {
    name: 'FindThePairs',
    mixins: [DisplayTime, ShuffleArray, CardsData, RandomNumber, DifficultySelect, ReloadGame, EndGame],
    components: {
        Card, FinishedGamePrompt
    },
    data() {
        return {
            cards: [],
            maximumCards: 14,
            pairsOnScreen: 4,
            chosenCard: null,
            pairsFound: 0,
            cardKey: 0,
            isGameFinished: false,
            minutesElapsed: 0,
            secondsElapsed: 0

        }
    },
    watch: {
        pairsOnScreen: function() {
            this.cards = [];
            this.cardKey += 1;
            this.createCards();
            this.pairsFound = 0;
            this.time = {minutesPassed: 0, secondsPassed: 0};
        },
        pairsFound: function() {
            if(this.pairsOnScreen === this.pairsFound) {
              this.endGame('pairsOnScreen');
            }
        },
        isGameFinished: function() {
            if(this.isGameFinished === false) {
                this.pairsOnScreen = 4;
            }
        }
    },
    methods: {
        createCards() {
            let cardIndexes = [];

            for (let i = 0; i < this.pairsOnScreen; i++) {
                cardIndexes.push(i);
            } 

            cardIndexes = this.shuffleArray(cardIndexes);

            for (let i = 0; i < this.pairsOnScreen; i++) {

                this.cards.push(this.differentCards[cardIndexes[i]]);
                this.cards.push(this.differentCards[cardIndexes[i]]);
            } 

            this.cards = this.shuffleArray(this.cards);
        },
        hideAllCards() {
            document.querySelectorAll('.card-space').forEach( e => {
                this.$refs.cardComponent[0].flipCard(e.firstChild);
            })
        },
        pickACard(card) {

            let isCardShown = card.target.classList.contains('card');
            let cardname = card.target.attributes['data-card'].value ;

            if(this.chosenCard === null) {

                this.chosenCard = cardname;

            } else {

                if(this.chosenCard == cardname && !isCardShown) {
                    
                    document.querySelectorAll(`.card[data-card=${this.chosenCard}]`).forEach(card => {
                        setTimeout(() => {
                            card.classList.add('found');  
                        }, 400)
                    })
                    document.querySelectorAll(`.card-back[data-card=${this.chosenCard}]`).forEach(card => {
                        setTimeout(() => {
                        card.classList.add('hide-back-card');
                        }, 400)

                    })
                        
                    this.pairsFound++
                    return this.chosenCard = null;

                } else {
                    
                    setTimeout(() => {
                        this.hideAllCards();
                        
                    }, 800)

                    return this.chosenCard = null;
                }
            }
        }
    },
    beforeMount() {
        this.createCards();
    }
}

</script>

<style lang="scss" scoped>
#pair-game {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    background-image: url('../assets/images/pexels-fwstudio-163999.jpg');

    &_counter {
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        display: flex;
        justify-content: center;
        margin-bottom: 0.5em;

        &-infos, &-select {
            display: flex;
            flex-direction: column;
            padding: 1em;
            line-height: 2em;

            div {
                display: flex;
                justify-content: space-between;

                select, button {
                    text-align: center;
                    width: 140px;
                    margin-left: 1em;
                    background: rgba(255, 255, 255, 0.5);
                    border: 1px solid black;
                    border-radius: 0.5em;
                }
            }
        }

      &-infos {
        @media (max-width: 992px) {
          display: none;
        }
      }

    }

    &_board {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        flex: 1;
    }
}
</style>