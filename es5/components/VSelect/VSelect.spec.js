var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import Vue from 'vue';
import { test } from '~util/testing';
import { mount } from 'avoriaz';
import VSelect from '~components/VSelect';

test('VSelect', function () {
  it('should return numeric 0', function () {
    var item = { value: 0, text: '0' };
    var wrapper = mount(VSelect, {
      propsData: {
        value: null,
        items: [item],
        multiple: true
      }
    });

    var change = jest.fn();
    wrapper.vm.$on('change', change);
    wrapper.vm.selectItem(item);

    expect(change).toBeCalledWith([0]);
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should be in an error state', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                value: null,
                items: [0, 1, 2],
                rules: [function (v) {
                  return !!v || 'Required';
                }]
              }
            });


            wrapper.trigger('focus');
            _context.next = 4;
            return wrapper.vm.$nextTick();

          case 4:
            wrapper.vm.blur();
            _context.next = 7;
            return wrapper.vm.$nextTick();

          case 7:

            expect(wrapper.vm.hasError).toBe(true);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should disable list items', function () {
    var wrapper = mount(VSelect, {
      attachToDocument: true,
      propsData: {
        items: [{
          text: 'item',
          disabled: true
        }]
      }
    });

    var item = wrapper.find('li')[0];

    expect(item.element.getAttribute('disabled')).toBe('disabled');
    expect('Application is missing <v-app> component.').toHaveBeenTipped();
  });

  it('should warn when using incorrect item together with segmented prop', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var items, wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            items = [{ text: 'Hello', callback: function callback() {} }, { text: 'Hello' }];
            wrapper = mount(VSelect, {
              propsData: {
                segmented: true,
                items: items
              }
            });


            wrapper.vm.inputValue = items[1];

            _context2.next = 5;
            return wrapper.vm.$nextTick();

          case 5:

            expect('Application is missing <v-app> component.').toHaveBeenTipped();
            expect('items must contain both a text and callback property').toHaveBeenTipped();

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should render buttons correctly when using items array with segmented prop', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var items, wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            items = [{ text: 'Hello', callback: function callback() {} }];
            wrapper = mount(VSelect, {
              propsData: {
                segmented: true,
                items: items
              }
            });


            wrapper.vm.inputValue = items[0];

            _context3.next = 5;
            return wrapper.vm.$nextTick();

          case 5:

            expect(wrapper.html()).toMatchSnapshot();
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should render buttons correctly when using slot with segmented prop', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var items, vm, selection, component, wrapper;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            items = [{ text: 'Hello' }];
            vm = new Vue();

            selection = function selection(props) {
              return vm.$createElement('div', [props.item]);
            };

            component = Vue.component('test', {
              components: {
                VSelect: VSelect
              },
              render: function render(h) {
                return h('v-select', {
                  props: {
                    segmented: true,
                    items: items
                  },
                  scopedSlots: {
                    selection: selection
                  }
                });
              }
            });
            wrapper = mount(component);


            wrapper.vm.$children[0].inputValue = items[0];

            _context4.next = 8;
            return wrapper.vm.$nextTick();

          case 8:

            expect(wrapper.html()).toMatchSnapshot();
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 10:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should not close menu when using multiple prop', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var wrapper, blur, item;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                items: [1, 2, 3, 4],
                multiple: true
              }
            });
            blur = jest.fn();

            wrapper.vm.$on('blur', blur);

            wrapper.trigger('click');
            wrapper.trigger('blur');

            _context5.next = 7;
            return wrapper.vm.$nextTick();

          case 7:
            item = wrapper.find('li')[0];

            item.trigger('click');

            _context5.next = 11;
            return wrapper.vm.$nextTick();

          case 11:

            expect(blur).not.toBeCalled();
            expect(wrapper.vm.isActive).toBe(true);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 14:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('should render aria-hidden=true on arrow icon', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var wrapper, icon;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            wrapper = mount(VSelect);
            icon = wrapper.find('.input-group__append-icon')[0];

            expect(icon.hasAttribute('aria-hidden')).toBe(true);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 4:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  })));

  it('should display a default value', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            wrapper = mount(VSelect, {
              propsData: {
                value: 'foo',
                items: ['foo']
              }
            });


            expect(wrapper.vm.selectedItems).toEqual(['foo']);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 3:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, _this);
  })));

  it('should not display a default value that is not in items', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            wrapper = mount(VSelect, {
              propsData: {
                value: 'foo',
                items: ['bar']
              }
            });


            expect(wrapper.vm.selectedItems).toHaveLength(0);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 3:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, _this);
  })));

  it('should update the displayed value when items changes', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            wrapper = mount(VSelect, {
              propsData: {
                value: 1,
                items: []
              }
            });


            wrapper.setProps({ items: [{ text: 'foo', value: 1 }] });
            expect(wrapper.vm.selectedItems).toContainEqual({ text: 'foo', value: 1 });

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 4:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, _this);
  })));

  it('should render select menu with content class', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var items, wrapper, menu;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            items = ['abc'];
            wrapper = mount(VSelect, {
              propsData: {
                contentClass: 'menu-class',
                items: items
              }
            });
            menu = wrapper.find('.menu__content')[0];

            expect(menu.element.classList).toContain('menu-class');
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 5:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, _this);
  })));

  it('should have deletable chips', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var wrapper, chip;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                chips: true,
                deletableChips: true,
                tags: true,
                items: ['foo', 'bar'],
                value: ['foo']
              }
            });
            _context11.next = 3;
            return wrapper.vm.$nextTick();

          case 3:
            chip = wrapper.find('.chip')[0];


            expect(!!chip).toBe(true);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 6:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, _this);
  })));

  it('should escape items in menu', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var wrapper, tileTitle;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            wrapper = mount(VSelect, {
              propsData: {
                autocomplete: true,
                items: ['<strong>foo</strong>']
              }
            });
            tileTitle = wrapper.find('.list__tile__title')[0];

            expect(tileTitle.html()).toMatchSnapshot();

            wrapper.setProps({ searchInput: 'str' });
            _context12.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(tileTitle.html()).toMatchSnapshot();

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 8:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, _this);
  })));

  it('should have the proper nudge', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                hideDetails: true,
                items: ['foo', 'bar']
              }
            });


            expect(wrapper.vm.nudgeTop).toBe(-18);

            wrapper.setProps({ autocomplete: true });

            expect(wrapper.vm.nudgeTop).toBe(0);

            wrapper.setProps({ autocomplete: false, overflow: true });

            expect(wrapper.vm.nudgeTop).toBe(2);

            wrapper.setProps({ auto: true, overflow: false });

            expect(wrapper.vm.nudgeTop).toBe(-18);

            wrapper.setProps({ auto: false, overflow: true, hideDetails: false });

            expect(wrapper.vm.nudgeTop).toBe(26);

            wrapper.setProps({ hideDetails: true });

            expect(wrapper.vm.nudgeTop).toBe(2);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 13:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, _this);
  })));

  it('should not open if readonly', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            wrapper = mount(VSelect, {
              propsData: {
                readonly: true,
                items: ['foo', 'bar']
              }
            });


            wrapper.trigger('click');
            _context14.next = 4;
            return wrapper.vm.$nextTick();

          case 4:
            expect(wrapper.vm.menuIsActive).toBe(false);

            wrapper.find('.input-group__append-icon')[0].trigger('click');
            _context14.next = 8;
            return wrapper.vm.$nextTick();

          case 8:
            expect(wrapper.vm.menuIsActive).toBe(false);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 10:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, _this);
  })));
});