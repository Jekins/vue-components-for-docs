var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '~util/testing';
import { mount } from 'avoriaz';
import VTabs from './VTabs';
import VTabsBar from './VTabsBar';
import VTabsItem from './VTabsItem';
import Vue from 'vue';
import { createRange } from '~util/helpers';

function createBar() {
  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['foo', 'bar'];

  return Vue.extend({
    render: function render(h) {
      return h(VTabsBar, items.map(function (i) {
        return h(VTabsItem, { props: { href: '' + i } });
      }));
    }
  });
}

test('VTabs', function () {
  it('should change model when tab is clicked', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper, input, item1, item2;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VTabs, {
              slots: {
                default: [createBar()]
              }
            });
            _context.next = 3;
            return wrapper.vm.$nextTick();

          case 3:
            input = jest.fn();

            wrapper.vm.$on('input', input);

            item1 = wrapper.find('.tabs__item')[0];
            item2 = wrapper.find('.tabs__item')[1];


            item1.trigger('click');
            _context.next = 10;
            return wrapper.vm.$nextTick();

          case 10:
            expect(input).toBeCalledWith('foo');

            item2.trigger('click');
            _context.next = 14;
            return wrapper.vm.$nextTick();

          case 14:
            expect(input).toBeCalledWith('bar');

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should change tab when model changes', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VTabs, {
              propsData: {
                value: 'bar'
              },
              slots: {
                default: [createBar()]
              }
            });
            _context2.next = 3;
            return wrapper.vm.$nextTick();

          case 3:
            input = jest.fn();

            wrapper.vm.$on('input', input);

            expect(wrapper.vm.value).toBe('bar');

            wrapper.setProps({ value: 'foo' });
            _context2.next = 9;
            return wrapper.vm.$nextTick();

          case 9:
            expect(input).toBeCalledWith('foo');

          case 10:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should mount with booted false then activate to remove transition', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(VTabs, {
              propsData: {
                value: 'bar'
              },
              slots: {
                default: [createBar()]
              }
            });


            expect(wrapper.vm.isBooted).toBe(false);

            wrapper.vm.activeIndex = 0;
            _context3.next = 5;
            return wrapper.vm.$nextTick();

          case 5:

            expect(wrapper.vm.isBooted).toBe(true);

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  /* TODO: Don't know how to dynamically change slots after wrapper created??
  it('should add navigation if dynamically added tabs result in overflow', async () => {
    const wrapper = mount(VTabs, {
      slots: {
        default: [createBar(createRange(2))]
      },
      attachToDocument: true
    })
     console.log(wrapper.html())
  })
  */
});