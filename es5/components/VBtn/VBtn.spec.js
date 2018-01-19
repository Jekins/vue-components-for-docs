import { mount } from 'avoriaz';
import Vue from 'vue';
import VBtn from '~components/VBtn';

var stub = {
  name: 'router-link',
  render: function render(h) {
    return h('button');
  }
};

describe('VBtn.js', function () {
  it('should render component and match snapshot', function () {
    var wrapper = mount(VBtn);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render an <a> tag when using href prop', function () {
    var wrapper = mount(VBtn, {
      propsData: {
        href: 'http://www.google.com'
      }
    });

    expect(wrapper.is('a')).toBe(true);
    expect(wrapper.getAttribute('href')).toBe('http://www.google.com');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a <button> tag when using to prop', function () {
    var instance = Vue.extend();
    instance.component('router-link', stub);

    var wrapper = mount(VBtn, {
      propsData: {
        to: '/home'
      },
      instance: instance
    });

    expect(wrapper.is('button')).toBe(true);
    expect(wrapper.vm.$props.to).toBe('/home');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render specified tag when using tag prop', function () {
    var wrapper = mount(VBtn, {
      propsData: {
        tag: 'a'
      }
    });

    expect(wrapper.is('a')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});