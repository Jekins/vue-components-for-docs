var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { mount } from 'avoriaz';
import VSnackbar from '~components/VSnackbar';

describe('VSnackbar.vue', function () {
  it('should have a snack class', function () {
    var wrapper = mount(VSnackbar);

    expect(wrapper.hasClass('snack')).toBe(true);
  });

  it('should have a color class', function () {
    var wrapper = mount(VSnackbar, {
      propsData: {
        color: 'orange lighten-2'
      }
    });

    expect(wrapper.hasClass('orange')).toBe(true);
    expect(wrapper.hasClass('lighten-2')).toBe(true);
  });

  it('should have a snack__content class only when active', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VSnackbar, {
              propsData: {
                value: false,
                timeout: 1000
              }
            });


            expect(wrapper.find('div .snack__content')).toHaveLength(0);

            wrapper.setProps({ value: true });

            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:

            expect(wrapper.find('div .snack__content')).toHaveLength(1);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should timeout correctly', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper, value;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            jest.useFakeTimers();
            wrapper = mount(VSnackbar, {
              propsData: {
                value: false,
                timeout: 3141
              }
            });
            value = jest.fn();


            wrapper.instance().$on('input', value);
            wrapper.setProps({ value: true });
            wrapper.update();

            _context2.next = 8;
            return wrapper.vm.$nextTick();

          case 8:

            expect(setTimeout.mock.calls).toHaveLength(1);
            expect(setTimeout.mock.calls[0][1]).toBe(3141);

            jest.runAllTimers();

            _context2.next = 13;
            return wrapper.vm.$nextTick();

          case 13:

            expect(wrapper.data().isActive).toBe(false);
            expect(value).toBeCalledWith(false);

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should timeout correctly when initial value is true', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper, value;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            jest.useFakeTimers();
            wrapper = mount(VSnackbar, {
              propsData: {
                value: true,
                timeout: 3141
              }
            });
            value = jest.fn();


            wrapper.instance().$on('input', value);

            _context3.next = 6;
            return wrapper.vm.$nextTick();

          case 6:

            expect(setTimeout.mock.calls).toHaveLength(1);
            expect(setTimeout.mock.calls[0][1]).toBe(3141);

            jest.runAllTimers();

            _context3.next = 11;
            return wrapper.vm.$nextTick();

          case 11:

            expect(wrapper.data().isActive).toBe(false);
            expect(value).toBeCalledWith(false);

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));
});