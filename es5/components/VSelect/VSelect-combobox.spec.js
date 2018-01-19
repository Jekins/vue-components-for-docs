var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '~util/testing';
import { mount } from 'avoriaz';
import VSelect from '~components/VSelect';
import VMenu from '~components/VMenu';

test('VSelect - combobox', function () {
  var backspace = new Event('keydown');
  backspace.keyCode = 8;

  it('should emit custom value on blur', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper, input, change;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                combobox: true,
                value: null
              }
            });
            input = wrapper.find('input')[0];
            change = jest.fn();

            wrapper.vm.$on('input', change);

            input.trigger('focus');
            _context.next = 7;
            return wrapper.vm.$nextTick();

          case 7:

            input.element.value = 'foo';
            input.trigger('input');
            _context.next = 11;
            return wrapper.vm.$nextTick();

          case 11:

            input.trigger('blur');
            _context.next = 14;
            return wrapper.vm.$nextTick();

          case 14:

            expect(change).toHaveBeenCalledWith('foo');
            expect('Application is missing <v-app> component.').toHaveBeenTipped();

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));
});