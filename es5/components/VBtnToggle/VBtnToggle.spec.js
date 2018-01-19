var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { mount } from 'avoriaz';
import VBtnToggle from './VBtnToggle';
import VBtn from '../VBtn';
import VIcon from '../VIcon';
import { test } from '~util/testing';
import Vue from 'vue/dist/vue.common';

function createBtn() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var options = {
    props: { flat: true }
  };
  if (val) options.attrs = { value: val };

  return Vue.component('test', {
    components: {
      VBtn: VBtn,
      VIcon: VIcon
    },
    render: function render(h) {
      return h('v-btn', options, [h('v-icon', 'add')]);
    }
  });
}

test('VBtnToggle.vue', function () {
  it('should not allow empty value when mandatory prop is used', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 0,
        mandatory: true
      },
      slots: {
        default: [createBtn(), createBtn(), createBtn()]
      }
    });

    var change = jest.fn();
    wrapper.instance().$on('change', change);

    wrapper.instance().updateValue(0);

    expect(change).not.toBeCalled();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should allow new value when mandatory prop is used', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 1,
        mandatory: true
      },
      slots: {
        default: [createBtn(), createBtn(), createBtn()]
      }
    });

    var change = jest.fn();
    wrapper.instance().$on('change', change);

    wrapper.instance().updateValue(0);

    expect(change).toBeCalledWith(0);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not allow empty value when mandatory prop is used with multiple prop', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: [1],
        mandatory: true,
        multiple: true
      },
      slots: {
        default: [createBtn(), createBtn(), createBtn()]
      }
    });

    var change = jest.fn();
    wrapper.instance().$on('change', change);

    wrapper.instance().updateValue(1);

    expect(change).not.toBeCalled();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should allow new value when mandatory prop is used with multiple prop', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: [1],
        mandatory: true,
        multiple: true
      },
      slots: {
        default: [createBtn(), createBtn(), createBtn()]
      }
    });

    var change = jest.fn();
    wrapper.instance().$on('change', change);

    wrapper.instance().updateValue(2);

    expect(change).toBeCalledWith([1, 2]);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should use button value attribute if available', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 'center'
      },
      slots: {
        default: [createBtn('left'), createBtn('center'), createBtn('right')]
      }
    });

    var change = jest.fn();
    wrapper.instance().$on('change', change);

    wrapper.instance().updateValue(2);

    expect(change).toBeCalledWith('right');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should allow deselecting a value when mandatory prop is used with multiple prop', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: [1, 2],
        mandatory: true,
        multiple: true
      },
      slots: {
        default: [createBtn(), createBtn(), createBtn()]
      }
    });

    var change = jest.fn();
    wrapper.instance().$on('change', change);

    wrapper.instance().updateValue(2);

    expect(change).toBeCalledWith([1]);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have btn with data-only-child if only one selected', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 0
      },
      slots: {
        default: [createBtn(), createBtn()]
      }
    });

    var btn = wrapper.find('.btn')[0];

    expect(btn.getAttribute('data-only-child')).toBe('true');
  });

  // TODO: change never fires
  it.skip('should toggle values of any type', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var values, buttons, wrapper, change, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, button;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            values = [true, false, null, 6, 'foo', { key: 'value' }, ['arrayyy']];
            buttons = values.map(function (v) {
              return createBtn(v);
            });
            wrapper = mount(VBtnToggle, {
              propsData: {
                inputValue: null
              },
              slots: { default: buttons }
            });
            change = jest.fn(function (value) {
              wrapper.setProps({ inputValue: value });
            });

            wrapper.vm.$on('change', change);

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 8;
            for (_iterator = wrapper.find(VBtn)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              button = _step.value;

              button.trigger('click');
              expect(change).toBeCalledWith(button.vm.value);
            }

            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](8);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 16:
            _context.prev = 16;
            _context.prev = 17;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 19:
            _context.prev = 19;

            if (!_didIteratorError) {
              _context.next = 22;
              break;
            }

            throw _iteratorError;

          case 22:
            return _context.finish(19);

          case 23:
            return _context.finish(16);

          case 24:
            expect(wrapper.html()).toMatchSnapshot();

          case 25:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this, [[8, 12, 16, 24], [17,, 19, 23]]);
  })));
});