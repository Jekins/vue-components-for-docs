import VBottomNav from './VBottomNav';
import VBtn from '../VBtn';
import { test } from '~util/testing';

test('VBottomNav.js', function (_ref) {
  var mount = _ref.mount;

  it('should have a bottom-nav class', function () {
    var wrapper = mount(VBottomNav, {
      slots: {
        default: [VBtn, VBtn]
      }
    });

    expect(wrapper.hasClass('bottom-nav')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have prop classes', function () {
    var wrapper = mount(VBottomNav, {
      propsData: {
        absolute: true,
        shift: true
      },
      slots: {
        default: [VBtn, VBtn]
      }
    });

    expect(wrapper.hasClass('bottom-nav--absolute')).toBe(true);
    expect(wrapper.hasClass('bottom-nav--shift')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should be hidden with a false value', function () {
    var wrapper = mount(VBottomNav, {
      propsData: { value: false },
      slots: {
        default: [VBtn, VBtn]
      }
    });

    expect(wrapper.hasClass('bottom-nav--active')).toBe(false);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should be visible with a true value', function () {
    var wrapper = mount(VBottomNav, {
      propsData: { value: true },
      slots: {
        default: [VBtn, VBtn]
      }
    });

    expect(wrapper.hasClass('bottom-nav--active')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should output active btn when clicked', function () {
    var wrapper = mount(VBottomNav, {
      propsData: { value: true, active: 1 },
      slots: {
        default: [VBtn, VBtn]
      }
    });

    var btn = wrapper.find('.btn')[0];

    var change = jest.fn();
    wrapper.instance().$on('update:active', change);

    btn.trigger('click');
    expect(change).toBeCalledWith(0);
  });
});