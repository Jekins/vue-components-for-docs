import { test } from '~util/testing';
import { VBreadcrumbsItem } from '~components/VBreadcrumbs';

// TODO: Enable when Vue has optional injects
test.skip('VBreadcrumbsItem.js', function (_ref) {
  var mount = _ref.mount;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VBreadcrumbsItem);

    expect(wrapper.html()).toMatchSnapshot();
  });

  // TODO: Use vue-router or nuxt in tests
  it.skip('should have a custom active class', function () {
    var wrapper = mount(VBreadcrumbsItem, {
      propsData: {
        activeClass: 'breadcrumbs-item--active',
        to: '/'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});