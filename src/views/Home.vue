<template>
  <div id="homepage">
    <div id="nav">

        <router-link v-for="game in games" 
            :key="game" :to="game.path"
            class="game-card"
            > {{ game.title }}
        </router-link>

        <router-view/>

    </div>   
      
    <div class="tv" style="left: 10%;">
      <span class="tv-antenna"></span><span class="tv-antenna"></span>
      <span class="tv-shell">
        <span class="tv-screen"></span>
        <div class="tv-panel">
          <span class="tv-button"></span>
          <span class="tv-button"></span>
        </div>
        </span>
    </div>

    <div class="tv tv-2" style="left: 80%;">
      <span class="tv-antenna"></span><span class="tv-antenna"></span>
      <span class="tv-shell">
        <span class="tv-screen"></span>
        <div class="tv-panel">
          <span class="tv-button"></span>
          <span class="tv-button"></span>
        </div>
        </span>
    </div>

    <div class="tv tv-3" style="left: 50%;">
      <span class="tv-antenna"></span><span class="tv-antenna"></span>
      <span class="tv-shell">
        <span class="tv-screen"></span>
        <div class="tv-panel">
          <span class="tv-button"></span>
          <span class="tv-button"></span>
        </div>
      </span>
    </div>
      
    
    <span class="tv-drag">You can drag and move a TV !</span>
    <span class="images-credit">Background by <a href="https://www.pexels.com/fr-fr/@donghuangmingde">Huỳnh Đạt</a></span>

  </div>
</template>

<script>
import GamesData from '../mixins/GamesData'
import DragElement from '../mixins/DragElement'

export default {
  name: 'Home',
  mixins: [GamesData, DragElement],
  mounted() {

    let appHeight = document.querySelector('#app').clientHeight;
    let appWidth = document.querySelector('#app').clientWidth;

    document.querySelectorAll(".tv").forEach(tv => {

      let originalTvTopPosition = appHeight - tv.clientHeight;

      this.dragElement(tv, appHeight, appWidth, tv.clientHeight, tv.clientWidth);

      window.addEventListener('resize', () => {
        appHeight = document.querySelector('#app').clientHeight;
        appWidth = document.querySelector('#app').clientWidth;
        this.dragElement(tv, appHeight, appWidth, tv.clientHeight, tv.clientWidth);
      })

        function makeTvFall() {
          let actualTopPosition = parseInt(tv.style.top.substring(0, tv.style.top.length -2));
          let distanceFromGround = parseInt(originalTvTopPosition - actualTopPosition);

          const sleep = (time) => {
            return new Promise(resolve => setTimeout(resolve, time))
          }

          const comeDown = async () => {
            for(let i = 0; i < distanceFromGround; i++ ) {
              await sleep(0);
              tv.style.top = (actualTopPosition + i) + "px";
            }
            
            tv.style.top = null;
            tv.style.bottom = 0;
            let leftPositionToPercentage = tv.style.left.substring(0, tv.style.left.length -2) / appWidth * 100;
            tv.style.left = Math.ceil(leftPositionToPercentage) + "%";

            tv.children[0].classList.add('tv-antenna-broken');
            tv.children[1].classList.add('tv-antenna-broken');
            tv.children[2].children[1].classList.add('tv-panel-broken');
            tv.children[2].children[0].classList.add('tv-screen-broken');

            let tvDragtext = document.querySelector('.tv-drag');

            switch(tvDragtext.innerText) {
              case "You can drag and move a TV !":
                tvDragtext.innerText = "There, you broke it, be gentle with it.";
                break;
              case "There, you broke it, be gentle with it.":
                tvDragtext.innerText = "Wow thanks, really 🙄"
                break;
            }
          } 

          comeDown();
        } 

      tv.addEventListener('click', () => { makeTvFall() });
      tv.addEventListener('touchend', () => { makeTvFall() });

    })
  }
  
}
</script>

<style scoped lang="scss">
  #homepage {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: no-repeat center url('../assets/images/pexels-huỳnh-đạt-2251206.jpg');
    background-size: cover;
  }

  #nav {
    overflow-y: scroll;
    margin: auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    a {
      font-weight: bold;
      color: white;
      text-decoration: none;
    }
  }

  .game-card {
    width: 500px;
    height: 200px;
    border-radius: 0.5em;
    box-sizing: border-box;
    margin: 1em 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2em;
    background-color: rgba(black, 0.8);
    position: relative;

    @media (max-width: 768px) {
      width: 250px;
      padding: 0.2em;
    }

    &:hover {
      border: 1px solid white;
    }
  }

  .tv-drag {
    align-self: center;
    z-index: 50;
    background: rgba(white, 0.8);
    border-radius: 0.2em;
  }

  .tv {
    cursor: move;
    position: absolute;
    bottom: 0;
    z-index: 10;
    margin-bottom: 0.2em;

    &-2 {
      @media (max-width: 767px), (max-height: 500px) {
        display: none;
      }  
    }

    &-3 {
      @media (max-width: 1023px), (max-height: 500px) {
        display: none;
      }  
    }

    & * {
      pointer-events: none;
      transition: all 200ms ease-out ;

    }

    &-antenna {
      display: inline-block;
      width: 3px;
      height: 20px;
      background-color: black;
      box-shadow: 0px 0px 5px white;

      &:nth-child(1) {
        transform: translate(15px, 10px) rotate(-25deg);
      }

      &:nth-child(2) {
        transform: translate(25px, 10px) rotate(25deg);
      }

      &-broken {
        &:nth-child(1) {
          transform: translate(15px, 15px) rotate(-45deg) !important;
        }
      }
    }

    &-shell {
      display: inline-block;
      width: 100px;
      height: 80px;
      border: 1px solid black;
      border-radius: 0.5em;
      background-color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 0px 5px white;
      position: relative;
      z-index: 50;
    }

    &-screen {
      display: inline-block;
      width: 70px;
      height: 60px;
      border-radius: 0.2em;
      background-color: grey;
      margin-left: 5px;
      box-shadow: inset 0px 0px 10px black;

      &-broken {
          background-color: black;
          animation: blinkingTv 200ms ease-in-out  1 forwards;
      }
    }

    &-panel {
      display: flex;
      width: 15px;
      height: 60px;
      flex-direction: column;
      align-items: center;
      background: rgba(grey, 0.5);
      border-radius: 0.2em;
      margin-left: 0.2em;

      &-broken {
        span {

          &:nth-child(1) {
            transform: rotate(30deg) ;
          }

          &:nth-child(2) {
            transform: translate(0px, 30px) rotate(180deg) ;
          }
        }
      }
    }

    &-button {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 0.2em;
      background-color: grey;
      margin-top: 10px;
    }
  }

  @keyframes blinkingTv {
    0% {background-color: black;}
    5% {background-color: white;}
    10% {background-color: black;}
    15% {background-color: white;}
    20% {background-color: black;}
    30% {background-color: white;}
    40% {background-color: black;}
    50% {background-color: white;}
    60% {background-color: black;}
    80% {background-color: white;}
    90% {background-color: white;}
    100% {background-color: rgba(white, 0.15);}
  }
</style>
