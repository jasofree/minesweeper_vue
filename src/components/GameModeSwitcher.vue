<script setup>
import { computed, onMounted } from 'vue';
import { useGameStore } from './../stores/game';

defineProps({
  
});

const modes = [
  {
    id: 'basic',
    name: 'Principiante',
    cellRows: 8,
    cellColumns: 8,
    bombs: 10
  },
  {
    id: 'intermediate',
    name: 'Intermedio',
    cellRows: 16,
    cellColumns: 16,
    bombs: 40
  },
  {
    id: 'expert',
    name: 'Experto',
    cellRows: 16,
    cellColumns: 30,
    bombs: 99
  }
];

const store = useGameStore();
const changeModeSelected = function(mode) {
  store.setMode(mode);
};

onMounted(() => changeModeSelected(modes[0]));
</script>

<template>
  <div id="game_mode_switcher">
    <div 
    v-for="mode in modes"
    :key="mode.id"
    class="game_mode"
    :class="[mode.id, { active: store.mode.id === mode.id }]"
    :data-mode="mode.id"
    @click="changeModeSelected(mode)"
    >
    <div>{{ mode.name }}</div>
    <div>({{ mode.cellColumns }}x{{ mode.cellRows }}, {{ mode.bombs }} bombas)</div>
    </div>
  </div>
</template>

<style scoped>
  #game_mode_switcher {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-top: 4px;
  }
  
  #game_mode_switcher .game_mode {
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 20px;
    font-weight: 800;
    margin: 4px 0;
    opacity: 0.5;
    padding: 4px;
    pointer-events: all;
  }
  
  #game_mode_switcher .game_mode.active {
    cursor: default;
    opacity: 1;
    pointer-events: none;
    text-shadow: 2px 2px #777;
  }
  
  #game_mode_switcher .game_mode.basic {
    background-color: rgb(62, 145, 62);
  }
  
  #game_mode_switcher .game_mode.intermediate {
    background-color: rgb(145, 62, 62);
  }
  
  #game_mode_switcher .game_mode.expert {
    background-color: rgb(0, 0, 0);
  }
</style>
