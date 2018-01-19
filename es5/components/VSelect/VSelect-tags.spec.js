var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '~util/testing';
import { mount } from 'avoriaz';
import VSelect from '~components/VSelect';
import VMenu from '~components/VMenu';

test('VSelect - tags', function () {
  var backspace = new Event('keydown');
  backspace.keyCode = 8;

  it('should create new values when tagging', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper, input, change;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                tags: true,
                value: []
              }
            });
            input = wrapper.find('input')[0];
            change = jest.fn();

            wrapper.vm.$on('input', change);

            wrapper.vm.focus();
            _context.next = 7;
            return wrapper.vm.$nextTick();

          case 7:

            input.element.value = 'foo';
            input.trigger('input');
            _context.next = 11;
            return wrapper.vm.$nextTick();

          case 11:
            _context.next = 13;
            return wrapper.vm.$nextTick();

          case 13:

            input.trigger('keydown.enter');
            _context.next = 16;
            return wrapper.vm.$nextTick();

          case 16:

            expect(change).toHaveBeenCalledWith(['foo']);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should change selectedIndex with keyboard', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper, input, _arr, _i, index;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                tags: true,
                value: ['foo', 'bar']
              }
            });
            input = wrapper.find('input')[0];


            wrapper.vm.focus();
            _context2.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            _arr = [1, 0, -1];
            _i = 0;

          case 7:
            if (!(_i < _arr.length)) {
              _context2.next = 16;
              break;
            }

            index = _arr[_i];

            input.trigger('keydown.left');
            _context2.next = 12;
            return wrapper.vm.$nextTick();

          case 12:
            expect(wrapper.vm.selectedIndex).toBe(index);

          case 13:
            _i++;
            _context2.next = 7;
            break;

          case 16:

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 17:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should delete a tagged item when selected and backspace/delete is pressed', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper, input, change;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                tags: true,
                value: ['foo', 'bar']
              }
            });
            input = wrapper.find('input')[0];
            change = jest.fn();

            wrapper.vm.$on('input', change);

            wrapper.vm.focus();

            input.trigger('keydown.left');
            expect(wrapper.vm.selectedIndex).toBe(1);

            input.trigger('keydown.delete');
            _context3.next = 10;
            return wrapper.vm.$nextTick();

          case 10:
            expect(change).toHaveBeenCalledWith(['foo']);
            expect(wrapper.vm.selectedIndex).toBe(0);

            input.element.dispatchEvent(backspace); // Avoriaz doesn't wrap keydown.backspace
            _context3.next = 15;
            return wrapper.vm.$nextTick();

          case 15:
            expect(change).toHaveBeenCalledWith([]);
            expect(wrapper.vm.selectedIndex).toBe(-1);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 18:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should add a tag on tab using the first suggestion', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper, input, change;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                tags: true,
                value: [],
                items: ['bar']
              }
            });
            input = wrapper.find('input')[0];
            change = jest.fn();

            wrapper.vm.$on('input', change);

            wrapper.vm.focus();
            _context4.next = 7;
            return wrapper.vm.$nextTick();

          case 7:

            input.element.value = 'b';
            input.trigger('input');
            _context4.next = 11;
            return wrapper.vm.$nextTick();

          case 11:
            input.trigger('keydown.down');
            input.trigger('keydown.tab');
            _context4.next = 15;
            return wrapper.vm.$nextTick();

          case 15:

            expect(change).toBeCalledWith(['bar']);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 17:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should add a tag on tab using the current searchValue', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var wrapper, input, change, blur;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                tags: true,
                value: [],
                items: ['bar']
              }
            });
            input = wrapper.find('input')[0];
            change = jest.fn();
            blur = jest.fn();

            wrapper.vm.$on('input', change);
            wrapper.vm.$on('blur', blur);

            wrapper.vm.focus();
            _context5.next = 9;
            return wrapper.vm.$nextTick();

          case 9:
            wrapper.setProps({ searchInput: 'ba' });
            _context5.next = 12;
            return wrapper.vm.$nextTick();

          case 12:
            input.trigger('keydown.down');
            _context5.next = 15;
            return wrapper.vm.$nextTick();

          case 15:
            input.trigger('keydown.tab');
            _context5.next = 18;
            return wrapper.vm.$nextTick();

          case 18:
            expect(change).toBeCalledWith(['bar']);

            wrapper.setProps({ searchInput: 'it' });
            _context5.next = 22;
            return wrapper.vm.$nextTick();

          case 22:
            input.trigger('keydown.tab');
            _context5.next = 25;
            return wrapper.vm.$nextTick();

          case 25:
            expect(change).toBeCalledWith(['bar', 'it']);

            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 27:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('should add a tag on enter using the current searchValue', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var wrapper, input, change;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                tags: true,
                value: [],
                items: ['bar']
              }
            });
            input = wrapper.find('input')[0];
            change = jest.fn();

            wrapper.vm.$on('input', change);

            wrapper.vm.focus();
            _context6.next = 7;
            return wrapper.vm.$nextTick();

          case 7:

            input.element.value = 'ba';
            input.trigger('input');
            input.element.setSelectionRange(2, 2);
            _context6.next = 12;
            return wrapper.vm.$nextTick();

          case 12:
            input.trigger('keydown.right');
            _context6.next = 15;
            return wrapper.vm.$nextTick();

          case 15:
            input.trigger('keydown.enter');
            _context6.next = 18;
            return wrapper.vm.$nextTick();

          case 18:

            expect(change).toBeCalledWith(['ba']);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 20:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  })));

  it('should add a tag on left arrow and select the previous tag', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var wrapper, input, change;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                tags: true,
                value: ['foo'],
                items: ['foo', 'bar']
              }
            });
            input = wrapper.find('input')[0];
            change = jest.fn();

            wrapper.vm.$on('input', change);

            wrapper.vm.focus();
            _context7.next = 7;
            return wrapper.vm.$nextTick();

          case 7:

            input.element.value = 'b';
            input.trigger('input');
            input.trigger('keydown.left');
            _context7.next = 12;
            return wrapper.vm.$nextTick();

          case 12:

            expect(change).toBeCalledWith(['foo', 'b']);
            expect(wrapper.vm.selectedIndex).toBe(0);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 15:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, _this);
  })));

  it('should remove a duplicate tag and add it to the end', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var wrapper, input, change;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                tags: true,
                value: ['foo', 'bar']
              }
            });
            input = wrapper.find('input')[0];
            change = jest.fn();

            wrapper.vm.$on('input', change);

            wrapper.vm.focus();
            _context8.next = 7;
            return wrapper.vm.$nextTick();

          case 7:

            input.element.value = 'foo';
            input.trigger('input');
            input.trigger('keydown.tab');
            _context8.next = 12;
            return wrapper.vm.$nextTick();

          case 12:

            expect(change).toBeCalledWith(['bar', 'foo']);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 14:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, _this);
  })));

  it('should add tag with valid search value on blur', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var wrapper, input, change;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                tags: true
              }
            });
            input = wrapper.find('input')[0];
            change = jest.fn();

            wrapper.vm.$on('input', change);

            wrapper.vm.focus();
            _context9.next = 7;
            return wrapper.vm.$nextTick();

          case 7:

            input.element.value = 'bar';
            input.trigger('input');
            _context9.next = 11;
            return wrapper.vm.$nextTick();

          case 11:

            wrapper.vm.blur();
            _context9.next = 14;
            return wrapper.vm.$nextTick();

          case 14:
            _context9.next = 16;
            return wrapper.vm.$nextTick();

          case 16:
            // Second tick processes change after tag added

            expect(change).toBeCalledWith(['bar']);
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 18:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, _this);
  })));
});