<script setup>
import { computed } from 'vue';
import { useGameStore } from './../stores/game';
import GameProgress from './GameProgress.vue';
import GameCellsContainer from './GameCellsContainer.vue';
import GameModeSwitcher from './GameModeSwitcher.vue';

const store = useGameStore();

const gameModeClass = computed(() => {
  return `game_mode_${store.mode.id}`;
});

</script>

<template>
  <div
    id="game_container"
    :class="gameModeClass"
  >
    <GameProgress></GameProgress>
    <GameCellsContainer></GameCellsContainer>
    <GameModeSwitcher></GameModeSwitcher>
  </div>
</template>

<style scoped>
  #game_container.game_mode_basic {
    width: 280px;
  }
  
  #game_container.game_mode_intermediate {
    width: 520px;
  }
  
  #game_container.game_mode_expert {
    width: 940px;
  }
</style>
