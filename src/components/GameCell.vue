<script setup>
import { useGameStore } from './../stores/game';

const props = defineProps({
  item: Object
});

const store = useGameStore();

const cellCharacters = {
  bomb: "&#x1F4A3;",
  flag: "&#x1F6A9;",
};

const handleClick = function(event) {
  if (store.game_over) {
    event.preventDefault();
    event.stopPropagation();
  }
  else if (!store.getCellData(props.item.row, props.item.column).isCleared) {
    const isBomb = props.item.isBomb;
    if (isBomb) {
      store.setCellHtml(props.item.row, props.item.column, cellCharacters.bomb);
    }
    else {
      store.setCellCleared(props.item.row, props.item.column);
      const numberNeighborBombs = props.item.numberNeighborBombs;
      const iHaveNeighborBombs = numberNeighborBombs > 0;
      if (iHaveNeighborBombs) {
        store.setCellHtml(props.item.row, props.item.column, numberNeighborBombs);
      }
    }
  }
};

const handleRightClick = function(event) {
  store.setCellFlagged(props.item.row, props.item.column);
  store.setCellHtml(props.item.row, props.item.column, cellCharacters.flag);
  const isBomb = props.item.isBomb;
  if (isBomb) {
    store.incrementMinesDiscovered();
    if (store.checkGameShouldBeFinished) {
      store.finishGame(true);
    }
  }
  else {
    store.finishGame(false);
  }
};
</script>

<template>
  <div
    class="game_cell"
    :class="{cleared: store.getCellData(item.row, item.column).isCleared, flagged: store.getCellData(item.row, item.column).isFlagged}"
    :data-row="item.row"
    :data-column="item.column"
    :data-is-bomb="item.isBomb"
    :data-number-neighbor-bombs="item.numberNeighborBombs"
    v-html="store.getCellData(item.row, item.column).html"
    @click="handleClick()"
    @contextmenu.prevent="handleRightClick()"
  ></div>
</template>

<style scoped>
  #game_cells_container .game_cell {
    align-items: center;
    background-color: #bbb;
    border: 2px ridge #bbb;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 30px;
    justify-content: center;
    width: 30px;
  }

  #game_cells_container .game_cell.cleared {
    border: 2px ridge #fff;
    background-color: #eee;
  }

  #game_cells_container .game_cell.flagged {
    border: 2px ridge #fff;
    background-color: #eee;
  }
</style>
