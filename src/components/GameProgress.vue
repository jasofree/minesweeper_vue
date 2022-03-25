<script setup>
import { computed } from 'vue';
import { useGameStore } from './../stores/game';

const store = useGameStore();

const restart = function() {
  store.setMode(store.mode);
};

const progressNumberPad = function(number) {
  return new String(number).padStart(3, '0');
};

const numberMinesToDiscoverPadded = computed(() => {
  return progressNumberPad(store.numberMinesToDiscover);
});

const numberMinesDiscoveredPadded = computed(() => {
  return progressNumberPad(store.numberMinesDiscovered);
});

</script>

<template>
  <div id="game_progress">
    <div class="number_mines_discovered">{{ numberMinesDiscoveredPadded }}</div>
    <div 
      class="state"
      :class="{ game_over: store.game_over }"
      v-html="store.progressCharacter"
      @click="restart()"
    ></div>
    <div class="number_mines_to_discover">{{ numberMinesToDiscoverPadded }}</div>
  </div>
</template>

<style scoped>
  #game_progress {
    background-color: #000;
    border: 20px solid #bbb;
    border-bottom-width: 0;
    border-radius: 4px 4px 0 0;
    color: limegreen;
    display: flex;
    font-family: 'Roboto Mono', monospace;
    font-size: 32px;
    height: 40px;
  }
    
  #game_progress .number_mines_to_discover {
    align-items: center;
    display: flex;
    flex-grow: 1;
    justify-content: center;
  }
    
  #game_progress .state {
    align-items: center;
    border: 20px solid #bbb;
    border-bottom-width: 0;
    border-top-width: 0;
    display: flex;
    justify-content: center;
    pointer-events: none;
    min-width: 40px;
    width: 40px;
  }

  #game_progress .state.game_over {
    cursor: pointer;
    pointer-events: all;
  }
    
  #game_progress .number_mines_discovered {
    align-items: center;
    display: flex;
    flex-grow: 1;
    justify-content: center;
  }
</style>
