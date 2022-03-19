import { mount } from '@vue/test-utils'
import HelloWorld from '../src/components/HelloWorld.vue'

test('mount component', async() => {
  expect(HelloWorld).toBeTruthy()
  const msg = 'Hello Vue 3 + Vite';
  const wrapper = mount(HelloWorld, {
    props: {
      msg: msg,
    },
  })

  expect(wrapper.find('h1').text()).toContain(msg);
  expect(wrapper.find('button').text()).toContain('count is: 0');
  await wrapper.find('button').trigger('click');
  expect(wrapper.find('button').text()).toContain('count is: 1');
})