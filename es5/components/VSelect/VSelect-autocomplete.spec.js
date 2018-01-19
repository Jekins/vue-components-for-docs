var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '~util/testing';
import { mount } from 'avoriaz';
import VSelect from '~components/VSelect';

test('VSelect - autocomplete', function () {
  it('should have -1 tabindex when disabled', function () {
    var wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        autocomplete: true,
        disabled: true
      }
    });

    expect(wrapper.vm.$refs.input.tabIndex).toBe(-1);
    expect(wrapper.vm.$el.tabIndex).toBe(-1);
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should have explicit tabindex passed through when autocomplete', function () {
    var wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        autocomplete: true,
        tabindex: 10
      }
    });

    expect(wrapper.vm.$refs.input.tabIndex).toBe(10);
    expect(wrapper.vm.$el.tabIndex).toBe(-1);
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should have explicit tabindex passed through when not autocomplete', function () {
    var wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        tabindex: 10
      }
    });

    expect(wrapper.vm.$refs.input.tabIndex).toBe(-1);
    expect(wrapper.vm.$el.tabIndex).toBe(10);
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should emit search input changes', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper, input, update;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VSelect, {
              propsData: {
                autocomplete: true,
                debounceSearch: 0
              }
            });
            input = wrapper.find('input')[0];
            update = jest.fn();

            wrapper.vm.$on('update:searchInput', update);

            _context.next = 6;
            return wrapper.vm.$nextTick();

          case 6:

            input.element.value = 'test';
            input.trigger('input');
            _context.next = 10;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 1);
            });

          case 10:

            expect(update).toBeCalledWith('test');
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should be able to clear autocomplete value', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper, input, change;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VSelect, {
              propsData: {
                autocomplete: true,
                items: ['red'],
                debounceSearch: 0
              }
            });
            input = wrapper.find('input')[0];


            wrapper.vm.focus();
            _context2.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            wrapper.setProps({ searchInput: 're' });
            _context2.next = 8;
            return wrapper.vm.$nextTick();

          case 8:
            input.trigger('keydown.tab');
            _context2.next = 11;
            return wrapper.vm.$nextTick();

          case 11:
            change = jest.fn();

            wrapper.vm.$on('input', change);

            wrapper.vm.focus();
            _context2.next = 16;
            return wrapper.vm.$nextTick();

          case 16:
            wrapper.setProps({ searchInput: '' });
            _context2.next = 19;
            return wrapper.vm.$nextTick();

          case 19:
            input.trigger('keydown.tab');
            _context2.next = 22;
            return wrapper.vm.$nextTick();

          case 22:
            expect(change).toBeCalledWith(null);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 24:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should filter autocomplete search results', function () {
    var wrapper = mount(VSelect, {
      propsData: {
        autocomplete: true,
        items: ['foo', 'bar']
      }
    });

    wrapper.vm.searchValue = 'foo';

    expect(wrapper.vm.filteredItems).toHaveLength(1);
    expect(wrapper.vm.filteredItems[0]).toBe('foo');
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should filter numeric primitives', function () {
    var wrapper = mount(VSelect, {
      propsData: {
        autocomplete: true,
        items: [1, 2]
      }
    });

    wrapper.vm.searchValue = 1;

    expect(wrapper.vm.filteredItems).toHaveLength(1);
    expect(wrapper.vm.filteredItems[0]).toBe(1);
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should activate when search changes and not active', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                autocomplete: true,
                items: [1, 2, 3, 4],
                multiple: true
              }
            });


            wrapper.vm.isActive = true;
            _context3.next = 4;
            return wrapper.vm.$nextTick();

          case 4:
            wrapper.vm.searchValue = 2;
            _context3.next = 7;
            return wrapper.vm.$nextTick();

          case 7:

            expect(wrapper.vm.isActive).toBe(true);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should set searchValue to null when deactivated', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                autocomplete: true,
                items: [1, 2, 3, 4],
                multiple: true
              }
            });


            wrapper.vm.isActive = true;
            wrapper.vm.searchValue = 2;
            _context4.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            wrapper.vm.isActive = false;
            _context4.next = 8;
            return wrapper.vm.$nextTick();

          case 8:

            expect(wrapper.vm.searchValue).toBe(null);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should render role=combobox correctly when autocomplete', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var wrapper, inputGroup, input;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            wrapper = mount(VSelect, {
              propsData: {
                autocomplete: true
              }
            });
            inputGroup = wrapper.find('.input-group--select')[0];

            expect(inputGroup.element.getAttribute('role')).toBeFalsy();

            input = wrapper.find('input')[0];

            expect(input.getAttribute('role')).toBe('combobox');

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 6:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('should render role=combobox correctly when not autocomplete)', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var wrapper, inputGroup;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            wrapper = mount(VSelect);
            inputGroup = wrapper.find('.input-group--select')[0];

            expect(inputGroup.element.getAttribute('role')).toBe('combobox');

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  })));

  it('should not duplicate items after items update when caching is turned on', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            wrapper = mount(VSelect, {
              propsData: {
                autocomplete: true,
                cacheItems: true,
                returnObject: true,
                itemText: 'text',
                itemValue: 'id',
                items: []
              }
            });


            wrapper.setProps({ items: [{ id: 1, text: 'A' }] });
            expect(wrapper.vm.computedItems).toHaveLength(1);
            wrapper.setProps({ items: [{ id: 1, text: 'A' }] });
            expect(wrapper.vm.computedItems).toHaveLength(1);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 6:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, _this);
  })));

  it('should not display list with no items and autocomplete', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                autocomplete: true,
                items: []
              }
            });
            input = wrapper.find('.input-group__input')[0];


            input.trigger('click');
            _context8.next = 5;
            return wrapper.vm.$nextTick();

          case 5:

            expect(wrapper.vm.menuIsActive).toBe(false);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 7:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, _this);
  })));

  it('should cache items', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                autocomplete: true,
                cacheItems: true,
                items: []
              }
            });


            wrapper.setProps({ items: ['bar', 'baz'] });
            expect(wrapper.vm.computedItems).toHaveLength(2);

            wrapper.setProps({ items: ['foo'] });
            expect(wrapper.vm.computedItems).toHaveLength(3);

            wrapper.setProps({ items: ['bar'] });
            expect(wrapper.vm.computedItems).toHaveLength(3);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 8:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, _this);
  })));

  it('should cache items passed via prop', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                autocomplete: true,
                cacheItems: true,
                items: [1, 2, 3, 4]
              }
            });


            expect(wrapper.vm.computedItems).toHaveLength(4);

            wrapper.setProps({ items: [5] });
            expect(wrapper.vm.computedItems).toHaveLength(5);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 5:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, _this);
  })));

  it('should allow changing of browser autocomplete', function () {
    var wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        autocomplete: true,
        browserAutocomplete: 'off'
      }
    });

    var input = wrapper.find('input')[0];

    expect(input.getAttribute('autocomplete')).toBe('off');
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should show input when focused and autocomplete', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                autocomplete: true
              }
            });
            input = wrapper.find('input')[0];


            expect(input.hasStyle('display', 'none'));

            wrapper.trigger('focus');
            _context11.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(input.hasStyle('display', 'block'));

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 8:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, _this);
  })));

  it('should not filter text with no items', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var wrapper, tile;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                autocomplete: true,
                items: ['foo', 'bar']
              }
            });


            wrapper.setProps({ searchInput: 'asdf' });
            wrapper.update();
            _context12.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            tile = wrapper.find('.list__tile__title')[0];


            expect(tile.text()).toBe('No data available');
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 8:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, _this);
  })));
});