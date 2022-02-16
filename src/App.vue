<template>
    <router-link v-if="this.$route.name != 'Home'" class="home" to="/">
    <span class="home-icon"><font-awesome-icon :icon="['fas', 'house']" /></span>
    Home
    </router-link>
  <router-view/>
</template>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  position: relative;
  // display: flex;
  // flex-direction: column;
}

.home {
  width: 100%;
  height: 50px;
  background-color: black;
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (min-width: 1024px) {
    width: 200px;
    height: 100px;
    position: absolute;
    top: 0;
    right: 0;
    border-bottom-left-radius: 2em;
    font-size: 1em;
  }

  @media (max-width: 1023px) {
    &-icon {
      display: none;
    }
    font-size: 1.2em;
  }

}

.images-credit {
  width: 100%;
  background: rgba(black, 0.6);
  color: white;
  padding: 0.5em 0;

  @media (max-width: 1023px), (max-height: 767px)  {
    display: none;
  }

  a {
    color: white;
  }
}
</style>
