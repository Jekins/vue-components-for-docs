var _this = this;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import VCarousel from './VCarousel';
import VCarouselItem from './VCarouselItem';
import { test } from '~util/testing';
import Vue from 'vue';

var create = function create() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var slots = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  return Vue.component('zxc', {
    functional: true,
    render: function render(h) {
      var items = [];
      for (var i = 0; i < slots; i++) {
        items.push(h(VCarouselItem, { props: { src: '' + (i + 1) } }));
      }
      return h(VCarousel, { props: props }, items);
    }
  });
};

test('VCarousel.js', function (_ref) {
  var mount = _ref.mount;

  it('should render component and match snapshot', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VCarousel);
            _context.next = 3;
            return wrapper.vm.$nextTick();

          case 3:

            expect(wrapper.html()).toMatchSnapshot();

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should render component with image cycling off and match snapshot', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VCarousel, {
              propsData: {
                cycle: false
              }
            });
            _context2.next = 3;
            return wrapper.vm.$nextTick();

          case 3:

            expect(wrapper.html()).toMatchSnapshot();

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should render component with custom icon and match snapshot', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var component, wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            component = create({
              delimiterIcon: 'stop'
            });
            wrapper = mount(component);
            _context3.next = 4;
            return wrapper.vm.$nextTick();

          case 4:

            expect(wrapper.html()).toMatchSnapshot();

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should render component with custom duration between image cycles and match snapshot', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(VCarousel, {
              propsData: {
                interval: 1000
              }
            });
            _context4.next = 3;
            return wrapper.vm.$nextTick();

          case 3:

            expect(wrapper.html()).toMatchSnapshot();

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should render component with custom left control icon and match snapshot', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            wrapper = mount(VCarousel, {
              propsData: {
                leftControlIcon: 'stop'
              }
            });
            _context5.next = 3;
            return wrapper.vm.$nextTick();

          case 3:

            expect(wrapper.find('.carousel__left .icon')[0].text()).toBe('stop');
            expect(wrapper.html()).toMatchSnapshot();

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('should render component without left control icon and match snapshot', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            wrapper = mount(VCarousel, {
              propsData: {
                leftControlIcon: false
              }
            });
            _context6.next = 3;
            return wrapper.vm.$nextTick();

          case 3:

            expect(wrapper.contains('.carousel__left')).toBe(false);
            expect(wrapper.html()).toMatchSnapshot();

          case 5:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  })));

  it('should render component with custom right control icon and match snapshot', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            wrapper = mount(VCarousel, {
              propsData: {
                rightControlIcon: 'stop'
              }
            });
            _context7.next = 3;
            return wrapper.vm.$nextTick();

          case 3:

            expect(wrapper.find('.carousel__right .icon')[0].text()).toBe('stop');
            expect(wrapper.html()).toMatchSnapshot();

          case 5:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, _this);
  })));

  it('should render component without right control icon and match snapshot', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            wrapper = mount(VCarousel, {
              propsData: {
                rightControlIcon: false
              }
            });
            _context8.next = 3;
            return wrapper.vm.$nextTick();

          case 3:

            expect(wrapper.contains('.carousel__right')).toBe(false);
            expect(wrapper.html()).toMatchSnapshot();

          case 5:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, _this);
  })));

  it('should render component with selected active item', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var component, wrapper;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            component = create({ value: 1 });
            wrapper = mount(component);
            _context9.next = 4;
            return wrapper.vm.$nextTick();

          case 4:

            expect(wrapper.html()).toMatchSnapshot();

          case 5:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, _this);
  })));

  // TODO: Use jest's fake timers
  it('should emit input event after interval', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var _ref12;

    var vm, wrapper, input;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            vm = mount(VCarousel).vm;
            wrapper = mount(VCarousel, {
              propsData: {
                value: 1,
                interval: 1
              },
              slots: {
                default: [1, 2, 3].map(function (i) {
                  return {
                    vNode: vm.$createElement(VCarouselItem, { attrs: { src: i.toString() } })
                  };
                })
              }
            });
            input = jest.fn();
            _context10.next = 5;
            return new Promise(function (resolve) {
              wrapper.vm.$on('input', function (value) {
                input(value);
                input.mock.calls.length === 3 && resolve();
              });
            });

          case 5:

            expect((_ref12 = []).concat.apply(_ref12, _toConsumableArray(input.mock.calls))).toEqual([1, 2, 0]);

          case 6:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, _this);
  })));

  it('should render component without delimiters', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var component, wrapper;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            component = create({ hideDelimiters: true });
            wrapper = mount(component);
            _context11.next = 4;
            return wrapper.vm.$nextTick();

          case 4:

            expect(wrapper.contains('carousel__controls')).toBe(false);
            expect(wrapper.html()).toMatchSnapshot();

          case 6:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, _this);
  })));
});