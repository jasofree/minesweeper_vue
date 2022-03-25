import { defineStore, acceptHMRUpdate } from 'pinia';

const progressCharacters = {
  finish_ok: '&#x1F642;',
  ongoing: '&#x1F914;',
  finish_ko: '&#x1F614;',
};

export const useGameStore = defineStore('game', {
  state: () => ({
    mode: {},
    numberCellsCleared: 0,
    numberMinesDiscovered: 0,
    cellsData: {},
    progressCharacter: '',
    game_over: false,
  }),

  getters: {
    rows(state) {
      return state.mode.cellRows
    },
    columns(state) {
      return state.mode.cellColumns
    },
    numberMinesToDiscover(state) {
      return state.mode.bombs
    },
    numberCellsToRender(state) {
      return state.mode.rows * state.mode.columns
    },
    ratioMinesCells(state) {
      return Math.round(state.mode.cellRows * state.mode.cellColumns / state.mode.bombs)
    },
    getCellData(state) {
      return (row, column) => state.cellsData[`${row}_${column}`];
    },
    checkGameShouldBeFinished(state) {
      return (state.numberMinesToDiscover === state.numberMinesDiscovered && state.numberCellsCleared + state.numberMinesToDiscover === state.rows * state.columns);
    },
  },

  actions: {
    incrementCellsCleared() {
      this.numberCellsCleared++;
    },
    incrementMinesDiscovered() {
      this.numberMinesDiscovered++;
    },
    setCellsData(cellsDataObject) {
      this.cellsData = cellsDataObject;
    },
    setMode(mode) {
      this.mode = mode;
      this.numberCellsCleared = 0;
      this.numberMinesDiscovered = 0;
      this.progressCharacter = progressCharacters.ongoing;
      this.game_over = false;
    },
    startsGame() {
      this.progressCharacter = progressCharacters.ongoing;
      this.game_over = false;
    },
    setCellCleared(row, column) {
      this.cellsData[`${row}_${column}`].isCleared = true;
    },
    setCellFlagged(row, column) {
      this.cellsData[`${row}_${column}`].isFlagged = true;
    },
    setCellHtml(row, column, html) {
      this.cellsData[`${row}_${column}`].html = html;
    },
    finishGame(ok) {
      this.game_over = true;
      if (ok) {
        this.progressCharacter = progressCharacters.finish_ok;
      }
      else {
        this.progressCharacter = progressCharacters.finish_ko;
      }
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGameStore, import.meta.hot));
}
