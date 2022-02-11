<template>
    <div class="card-space">
        <div @click="flipCard" class="card flip-left" :data-card=title>
                <font-awesome-icon v-if="!isNumber" class="card-icon" :icon="['fas', iconName]" />
                <span v-if="isNumber" class="card-icon"> {{ iconName }} </span>
                <span class="card-name" >{{ title }}</span>
                <font-awesome-icon v-if="!isNumber" class="card-icon" :icon="['fas', iconName]" />
                <span v-if="isNumber" class="card-icon"> {{ iconName }} </span>
        </div>

        <div @click="flipBackCard" class="card-back flip-right"  :data-card=title>
                <font-awesome-icon  class="card-back-icon" :icon="['fas', 'dice-d20' ]" />
        </div>
    </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['title', 'iconName', 'isNumber'],
  methods: {
    flipCard(card) {

        let front;
        let back;

        if(card.target) {
            front = card.target
            back = card.target.nextSibling;
        } else {
            front = card
            back = card.nextSibling;
        }

        front.classList.add('flip-left');
        front.classList.remove('flip-right');
        back.classList.add('flip-right');
        back.classList.remove('flip-left');
        setTimeout(() => {
            back.classList.remove('card-back-down');
        }, 200)
    },
    flipBackCard(backCard) {

        let back = backCard.target;
        let front = backCard.target.previousElementSibling;

        back.classList.add('flip-left');
        back.classList.remove('flip-right');
        front.classList.add('flip-right');
        front.classList.remove('flip-left');
        setTimeout(() => {
            back.classList.add('card-back-down');
        }, 200)
    }
  }
}
</script>


<style lang="scss" scoped>

    .card-space {
        flex-basis: 12.5%;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
    }

    .card, .card-back {
        width: 140px;
        height: 200px;
        border: 2px solid black;
        border-radius: 1em;
        cursor: pointer;
        margin: 0.2em;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        pointer-events: auto;

        @media (max-width: 1024px)  {
          height: 140px;
        }
    }

    .card-back {
        background: black;
        position: absolute;

        &-down{
            z-index: -1;
        }

        &-icon {
            font-size: 2.5em;
            color: grey;
            pointer-events: none;
        }

    }

    .card {
        background: white;
        position: relative;

        &-name, &-icon {
            pointer-events: none;
            font-size: 1.5em;
            font-weight: bold;
            user-select: none;
            font-family: 'Times New Roman', Times, serif;
        }        
    }

    .found {
        animation: none !important;
        pointer-events: none;
    }

    .hide-back-card {
        display: none;
    }

    .flip {
        &-left {
            animation: flip-left 0.4s ease-in-out both;
        }

        &-right {
            animation: flip-right 0.4s ease-in-out both;
        }
    }


    @keyframes flip-left {
        0% {
            transform: rotateY(0);
        }
        100% {
            transform: rotateY(-180deg);
        }
    }

    @keyframes flip-right {
        0% {
            transform: rotateY(-180deg);
        }
        100% {
            transform: rotateY(0);
        }
    }

</style>
