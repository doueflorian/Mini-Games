<template>

    <div id="pair-game">

        <game-counter 
          item = 'pair'
          :itemsFound = 'this.pairsFound'
          itemsOnScreen = 'pairsOnScreen'
          :itemsOnScreenValue = 'this.pairsOnScreen'
          maxItems = 'maximumCards'
          :minutes = 'this.time.minutesPassed'
          :seconds = 'this.time.secondsPassed'
          :difficulties = 'this.difficulties'
          @difficultySelect = 'this.difficultySelect'
        />

        <div id="pair-game_board">
            <Card v-for='(card, index) in cards' :key="`${cardKey}-${index}`"
                ref="cardComponent"
                @click = "pickACard"
                :title = 'card.title'
                :iconName = 'card.icon'
                :isNumber = 'card.isNumber'
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
import GameCounter from '../components/GameCounter.vue'
import Card from '../components/Card.vue'
import FinishedGamePrompt from '../components/FinishedGamePrompt.vue'


export default {
    name: 'FindThePairs',
    mixins: [DisplayTime, ShuffleArray, CardsData, RandomNumber, DifficultySelect, ReloadGame, EndGame],
    components: {
        Card, FinishedGamePrompt, GameCounter
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
            secondsElapsed: 0,
            CardsPreviouslyDisplayed: null,
            difficulties: [
                {
                title: 'Easy (4 pairs)',
                value: 4
                },
                {
                title: 'Medium (8 pairs)',
                value: 8
                },
                {
                title: 'Hard (14 pairs)',
                value: 14
                }
              ]
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
              this.endGame('pairsOnScreen', 'CardsPreviouslyDisplayed', this.pairsOnScreen);
            }
        },
        isGameFinished: function() {
            if(this.isGameFinished === false) {
                this.pairsOnScreen = this.CardsPreviouslyDisplayed;
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
        retrieveAllCards() {
          return document.querySelectorAll('.card-space');
        },
        hideAllCards() {
            this.retrieveAllCards().forEach( e => {
                this.$refs.cardComponent[0].flipCard(e.firstChild);
            })
        },
        blockAllCards() {
            this.retrieveAllCards().forEach( e => e.addEventListener('click', click => click.stopPropagation(), true))
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

                  this.retrieveAllCards().forEach(cards => {
                    for (let child of cards.children){
                      child.classList.add('unclickable')
                    }
                  })
                    
                  setTimeout(() => {
                      this.hideAllCards();  
                    
                      this.retrieveAllCards().forEach(cards => {
                        for (let child of cards.children){
                        child.classList.remove('unclickable')
                        }
                      })   
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
    display: flex;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
    background-image: url('../assets/images/pexels-fwstudio-163999.jpg');

    &_board {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        flex: 1;
    }
}
</style>