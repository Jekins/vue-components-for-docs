var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '~util/testing';
import { mount } from 'avoriaz';
import VSelect from '~components/VSelect';

test('VSelect', function () {
  // Inspired by https://github.com/vuetifyjs/vuetify/pull/1425 - Thanks @kevmo314
  it('should open the select when focused and enter, space, up or down are pressed', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper, _arr, _i, key;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                items: ['foo', 'bar']
              }
            });
            _arr = ['up', 'down', 'space', 'enter'];
            _i = 0;

          case 3:
            if (!(_i < _arr.length)) {
              _context.next = 19;
              break;
            }

            key = _arr[_i];

            wrapper.trigger('focus');
            _context.next = 8;
            return wrapper.vm.$nextTick();

          case 8:
            expect(wrapper.vm.menuIsActive).toBe(false);
            wrapper.trigger('keydown.' + key);
            _context.next = 12;
            return wrapper.vm.$nextTick();

          case 12:
            expect(wrapper.vm.menuIsActive).toBe(true);
            wrapper.vm.blur();
            _context.next = 16;
            return wrapper.vm.$nextTick();

          case 16:
            _i++;
            _context.next = 3;
            break;

          case 19:

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should clear input value', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper, clear, input;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                clearable: true,
                items: ['foo', 'bar'],
                value: 'foo'
              }
            });
            clear = wrapper.find('.input-group__append-icon')[0];
            input = jest.fn();

            wrapper.vm.$on('input', input);

            _context2.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(wrapper.vm.inputValue).toBe('foo');

            clear.trigger('click');

            _context2.next = 10;
            return wrapper.vm.$nextTick();

          case 10:

            expect(wrapper.vm.inputValue).toBe(null);
            expect(input).toHaveBeenCalledWith(null);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should be clearable with prop, dirty and single select', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper, clear;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                clearable: true,
                items: [1, 2],
                value: 1
              }
            });
            clear = wrapper.find('.input-group__append-icon')[0];
            _context3.next = 4;
            return wrapper.vm.$nextTick();

          case 4:
            expect(clear.element.classList).toContain('input-group__icon-clearable');
            expect(wrapper.vm.inputValue).toBe(1);
            expect(wrapper.html()).toMatchSnapshot();

            clear.trigger('click');
            _context3.next = 10;
            return wrapper.vm.$nextTick();

          case 10:
            expect(wrapper.vm.inputValue).toBe(null);
            expect(wrapper.vm.menuIsVisible).toBe(false);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should be clearable with prop, dirty and multi select', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper, clear, change;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                clearable: true,
                items: [1, 2],
                multiple: true,
                value: [1]
              }
            });
            clear = wrapper.find('.input-group__append-icon')[0];
            change = jest.fn();

            wrapper.vm.$on('change', change);

            _context4.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(wrapper.html()).toMatchSnapshot();

            clear.trigger('click');
            _context4.next = 10;
            return wrapper.vm.$nextTick();

          case 10:
            expect(change).toHaveBeenCalledWith([]);
            expect(wrapper.vm.menuIsVisible).toBe(false);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 13:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should prepropulate selectedItems', function () {
    var items = ['foo', 'bar', 'baz'];

    var wrapper = mount(VSelect, {
      propsData: {
        items: items,
        value: 'foo'
      }
    });

    var wrapper2 = mount(VSelect, {
      propsData: {
        items: items,
        multiple: true,
        value: ['foo', 'bar']
      }
    });

    var wrapper3 = mount(VSelect, {
      propsData: {
        items: items,
        value: null
      }
    });

    expect(wrapper.vm.selectedItems).toHaveLength(1);
    expect(wrapper2.vm.selectedItems).toHaveLength(2);
    expect(wrapper3.vm.selectedItems).toHaveLength(0);
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should show input with placeholder and not dirty', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                placeholder: 'foo'
              }
            });


            expect(wrapper.find('input')[0].hasStyle('display', 'block'));
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 3:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('should not show input with placeholder and dirty', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                items: ['bar'],
                placeholder: 'foo',
                value: 'bar'
              }
            });


            expect(wrapper.find('input')[0].hasStyle('display', 'none'));
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 3:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  })));

  // #1704
  it('should populate select when using value as an object', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var wrapper, selections;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                items: [{ text: 'foo', value: { id: 1 } }, { text: 'foo', value: { id: 2 } }],
                multiple: true,
                value: [{ id: 1 }]
              }
            });
            _context7.next = 3;
            return wrapper.vm.$nextTick();

          case 3:
            selections = wrapper.find('.input-group__selections__comma');


            expect(selections.length).toBeGreaterThan(0);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 6:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, _this);
  })));

  // Discovered when working on #1704
  it('should remove item when re-selecting it', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var wrapper, item;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                items: [{ text: 'bar', value: { id: 1 } }, { text: 'foo', value: { id: 2 } }],
                multiple: true,
                value: [{ id: 1 }]
              }
            });


            expect(wrapper.vm.selectedItems).toHaveLength(1);

            wrapper.trigger('click');
            item = wrapper.find('li')[0];

            item.trigger('click');

            expect(wrapper.vm.selectedItems).toHaveLength(0);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 7:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, _this);
  })));

  it('should open menu when arrow is clicked', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var wrapper, arrow;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                items: ['foo', 'bar']
              }
            });
            arrow = wrapper.find('.input-group__append-icon')[0];


            expect(wrapper.vm.menuIsActive).toBe(false);

            arrow.trigger('click');
            expect(wrapper.vm.menuIsActive).toBe(true);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 6:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, _this);
  })));

  it('should open menu when cleared with open-on-clear', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var wrapper, clear;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            wrapper = mount(VSelect, {
              propsData: {
                clearable: true,
                openOnClear: true,
                value: 1
              }
            });
            clear = wrapper.find('.input-group__append-icon')[0];


            clear.trigger('click');

            _context10.next = 5;
            return wrapper.vm.$nextTick();

          case 5:

            expect(wrapper.vm.menuIsActive).toBe(true);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 7:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, _this);
  })));

  it('should not rotate icon if menu is not open', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            wrapper = mount(VSelect, {
              propsData: {
                items: [1]
              }
            });


            wrapper.trigger('focus');

            _context11.next = 4;
            return wrapper.vm.$nextTick();

          case 4:

            expect(wrapper.vm.menuIsVisible).toBe(false);
            expect(wrapper.hasClass('input-group--open')).toBe(false);

            wrapper.trigger('click');

            _context11.next = 9;
            return wrapper.vm.$nextTick();

          case 9:

            expect(wrapper.vm.menuIsVisible).toBe(true);
            expect(wrapper.hasClass('input-group--open')).toBe(true);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 12:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, _this);
  })));
});