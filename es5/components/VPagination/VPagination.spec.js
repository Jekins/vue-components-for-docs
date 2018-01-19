var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '~util/testing';
import VPagination from './VPagination';

test('VPagination.vue', function (_ref) {
  var mount = _ref.mount;

  it('emits an event when next or previous is clicked', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper, previous, next, navigation;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            jest.useFakeTimers();
            wrapper = mount(VPagination, {
              propsData: {
                length: 5,
                value: 2
              }
            });

            jest.runAllTimers();

            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            previous = jest.fn();
            next = jest.fn();


            wrapper.instance().$on('previous', previous);
            wrapper.instance().$on('next', next);

            navigation = wrapper.find('.pagination__navigation');

            navigation[0].trigger('click');
            navigation[1].trigger('click');

            expect(next).toBeCalled();
            expect(previous).toBeCalled();
            expect(wrapper.html()).toMatchSnapshot();

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should render disabled buttons with length equals to 0', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            jest.useFakeTimers();
            wrapper = mount(VPagination, {
              propsData: {
                length: 0,
                value: 1
              }
            });

            jest.runAllTimers();

            expect(wrapper.html()).toMatchSnapshot();

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should only render start and end of range if length is big', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            jest.useFakeTimers();
            wrapper = mount(VPagination, {
              propsData: {
                length: 100
              }
            });

            jest.runAllTimers();

            _context3.next = 5;
            return wrapper.vm.$nextTick();

          case 5:

            expect(wrapper.html()).toMatchSnapshot();
            expect(wrapper.find('.pagination__more').length).toEqual(1);

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should only render middle of range if length is big and value is somewhere in the middle', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            jest.useFakeTimers();
            wrapper = mount(VPagination, {
              propsData: {
                length: 100,
                value: 50
              }
            });

            jest.runAllTimers();

            _context4.next = 5;
            return wrapper.vm.$nextTick();

          case 5:

            expect(wrapper.html()).toMatchSnapshot();
            expect(wrapper.find('.pagination__more').length).toEqual(2);

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should use totalVisible prop if defined', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            jest.useFakeTimers();
            wrapper = mount(VPagination, {
              propsData: {
                length: 100,
                value: 50,
                totalVisible: 10
              }
            });

            jest.runAllTimers();

            _context5.next = 5;
            return wrapper.vm.$nextTick();

          case 5:

            expect(wrapper.html()).toMatchSnapshot();
            expect(wrapper.find('.pagination__more').length).toEqual(2);
            expect(wrapper.find('.pagination__item').length).toEqual(8);

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));
});