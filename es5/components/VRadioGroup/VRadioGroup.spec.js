var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '~util/testing';
import { VRadioGroup, VRadio } from '~components/VRadioGroup';

test('VRadioGroup.vue', function (_ref) {
  var mount = _ref.mount;

  it('should render role on radio group', function () {
    var wrapper = mount(VRadioGroup);

    expect(wrapper.html()).toMatchSnapshot();

    var radioGroup = wrapper.find('.radio-group')[0];
    expect(radioGroup.getAttribute('role')).toBe('radiogroup');
  });

  // TODO: Test ability to toggle multiple data types

  it('should be in error when v-radio-group is', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper, radio;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VRadioGroup, {
              propsData: {
                error: false
              },
              slots: {
                default: [VRadio]
              }
            });
            radio = wrapper.vm.radios[0];


            wrapper.setProps({ error: true });
            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(radio.parentError).toBe(true);
            expect(wrapper.html()).toMatchSnapshot();

            wrapper.setProps({ error: false });
            _context.next = 10;
            return wrapper.vm.$nextTick();

          case 10:
            expect(radio.parentError).toBe(false);
            expect(wrapper.html()).toMatchSnapshot();

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));
});