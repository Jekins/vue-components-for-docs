import { test } from '~util/testing';
import { mount } from 'avoriaz';
import VTabsSlider from '~components/VTabs/VTabsSlider.js';

test('VTabsSlider.vue', function () {
  it('should render a tabs slider', function () {
    var wrapper = mount(VTabsSlider, {
      propsData: {
        color: 'blue lighten-1'
      }
    });

    expect(wrapper.element.classList).toContain('blue');
    expect(wrapper.element.classList).toContain('lighten-1');
  });
});