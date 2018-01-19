var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import VBtn from '~components/VBtn';
import VCard from '~components/VCard';
import VMenu from '~components/VMenu';
import { test } from '~util/testing';

// TODO: Most of these have exactly the same snapshots
test('VMenu.js', function (_ref) {
  var mount = _ref.mount;

  it('should work', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper, activator, input;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VMenu, {
              propsData: {
                value: false
              },
              slots: {
                activator: [VBtn],
                default: [VCard]
              }
            });
            activator = wrapper.find('.menu__activator')[0];
            input = jest.fn();

            wrapper.instance().$on('input', input);
            activator.trigger('click');

            _context.next = 7;
            return wrapper.vm.$nextTick();

          case 7:

            expect(input).toBeCalledWith(true);
            expect(wrapper.html()).toMatchSnapshot();
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should render component with custom top and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        top: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom bottom and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        bottom: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom left and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        left: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom right and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        right: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom fullWidth and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        fullWidth: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom auto and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        auto: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom offsetX and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        offsetX: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom offsetY and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        offsetY: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom disabled and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        disabled: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom maxHeight and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        maxHeight: 100
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom nudgeTop and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        nudgeTop: 100
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom nudgeBottom and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        nudgeBottom: 100
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom nudgeLeft and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        nudgeLeft: 100
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom nudgeRight and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        nudgeRight: 100
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom nudgeWidth and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        nudgeWidth: 100
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom openOnClick and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        openOnClick: false
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom openOnHover and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        openOnHover: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom lazy and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        lazy: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom closeOnClick and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        closeOnClick: false
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom closeOnContentClick and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        closeOnContentClick: false
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom activator and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        activator: [VBtn]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom origin and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        origin: 'top right'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom transition and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        transition: 'fade-transition'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom positionX and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        positionX: 100
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom positionY and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        positionY: 100
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom positionAbsolutely and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        positionAbsolutely: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom maxWidth and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        maxWidth: 100
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should render component with custom minWidth and match snapshot', function () {
    var wrapper = mount(VMenu, {
      propsData: {
        minWidth: 100
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });
});