<template>
    <router-link v-if="this.$route.name != 'Home'" class="home" to="/">Home</router-link>
  <router-view/>
</template>

<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

.home {
  width: 100%;
  height: 50px;
  font-size: 1.2em;
  background-color: black;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.images-credit {
  width: 100%;
  background: rgba(black, 0.6);
  color: white;
  padding: 0.5em 0;

  @media (max-width: 768px) {
    display: none;
  }

  a {
    color: white;
  }
}
</style>
