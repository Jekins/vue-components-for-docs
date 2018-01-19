import { test } from '~util/testing';
import { VListTile } from '~components/VList';
import { compileToFunctions } from 'vue-template-compiler';
import Vue from 'vue/dist/vue.common';

var stub = {
  name: 'router-link',
  render: function render(h) {
    return h('button');
  }
};

test('VListTile.vue', function (_ref) {
  var mount = _ref.mount;

  it('should render with a div when inactive is true and href is used', function () {
    var wrapper = mount(VListTile, {
      propsData: {
        href: 'http://www.google.com',
        inactive: true
      }
    });

    expect(wrapper.is('li')).toBe(true);
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('a')).toHaveLength(0);
    expect(wrapper.find('.list__tile--link')).toHaveLength(0);
  });

  it('should render with a tag when tag is specified', function () {
    var wrapper = mount(VListTile, {
      propsData: {
        tag: 'code'
      }
    });

    expect(wrapper.is('li')).toBe(true);
    expect(wrapper.find('code')).toHaveLength(1);
  });

  it('should render with a div when href and to are not used', function () {
    var wrapper = mount(VListTile);

    expect(wrapper.is('li')).toBe(true);
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render <li> with <a> when using href prop', function () {
    var wrapper = mount(VListTile, {
      propsData: {
        href: 'http://www.google.com'
      }
    });

    var a = wrapper.find('a')[0];

    expect(wrapper.is('li')).toBe(true);
    expect(a.getAttribute('href')).toBe('http://www.google.com');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render <li> with <button> when using to prop', function () {
    var instance = Vue.extend();
    instance.component('router-link', stub);

    var wrapper = mount(VListTile, {
      propsData: {
        to: '/home'
      },
      instance: instance
    });

    expect(wrapper.is('li')).toBe(true);
    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not have activeClass when not toggled', function () {
    var wrapper = mount(VListTile, {
      propsData: {
        href: 'http://www.google.com'
      }
    });

    var link = wrapper.find('a')[0];
    expect(link.hasClass(wrapper.instance().activeClass)).toBe(false);
  });

  it('should have activeClass when toggled', function () {
    var wrapper = mount(VListTile, {
      propsData: {
        href: 'http://www.google.com',
        value: true
      }
    });

    var link = wrapper.find('a')[0];
    expect(link.hasClass(wrapper.instance().activeClass)).toBe(true);
  });

  it('should have --link class when href prop present', function () {
    var wrapper = mount(VListTile, {
      propsData: {
        href: '/home'
      }
    });

    expect(wrapper.contains('.list__tile--link')).toBe(true);
  });

  it('should have --link class when to prop present', function () {
    var instance = Vue.extend();
    instance.component('router-link', stub);

    var wrapper = mount(VListTile, {
      propsData: {
        to: '/home'
      },
      instance: instance
    });

    expect(wrapper.contains('.list__tile--link')).toBe(true);
  });

  it('should have --link class when click handler present', function () {
    var _compileToFunctions = compileToFunctions('\n      <v-list-tile @click="">Test</v-list-tile>\n    '),
        render = _compileToFunctions.render;

    var component = Vue.component('test', {
      components: {
        VListTile: VListTile
      },
      render: render
    });

    var wrapper = mount(component);

    expect(wrapper.contains('.list__tile--link')).toBe(true);
  });

  it('should have --link class when click.prevent.stop handler present', function () {
    var _compileToFunctions2 = compileToFunctions('\n      <v-list-tile @click.prevent.stop="">Test</v-list-tile>\n    '),
        render = _compileToFunctions2.render;

    var component = Vue.component('test', {
      components: {
        VListTile: VListTile
      },
      render: render
    });

    var wrapper = mount(component);

    expect(wrapper.contains('.list__tile--link')).toBe(true);
  });
});