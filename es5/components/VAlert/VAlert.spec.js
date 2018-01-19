var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '~util/testing';
import VAlert from '~components/VAlert';
import VIcon from '~components/VIcon';

test('VAlert.vue', function (_ref) {
  var mount = _ref.mount;

  it('should be closed by default', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VAlert);


            expect(wrapper.vm.isActive).toBe(false);
            expect(wrapper.html()).toMatchSnapshot();

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should have a close icon', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VAlert, {
              propsData: { dismissible: true }
            });


            expect(wrapper.html()).toMatchSnapshot();

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should be dismissible', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper, icon, input;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(VAlert, {
              propsData: {
                value: true,
                dismissible: true
              }
            });
            icon = wrapper.find('.alert__dismissible')[0];
            input = jest.fn(function (value) {
              return wrapper.setProps({ value: value });
            });

            wrapper.vm.$on('input', input);

            icon.trigger('click');
            expect(input).toBeCalledWith(false);
            expect(wrapper.html()).toMatchSnapshot();

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should have a custom icon', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper, icon;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(VAlert, {
              propsData: {
                value: true,
                icon: 'list'
              }
            });
            icon = wrapper.find('.alert__icon')[0];


            expect(icon.text()).toBe('list');

          case 3:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should have no icon', function () {
    var wrapper = mount(VAlert);

    expect(wrapper.contains('.icon')).toBe(false);
  });

  it('should display contextual colors by type', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            wrapper = mount(VAlert, {
              propsData: {
                type: 'error'
              }
            });


            expect(wrapper.vm.classes.error).toBe(true);

            wrapper.setProps({ 'type': 'success' });
            _context5.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.vm.classes.success).toBe(true);

            wrapper.setProps({ 'type': 'warning' });
            _context5.next = 9;
            return wrapper.vm.$nextTick();

          case 9:
            expect(wrapper.vm.classes.warning).toBe(true);

            wrapper.setProps({ 'type': 'info' });
            _context5.next = 13;
            return wrapper.vm.$nextTick();

          case 13:
            expect(wrapper.vm.classes.info).toBe(true);

          case 14:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('should allow overriding color for contextual alert', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            wrapper = mount(VAlert, {
              propsData: {
                type: 'error',
                color: 'primary'
              }
            });


            expect(wrapper.vm.classes.primary).toBe(true);

          case 2:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  })));

  it('should allow overriding icon for contextual alert', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var wrapper, icon;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            wrapper = mount(VAlert, {
              propsData: {
                type: 'error',
                icon: 'block'
              }
            });
            icon = wrapper.find('.alert__icon')[0];


            expect(icon.text()).toBe('block');

          case 3:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, _this);
  })));
});