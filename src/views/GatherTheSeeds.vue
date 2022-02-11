<template>
  <div id="seed-game">
    <div id="seed-game_counter">
      <div id="seed-game_counter-infos">
        <span>{{ seeds }} seeds planted</span>
        <span>{{ foundSeeds }} seeds gathered and {{ seeds - foundSeeds }} remaining </span>
        <span>{{ time.minutesPassed }} mins and {{ time.secondsPassed }} seconds passed </span>
      </div>
      <div id="seed-game_counter-select">
        <div>
          <label for="level">Select your </label>
          <select @change="difficultySelect($event, 'seeds', 'maxSeeds')" name="level" id="level-select">
            <option value="5"> difficulty </option>
            <option value="5">Easy (5 Seeds)</option>
            <option value="15">Medium (15 Seeds)</option>
            <option value="30">Hard (30 Seeds)</option>
            <option value="50">Too Much (50 Seeds)</option>
          </select>
        </div>
        <div>
          <span>Or</span>
          <button @click="difficultySelect($event, 'seeds', 'maxSeeds')"> Randomize </button>
        </div>
      </div>
    </div>

    <div id="seed-game_playground">
      <div id="garden">

        <font-awesome-icon class="seed" v-for="(seed, index) in seeds" :data-seed="index" :key="seedKey - index" :icon="['fas', 'seedling']" />
       <font-awesome-icon id="hands" :icon="['fas', 'hands']" style="top: 0%; left: 0%;" />

      </div>

      <div class="onscreen-keys">
        <span class="onscreen-keys-up" data-direction="up"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
        <span class="onscreen-keys-upright" data-direction="upright"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
        <span class="onscreen-keys-right" data-direction="right"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
        <span class="onscreen-keys-downright" data-direction="downright"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
        <span class="onscreen-keys-down" data-direction="down"><font-awesome-icon :icon="['fas', 'chevron-down']"/></span>
        <span class="onscreen-keys-downleft" data-direction="downleft"><font-awesome-icon :icon="['fas', 'chevron-down']" /></span>
        <span class="onscreen-keys-left" data-direction="left"><font-awesome-icon :icon="['fas', 'chevron-left']" /></span>
        <span class="onscreen-keys-upleft" data-direction="upleft"><font-awesome-icon :icon="['fas', 'chevron-left']" /></span>

      </div>

    </div>


    
    <span class="images-credit">Background by <a href="https://www.pexels.com/@pixabay">Pixabay</a></span>

  </div>

    <FinishedGamePrompt v-if="isGameFinished"
        message = 'You found all the seeds'
        :minutes = 'this.minutesElapsed'
        :seconds = 'this.secondsElapsed'
        @playAgain = 'reloadGame'
    />
     
</template>


<script>
//Mixins
import RandomNumber from '../mixins/RandomNumber'
import DisplayTime from '../mixins/DisplayTime'
import DifficultySelect from '../mixins/DifficultySelect'
import ReloadGame from '../mixins/ReloadGame'
import EndGame from '../mixins/EndGame'

// Components
import FinishedGamePrompt from '../components/FinishedGamePrompt.vue'



