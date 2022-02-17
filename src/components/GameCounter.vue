<template>
  <div id="counter">
    <div id="counter-infos">
      <span>{{ itemsFound }} {{ item }}<span v-if="itemsFound > 1">s</span> of {{ itemsOnScreenValue }} found !</span>
      <span>{{ minutes }} mins and {{ seconds }} seconds passed </span>
    </div>
    <div id="counter-select">
      <div>
        <label for="level">Select your difficulty</label>
          <select @change="$emit('difficultySelect', $event, itemsOnScreen, maxItems)" name="level" id="level-select">
            <option 
              v-for='difficulty in difficulties' :key='difficulty'
              :value='difficulty.value' >{{ difficulty.title }}
            </option>
          </select>
      </div>
      <div>
        Or <button @click="$emit('difficultySelect', $event, itemsOnScreen, maxItems)"> Randomize </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GameCounter',
  props: ['item', 'itemsFound', 'itemsOnScreen', 'itemsOnScreenValue', 'maxItems', 'difficulties', 'minutes', 'seconds', '']
}
</script>

<style lang="scss" scoped>
  #counter {
    width: 100%;
    height: 100px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    & * {
      user-select: none;
    }

    &-infos, &-select {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 1em;
      line-height: 2em;

      @media (max-width: 320px) {
        label {
          display: none;
        }

        select {
          height: 40px;
          width: 100px;
        }
      }

      @media (max-width: 500px) {
        margin: 0 0.5em;
      }

      div {
        display: flex;
        justify-content: space-between;

        &:nth-child(2) {
          @media (max-width: 992px) {
            display: none;
          }
        }

        select, button {
          text-align: center;
          width: 140px;
          margin: 0 1em;
          background: rgba(255, 255, 255, 0.5);
          border: 1px solid black;
          border-radius: 0.5em;
          cursor: pointer;
        }
      }
    }

    &-infos {
      span:nth-child(2) {
        @media (max-width: 992px) {
        display: none;
        }    
      }
    }
  }
</style>