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
    background: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    justify-content: center;
    margin-bottom: 0.5em;
    height: 100px;

    &-infos, &-select {
      display: flex;
      flex-direction: column;
      padding: 1em;
      line-height: 2em;

        @media (max-width: 300px) {
          label {
            display: none;
          }

          select {
            height: 60px;
          }
        }

      div {
        display: flex;
        justify-content: space-between;

        &:nth-child(2) {
          @media (max-width: 600px) {
            display: none;
          }
        }

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
</style>