export default {
  name: "GatherTheSeeds",
  mixins: [DisplayTime, RandomNumber, DifficultySelect, ReloadGame, EndGame],
      components: {
        FinishedGamePrompt
    },
    data(){
      return {
        seeds: 5,
        maxSeeds: 50,
        foundSeeds: 0,
        handsPos: "",
        seedsPos: [],
        seedKey: 0,
        isGameFinished: false,
        minutesElapsed: 0,
        secondsElapsed: 0
      }
  },
  watch: {
    seeds: function() {
      this.seedsPos = [];
      this.seedKey += 1;
      this.foundSeeds = 0;
      this.handsPos = "";
      this.time = {minutesPassed: 0, secondsPassed: 0};

      setTimeout(() => {
        this.sowSeeds();
        this.getHandsPosition();
        this.getSeedsPositions();
      }, 100);
    },
    foundSeeds: function() {
        if(this.foundSeeds === this.seeds) {
            this.endGame('seeds');
        }
    },
    isGameFinished: function() {
        if(this.isGameFinished === false) {
            this.seeds = 5;
        }
    }
  },
  methods: {
    sowSeeds() {
        for(let i = 0; i < this.seeds; i++) {
          let seedX = this.RandomNumber(90, 10);
          let seedY = this.RandomNumber(90, 10);
          document.querySelector(`[data-seed="${i}"]`).style.top = `${seedY}%`;
          document.querySelector(`[data-seed="${i}"]`).style.left = `${seedX}%`;
        }
    },
    getHandsPosition() {
      let handsY = document.getElementById('hands').style.top;
      let handsX = document.getElementById('hands').style.left;
      return this.handsPos = handsY + "." + handsX;
    },
    getSeedsPositions() {

        for(let j = 0; j < this.seeds; j++) {

          let seedY = document.querySelector(`[data-seed="${j}"]`).style.top;
          let seedX = document.querySelector(`[data-seed="${j}"]`).style.left;
          this.seedsPos.push(seedY + "." + seedX);  
        }
    },
    harvest() {
      let hands = document.getElementById('hands');
      let handsTop = 0;
      let handsLeft = 0;

      let body = document.body;

      document.querySelectorAll('[data-direction').
        forEach(key =>  key.addEventListener('click', () => {
          let padKey = key.attributes[1].value;

            if (padKey === "up") {
              body.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowUp", repeat: true  }));
            } else if (padKey === "upright") { 
              body.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowUp", repeat: true  }));
              body.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight", repeat: true }));
            } else if (padKey === "right") {
              body.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight", repeat: true }));
            } else if (padKey === "downright") {
              body.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowRight", repeat: true }));
              body.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowDown", repeat: true  }));
            } else if (padKey === "down") {
              body.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowDown", repeat: true  }));
            } else if (padKey === "downleft") {
              body.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowDown", repeat: true  }));
              body.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowLeft", repeat: true  }));
            } else if (padKey === "left") {
              body.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowLeft", repeat: true  }));
            } else {
              body.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowLeft", repeat: true  }));
              body.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: "ArrowUp", repeat: true  }));
            }
        }))
    
      window.addEventListener('keydown', key => {
        if (key.key == "ArrowUp") {
          if(handsTop < 0){
            handsTop += 1;
          }
          handsTop -= 1;
          hands.style.top = handsTop + "%"  ;

            document.querySelector('[data-direction="up"]').classList.add('onscreen-keys-up-active')
            setTimeout(() => document.querySelector('[data-direction="up"]').classList.remove('onscreen-keys-up-active'), 100)

        } else if (key.key == "ArrowRight") {
          if(handsLeft == 93){
            handsLeft -= 1;
          }
          handsLeft += 1;
          hands.style.left = handsLeft + "%"  ;

            document.querySelector('[data-direction="right"]').classList.add('onscreen-keys-right-active')
            setTimeout(() => document.querySelector('[data-direction="right"]').classList.remove('onscreen-keys-right-active'), 100)

        } else if (key.key == "ArrowDown") {
          if(handsTop == 93){
            handsTop -= 1;
          }
          handsTop += 1;
          hands.style.top = handsTop + "%"  ;


            document.querySelector('[data-direction="down"]').classList.add('onscreen-keys-down-active')
            setTimeout(() => document.querySelector('[data-direction="down"]').classList.remove('onscreen-keys-down-active'), 100)

        } else if (key.key == "ArrowLeft") {
          if(handsLeft < 0){
            handsLeft += 1;
          }
          handsLeft -= 1;
          hands.style.left = handsLeft + "%"  ;

            document.querySelector('[data-direction="left"]').classList.add('onscreen-keys-left-active')
            setTimeout(() => document.querySelector('[data-direction="left"]').classList.remove('onscreen-keys-left-active'), 100)
        }
      });
    },
    gatherTheSeeds() {
      let hands = this.getHandsPosition();
      if (this.seedsPos.includes(hands)) {
        let seedIndex = this.seedsPos.findIndex(e => e === hands);
        this.foundSeeds++;
        document.querySelector(`[data-seed="${seedIndex}"]`).style.display = "none";

        this.seedsPos.splice(seedIndex, 1, "found");
      }
    }
  },
  mounted() {
    this.sowSeeds();
    this.getHandsPosition();
    this.getSeedsPositions();
    this.harvest();
    window.addEventListener('keydown', () => this.gatherTheSeeds())
  }


}

</script>

<style lang="scss" scoped>
#seed-game {
  background: no-repeat center  url('../assets/images/pexels-pixabay-289613.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  & * {
    user-select: none;
  }

  &_counter {
    width: 100%;
    background: rgba(1, 20, 0, 0.8);
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

  &_playground {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 768px) { 
      flex-direction: column;
      height: 100vh;
    }

    @media (min-width: 768px) { 
      flex: 1;
    }
  }
}

#garden {
  width: 500px;
  height: 500px;
  border: 1px solid black;
  position: relative;
  background: rgba(1, 20, 0, 0.8);
  border-radius: 0.5em;

  @media (max-width: 768px) {
    width: 80%;
    height: 50%;
  }
 
  svg {
    font-size: 1.8em;
    color: green;
  }

  #hands{
    position: absolute;
    color: pink;
  }
}

.seed {
  position: absolute;
}



.onscreen-keys {
  width: 250px;
  height: 250px;
  border: 2px solid black;
  display: grid;
  border-radius: 30%;
  background: rgba(black, 0.6);
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px; 

  @media (max-width: 300px) {
    width: 250px;
    height: 250px;
  }


  span {
    display: inline-block;
    width: 100%;
    height: 100%;
    border: 2px solid black;
    border-radius: 10%;
    box-sizing: border-box;
    background: white;
    font-size: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: inset 0px 0px 5px black;

    svg {
      pointer-events: none;
    }
  }

  &-up {
    grid-area: 1 / 2 / 2 / 3;
  }

  &-upright {
    grid-area: 1 / 3 / 2 / 3;
    svg {
      transform: rotate(45deg);
    }

    border-top-right-radius: 1em !important;
  }

  &-right {
    grid-area: 2 / 3 / 3 / 4; 
  }

  &-downright {
    grid-area: 3 / 3 / 3 / 3;
    svg {
      transform: rotate(45deg);
    }

    border-bottom-right-radius: 1em !important;
  }

    
  &-down {
    grid-area: 3 / 2 / 4 / 3;
  }

  &-downleft {
    grid-area: 3 / 1 / 3 / 1;
    svg {
      transform: rotate(45deg);
    }

    border-bottom-left-radius: 1em !important;
  }

  &-left {
    grid-area: 2 / 1 / 3 / 2;
  }

  &-upleft {
    grid-area: 1 / 1 / 1 / 1;
    svg {
      transform: rotate(45deg);
    }

    border-top-left-radius: 1em !important;
  }

  &-up, &-right, &-down, &-left {
    &:active, &-active {
      transform: scale(0.98);
    }
  }
}
</style>
