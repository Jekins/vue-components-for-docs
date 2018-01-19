import { VList, VListGroup } from '~components/VList';
import { test } from '~util/testing';

// TODO: Test actual behaviour instead of classes
test('VListGroup.js', function (_ref) {
  var mount = _ref.mount;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VList, {
      slots: {
        default: [VListGroup]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a lazy component and match snapshot', function () {
    var wrapper = mount(VList, {
      propsData: {
        lazy: true
      },
      slots: {
        default: [VListGroup]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a component with no padding for action icon and match snapshot', function () {
    var wrapper = mount(VList, {
      propsData: {
        noAction: true
      },
      slots: {
        default: [VListGroup]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a component with route namespace and match snapshot', function () {
    var $route = { path: '' };
    var wrapper = mount(VList, {
      propsData: {
        group: 'listGroup'
      },
      slots: {
        default: [VListGroup]
      },
      globals: {
        $route: $route
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});