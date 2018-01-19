import { test } from '~util/testing';
import { VBreadcrumbs, VBreadcrumbsItem } from '~components/VBreadcrumbs';
import { mount } from 'avoriaz';
import Vue from 'vue';
import { compileToFunctions } from 'vue-template-compiler';

test('VBreadcrumbs.js', function () {
  it('should have breadcrumbs classes', function () {
    var wrapper = mount(VBreadcrumbs);

    expect(wrapper.hasClass('breadcrumbs')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should inject slot to children', function () {
    var _compileToFunctions = compileToFunctions('\n      <v-breadcrumbs>\n        <v-breadcrumbs-item v-for="i in 4" :key="i"/>\n      </v-breadcrumbs>\n    '),
        render = _compileToFunctions.render;

    var component = Vue.component('test', {
      components: {
        VBreadcrumbs: VBreadcrumbs, VBreadcrumbsItem: VBreadcrumbsItem
      },
      render: render
    });
    var wrapper = mount(component);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should use a custom divider slot', function () {
    var _compileToFunctions2 = compileToFunctions('\n      <v-breadcrumbs>\n        <template slot="divider">/divider/</template>\n        <v-breadcrumbs-item/>\n        <v-breadcrumbs-item/>\n      </v-breadcrumbs>\n    '),
        render = _compileToFunctions2.render;

    var component = Vue.component('test', {
      components: {
        VBreadcrumbs: VBreadcrumbs, VBreadcrumbsItem: VBreadcrumbsItem
      },
      render: render
    });
    var wrapper = mount(component);

    expect(wrapper.html()).toMatchSnapshot();
  });

  // TODO: Inline styles not working in jest?
  it('should use custom justify props', function () {
    var wrapper = mount(VBreadcrumbs);

    wrapper.setProps({ justifyCenter: true, justifyEnd: false });
    expect(wrapper.html()).toMatchSnapshot();

    wrapper.setProps({ justifyCenter: false, justifyEnd: true });
    expect(wrapper.html()).toMatchSnapshot();
  });
});