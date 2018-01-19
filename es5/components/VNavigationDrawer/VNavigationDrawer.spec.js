var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import VApp from '~components/VApp';
import VNavigationDrawer from '~components/VNavigationDrawer';
import { test } from '~util/testing';
import { mount } from 'avoriaz';

var resizeWindow = function resizeWindow() {
  var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : global.innerWidth;
  var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : global.innerHeight;

  global.innerWidth = width;
  global.innerHeight = height;
  global.dispatchEvent(new Event('resize'));
  return new Promise(function (resolve) {
    return setTimeout(resolve, 200);
  });
};

beforeEach(function () {
  return resizeWindow(1920, 1080);
});

test('VNavigationDrawer', function () {
  // v-app is needed to initialise $vuetify.application
  var app = mount(VApp);

  it('should become temporary when the window resizes', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VNavigationDrawer);


            expect(wrapper.vm.isActive).toBe(true);
            _context.next = 4;
            return resizeWindow(1200);

          case 4:
            expect(wrapper.vm.isActive).toBe(false);
            expect(wrapper.vm.overlay).toBeFalsy();

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should not resize the content when temporary', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VNavigationDrawer, { propsData: {
                app: true,
                temporary: true,
                value: true
              } });
            _context2.next = 3;
            return wrapper.vm.$nextTick();

          case 3:
            expect(wrapper.vm.$vuetify.application.left).toBe(0);
            expect(wrapper.vm.overlay).toBeTruthy();

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should not resize the content when permanent and stateless', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(VNavigationDrawer, { propsData: {
                app: true,
                permanent: true,
                stateless: true
              } });
            _context3.next = 3;
            return wrapper.vm.$nextTick();

          case 3:
            expect(wrapper.vm.$vuetify.application.left).toBe(300);

            _context3.next = 6;
            return resizeWindow(1200);

          case 6:
            expect(wrapper.vm.$vuetify.application.left).toBe(300);
            expect(wrapper.vm.overlay).toBeFalsy();

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should not resize the content when permanent and resize watcher is disabled', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(VNavigationDrawer, {
              propsData: {
                app: true,
                permanent: true,
                disableResizeWatcher: true
              }
            });
            _context4.next = 3;
            return wrapper.vm.$nextTick();

          case 3:
            expect(wrapper.vm.$vuetify.application.left).toBe(300);

            _context4.next = 6;
            return resizeWindow(1200);

          case 6:
            expect(wrapper.vm.$vuetify.application.left).toBe(300);
            expect(wrapper.vm.overlay).toBeFalsy();

          case 8:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should stay active when resizing a temporary drawer', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            wrapper = mount(VNavigationDrawer, {
              propsData: {
                app: true,
                temporary: true,
                value: true
              }
            });
            _context5.next = 3;
            return wrapper.vm.$nextTick();

          case 3:

            expect(wrapper.vm.isActive).toBe(true);
            expect(wrapper.vm.overlay).toBeTruthy();

            _context5.next = 7;
            return resizeWindow(1200);

          case 7:

            expect(wrapper.vm.isActive).toBe(true);
            expect(wrapper.vm.overlay).toBeTruthy();

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('should open when changed to permanent', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            wrapper = mount(VNavigationDrawer, {
              propsData: {
                value: null
              }
            });


            wrapper.setProps({ permanent: true });

            _context6.next = 4;
            return wrapper.vm.$nextTick();

          case 4:

            expect(wrapper.vm.isActive).toBe(true);

          case 5:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  })));

  it('should not close when value changes and permanent', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            wrapper = mount(VNavigationDrawer, {
              propsData: {
                permanent: true,
                value: true
              }
            });


            wrapper.setProps({ value: false });

            _context7.next = 4;
            return wrapper.vm.$nextTick();

          case 4:

            expect(wrapper.vm.isActive).toBe(true);

          case 5:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, _this);
  })));

  it('should update content padding when temporary state is changed', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            wrapper = mount(VNavigationDrawer, { propsData: {
                app: true
              } });


            expect(wrapper.vm.$vuetify.application.left).toBe(300);

            wrapper.setProps({ temporary: true });
            expect(wrapper.vm.$vuetify.application.left).toBe(0);

            wrapper.setProps({ temporary: false });
            expect(wrapper.vm.$vuetify.application.left).toBe(300);

          case 6:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, _this);
  })));

  it('should update content padding when permanent state is changed', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return resizeWindow(800);

          case 2:
            wrapper = mount(VNavigationDrawer, { propsData: {
                app: true
              } });


            expect(wrapper.vm.$vuetify.application.left).toBe(0);

            wrapper.setProps({ permanent: true });
            expect(wrapper.vm.$vuetify.application.left).toBe(300);

            wrapper.setProps({ permanent: false });
            expect(wrapper.vm.$vuetify.application.left).toBe(0);

          case 8:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, _this);
  })));

  it('should update content padding when miniVariant is changed', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            wrapper = mount(VNavigationDrawer, { propsData: {
                app: true
              } });


            expect(wrapper.vm.$vuetify.application.left).toBe(300);

            wrapper.setProps({ miniVariant: true });
            expect(wrapper.vm.$vuetify.application.left).toBe(80);

            wrapper.setProps({ miniVariant: false });
            expect(wrapper.vm.$vuetify.application.left).toBe(300);

          case 6:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, _this);
  })));

  it('should not remain mobile when temporary is toggled', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return resizeWindow(800);

          case 2:
            wrapper = mount(VNavigationDrawer, { propsData: {
                temporary: true
              } });
            _context11.next = 5;
            return resizeWindow(1920);

          case 5:
            expect(wrapper.vm.isMobile).toBe(false);

          case 6:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, _this);
  })));

  it('should stay closed when mobile and temporary is enabled', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return resizeWindow(800);

          case 2:
            wrapper = mount(VNavigationDrawer);
            input = jest.fn(function (value) {
              return wrapper.setProps({ value: value });
            });

            wrapper.vm.$on('input', input);

            wrapper.setProps({ temporary: true });
            _context12.next = 8;
            return wrapper.vm.$nextTick();

          case 8:

            expect(wrapper.vm.isActive).toBe(false);
            expect(input.mock.calls).toHaveLength(0);

          case 10:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, _this);
  })));

  it('should update content padding when mobile is toggled', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var input, wrapper;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            input = jest.fn();
            wrapper = mount(VNavigationDrawer, { propsData: {
                app: true,
                fixed: true,
                value: true
              } });


            wrapper.vm.$on('input', input);
            expect(wrapper.vm.$vuetify.application.left).toBe(300);
            _context13.next = 6;
            return resizeWindow(800);

          case 6:
            expect(wrapper.vm.$vuetify.application.left).toBe(0);
            expect(wrapper.vm.isActive).toBe(false);
            expect(input).toBeCalledWith(false);
            wrapper.setProps({ value: false });
            _context13.next = 12;
            return wrapper.vm.$nextTick();

          case 12:
            wrapper.setProps({ value: true });
            _context13.next = 15;
            return wrapper.vm.$nextTick();

          case 15:
            expect(wrapper.vm.isActive).toBe(true);
            expect(wrapper.vm.$vuetify.application.left).toBe(0);
            _context13.next = 19;
            return resizeWindow(1920);

          case 19:
            expect(wrapper.vm.isActive).toBe(true);
            expect(wrapper.vm.isMobile).toBe(false);
            expect(wrapper.vm.$vuetify.application.left).toBe(300);

          case 22:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, _this);
  })));
});