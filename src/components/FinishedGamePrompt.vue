<template>
  <div class="finished-game">
    <div class="finished-game-prompt">
      <p> {{ message }} in <br /> {{ minutes }} minute(s) and {{ seconds }} seconds. </p>
      <button @click="backToMenu">Back to menu</button> <button @click="$emit('playAgain')">Play again ?</button> 
    </div>
  </div>
</template>

<script>
//Utils
import router from '../router/index'

export default {
  name: 'FinishedGamePrompt',
  props: ['message', 'minutes', 'seconds'],
  methods: {
    backToMenu() {
        router.push('/');
    }
  }
}
</script>


<style lang="scss" scoped>
.finished-game {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);

  &-prompt {
    background-color: white;
    border: 1px solid black;
    border-radius: 0.8em;
    padding: 2em;

    button {
      padding: 1em;
    }
  }
}
</style>
