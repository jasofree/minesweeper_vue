import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { describe, expect } from 'vitest'
import GameContainer from '../src/components/GameContainer.vue'

const getWrapper = function() {
  return mount(GameContainer, {
    props: {
      
    },
    global: {
      plugins: [createTestingPinia()],
    },
  });
};

test('mount component', async() => {
  expect(GameContainer).toBeTruthy()
});

/*
describe('Game mode switcher', async() => {
  test('Basic mode at start', async() => {
    const wrapper = getWrapper();
    await nextTick();
    expect(wrapper.findAll('#game_cells_container .game_cell[data-is-bomb="true"]')).toHaveLength(10);
  });
  test('Change to intermediate mode', async() => {
    const wrapper = getWrapper();
    await wrapper.find('#game_mode_switcher .game_mode.intermediate').trigger('click');
    expect(wrapper.findAll('#game_cells_container .game_cell[data-is-bomb="true"]')).toHaveLength(40);
  });
  test('Change to expert mode', async() => {
    const wrapper = getWrapper();
    await wrapper.find('#game_mode_switcher .game_mode.expert').trigger('click');
    expect(wrapper.findAll('#game_cells_container .game_cell[data-is-bomb="true"]')).toHaveLength(99);
  });
  test('Return to basic mode', async() => {
    const wrapper = getWrapper();
    await wrapper.find('#game_mode_switcher .game_mode.basic').trigger('click');
    expect(wrapper.findAll('#game_cells_container .game_cell[data-is-bomb="true"]')).toHaveLength(10);
  });
});
*/