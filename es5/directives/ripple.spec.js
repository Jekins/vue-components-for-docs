import Vue from 'vue';
import { test } from '~util/testing';
import { mount } from 'avoriaz';
import Ripple from '~directives/ripple';

test('VRipple', function () {
  it('Ripple with no value should render data attribute true', function () {
    var testComponent = Vue.component('test', {
      directives: {
        Ripple: Ripple
      },
      render: function render(h) {
        var data = {
          directives: [{
            name: 'ripple'
          }]
        };
        return h('div', data);
      }
    });

    var wrapper = mount(testComponent);

    var div = wrapper.find('div')[0];
    expect(div.getAttribute('data-ripple')).toBe('true');
  });

  it('Ripple should update data attribute reactively', function () {
    var testComponent = Vue.component('test', {
      directives: {
        Ripple: Ripple
      },
      props: {
        ripple: Boolean,
        default: false
      },
      render: function render(h) {
        var data = {
          directives: [{
            name: 'ripple',
            value: this.ripple
          }]
        };
        return h('div', data);
      }
    });

    var wrapper = mount(testComponent, {
      propsData: {
        ripple: true
      }
    });

    var div = wrapper.find('div')[0];
    expect(div.getAttribute('data-ripple')).toBe('true');

    wrapper.setProps({ ripple: false });
    expect(div.getAttribute('data-ripple')).toBe('false');

    wrapper.setProps({ ripple: true });
    expect(div.getAttribute('data-ripple')).toBe('true');
  });
});