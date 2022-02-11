<template>

    <div id="hide-area">

      <svg>
        <rect width="100%" height="100%" fill="white"/>
      </svg>

      <svg>
        <defs>
            <clipPath id="cursorMask">
              <circle id="search" cx="50%" cy="50%" r="80" fill="black"/>
            </clipPath>
        </defs>
        <g clip-path="url(#cursorMask)">
          <rect width="100%" height="100%" fill="lightgrey"/>
          <image id="donkey" href="@/assets/images/donkey.png" x="0" y="0" width="150" height="150" alt="" />
        </g>


      </svg>

    </div>

</template>

<script>
// @ is an alias to /src

export default {
  name: 'FindTheDonkey',
  methods: {
    donkeyRandomY() {
      return Math.round(Math.random() * (80 - 10) + 10);
    },
    donkeyRandomX() {
      return Math.round(Math.random() * (80 - 10) + 10);
    },
    placeTheDonkey() {
      let donkeyY = this.donkeyRandomY();
      let donkeyX = this.donkeyRandomX();

      let donkey = document.getElementById('donkey');
      donkey.setAttribute('y', `${donkeyY}%`);
      donkey.setAttribute('x', `${donkeyX}%`);

    },
    followTheCursor() {

      let light = document.getElementById('search');

      document.addEventListener('mousemove', (e) => {
        light.setAttribute('cy', e.pageY - 25);
        light.setAttribute('cx', e.pageX - 80);
      });
    },
    foundTheDonkey() {
      document.querySelector('#donkey').addEventListener('click', () => {
        alert('Ouaiiis')

      })
    }
  },
  mounted () {
    this.placeTheDonkey();
    this.followTheCursor();
    this.foundTheDonkey();
  }
}
</script>

<style lang="scss" scoped>
#donkey {
  cursor: pointer;
}

#hide-area {
  cursor: move;
  margin: auto;
  position: relative;
  border: 1px solid black;
  border-radius: 5em;
  position: relative;
  flex: 1;
  width: 90%;
}

svg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5em;

}

</style>
