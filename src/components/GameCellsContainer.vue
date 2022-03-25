<script setup>
import { ref, computed } from 'vue';
import { useGameStore } from './../stores/game';
import GameCell from './GameCell.vue';

const store = useGameStore();

let numberMinesRendered = 0;

const getGameCellData = function(gameCellsDataObject, row, column) {
  return gameCellsDataObject[`${row}_${column}`];
};

const iterateNeighborCells = function(row, column, extra_params_array, iterationFunction) {
  let cellRows = store.rows;
  let cellColumns = store.columns;
  for (let index_row = -1; index_row < 2; index_row++) {
    let neighbor_row = row + index_row;
    for (let index_column = -1; index_column < 2; index_column++) {
      if (index_row === 0 && index_column === 0) {
        continue;
      }
      let neighbor_column = column + index_column;
      if (neighbor_row > -1 && neighbor_row < cellRows && neighbor_column > -1 && neighbor_column < cellColumns) {
        iterationFunction.apply(this, [neighbor_row, neighbor_column].concat(extra_params_array));
      }
    }
  }
}

const countNeighborBombs = function(gameCellsDataObject, row, column) {
  let numberNeighborBombs = 0;
  iterateNeighborCells(row, column, [numberNeighborBombs], function(neighbor_row, neighbor_column) {
    let gameCellNeighborData = getGameCellData(gameCellsDataObject, neighbor_row, neighbor_column);
    if (gameCellNeighborData.isBomb) {
      numberNeighborBombs++;
    }
  });
  return numberNeighborBombs;
};

const clickNeighborsNoBombs = function(row, column) {
    row = parseInt(row);
    column = parseInt(column);
    iterateNeighborCells(row, column, [], function(neighbor_row, neighbor_column) {
        const gameCellNeighborData = getGameCellData(store.cellsData, neighbor_row, neighbor_column);
        const isBomb = gameCellNeighborData.isBomb;
        const isCleared = gameCellNeighborData.isCleared; // gameCellNeighborNode.classList.contains('cleared');
        const numberNeighborBombs = parseInt(gameCellNeighborData.numberNeighborBombs);
        const withoutNeighborBombs = numberNeighborBombs === 0;
        if (!isBomb && !isCleared) {
            // Simulate click
            store.setCellCleared(neighbor_row, neighbor_column);
            const numberNeighborBombs = gameCellNeighborData.numberNeighborBombs;
            const iHaveNeighborBombs = numberNeighborBombs > 0;
            if (iHaveNeighborBombs) {
              store.setCellHtml(neighbor_row, neighbor_column, numberNeighborBombs);
            }
            handleClick(gameCellNeighborData);
            // Simulate click
            if (withoutNeighborBombs) {
                clickNeighborsNoBombs(neighbor_row, neighbor_column);
            }
        }
    });
};

const configureGameCells = function() {
  let gameCellsDataObject = {};
  let cellRows = store.rows;
  let cellColumns = store.columns;
  for (let row = 0; row < cellRows; row++) {
    for (let column = 0; column < cellColumns; column++) {
      let randomBomb = Math.random() * (store.ratioMinesCells + 1 - 1) + 1;
      let areThereMinesLeft = numberMinesRendered < store.numberMinesToDiscover;
      let areThereSameOrMoreMinesLeftThanCellsLeft = areThereMinesLeft && ( store.numberMinesToDiscover - numberMinesRendered ) >= cellRows * cellColumns - ( cellColumns * row + column );
      let isBomb = areThereMinesLeft && (randomBomb <= 2 || areThereSameOrMoreMinesLeftThanCellsLeft);
      let gameCellData = {
        key: `${row}_${column}`,
        row: row,
        column: column,
        isBomb: isBomb,
        numberNeighborBombs: 0,
        isCleared: false,
        isFlagged: false,
        html: '',
      };
      if (isBomb) {
        numberMinesRendered++;
      }
      gameCellsDataObject[`${row}_${column}`] = gameCellData;
    }
  }
  for (let row = 0; row < cellRows; row++) {
    for (let column = 0; column < cellColumns; column++) {
      let gameCellData = gameCellsDataObject[`${row}_${column}`];
      if (!gameCellData.isBomb) {
        gameCellData.numberNeighborBombs = countNeighborBombs(gameCellsDataObject, row, column);
      }
    }
  }
  store.setCellsData(gameCellsDataObject);
};

const handleClick = function(cellData) {
  store.incrementCellsCleared();
  const iHaveNeighborBombs = cellData.numberNeighborBombs > 0;
  const isBomb = cellData.isBomb;
  if (isBomb) {
    finishGame(false);
  }
  else if (store.checkGameShouldBeFinished) {
    finishGame(true);
  }
  else if (!iHaveNeighborBombs) {
    let row = cellData.row;
    let column = cellData.column;
    clickNeighborsNoBombs(row, column);
  }
}

const finishGame = function(ok) {
  store.finishGame(ok);
};

store.$onAction(({ name, store, args, after, onError })=> {
  if (name === 'setMode') {
    after(() => {
      numberMinesRendered = 0;
      configureGameCells();
    });
  }
});

</script>

<template>
  <div
    id="game_cells_container"
    :class="{ game_over: store.game_over }"
  >
    <GameCell
      v-for="(cellData, index) in store.cellsData"
      :key="cellData.key"
      :index="index"
      :item="cellData"
      @bomb-clicked="finishGame(false)"
      @click="handleClick(cellData)"
    ></GameCell>
    <!--
    <div
      v-for="gameCellData in store.cellsData"
      :key="gameCellData.key"
      class="game_cell"
      :data-row="gameCellData.row"
      :data-column="gameCellData.column"
      :data-is-bomb="gameCellData.isBomb"
      :data-number-neighbor-bombs="gameCellData.numberNeighborBombs"
    ></div>
    -->
  </div>
</template>

<style scoped>
  #game_cells_container {
    border: 20px solid #bbb;
    border-radius: 0 0 4px 4px;
    display: flex;
    flex-wrap: wrap;
  }

  #game_cells_container.game_over {
    pointer-events: none;
  }
</style>
