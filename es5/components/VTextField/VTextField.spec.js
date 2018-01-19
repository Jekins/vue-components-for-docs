var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '~util/testing';
import Vue from 'vue/dist/vue.common';
import VTextField from '~components/VTextField';
import VProgressLinear from '~components/VProgressLinear';

test('VTextField.js', function (_ref) {
  var mount = _ref.mount;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VTextField);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should pass events to internal input field', function () {
    var keyup = jest.fn();
    var component = {
      render: function render(h) {
        return h(VTextField, { on: { keyUp: keyup }, props: { download: '' }, attrs: {} });
      }
    };
    var wrapper = mount(component);

    var input = wrapper.find('input')[0];
    input.trigger('keyUp', { keyCode: 65 });

    expect(keyup).toBeCalled();
  });

  it('should render aria-label attribute on text field element with label value and no id', function () {
    var wrapper = mount(VTextField, {
      propsData: {
        label: 'Test'
      },
      attrs: {}
    });

    var inputGroup = wrapper.find('input')[0];
    expect(inputGroup.getAttribute('aria-label')).toBe('Test');
  });

  it('should not render aria-label attribute on text field element with no label value or id', function () {
    var wrapper = mount(VTextField, {
      propsData: {
        label: null
      },
      attrs: {}
    });

    var inputGroup = wrapper.find('input')[0];
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy();
  });

  it('should not render aria-label attribute on text field element with id', function () {
    var wrapper = mount(VTextField, {
      propsData: {
        label: 'Test'
      },
      attrs: {
        id: 'Test'
      }
    });

    var inputGroup = wrapper.find('input')[0];
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy();
  });

  it('should start out as invalid', function () {
    var wrapper = mount(VTextField, {
      propsData: {
        rules: [function (v) {
          return !!v || 'Required';
        }]
      }
    });

    expect(wrapper.data().valid).toEqual(false);
  });

  it('should start validating on input', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VTextField, {});


            expect(wrapper.data().shouldValidate).toEqual(false);
            wrapper.setProps({ value: 'asd' });
            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.data().shouldValidate).toEqual(true);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should not start validating on input if validate-on-blur prop is set', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VTextField, {
              propsData: {
                validateOnBlur: true
              }
            });


            expect(wrapper.data().shouldValidate).toEqual(false);
            wrapper.setProps({ value: 'asd' });
            _context2.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.data().shouldValidate).toEqual(false);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should not display counter when set to false', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(VTextField, {
              propsData: {
                counter: true,
                max: 50
              }
            });


            expect(wrapper.find('.input-group__counter')[0]).not.toBe(undefined);
            expect(wrapper.html()).toMatchSnapshot();

            wrapper.setProps({ counter: false });
            _context3.next = 6;
            return wrapper.vm.$nextTick();

          case 6:

            expect(wrapper.html()).toMatchSnapshot();
            expect(wrapper.find('.input-group__counter')[0]).toBe(undefined);

          case 8:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should have readonly attribute', function () {
    var wrapper = mount(VTextField, {
      propsData: {
        readonly: true
      }
    });

    var input = wrapper.find('input')[0];

    expect(input.getAttribute('readonly')).toBe('readonly');
  });

  it('should clear input value', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper, clear, input;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(VTextField, {
              propsData: {
                clearable: true,
                value: 'foo'
              }
            });
            clear = wrapper.find('.input-group__append-icon')[0];
            input = jest.fn();

            wrapper.vm.$on('input', input);

            expect(wrapper.vm.inputValue).toBe('foo');

            clear.trigger('click');

            _context4.next = 8;
            return wrapper.vm.$nextTick();

          case 8:

            expect(input).toHaveBeenCalledWith(null);

          case 9:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should not clear input if not clearable and has appended icon (with callback)', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var appendIconCb, wrapper, icon;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            appendIconCb = jest.fn();
            wrapper = mount(VTextField, {
              propsData: {
                value: 'foo',
                appendIcon: 'block',
                appendIconCb: appendIconCb
              }
            });
            icon = wrapper.find('.input-group__append-icon')[0];

            icon.trigger('click');
            _context5.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(wrapper.vm.inputValue).toBe('foo');
            expect(appendIconCb.mock.calls).toHaveLength(1);

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('should not clear input if not clearable and has appended icon (without callback)', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var wrapper, icon;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            wrapper = mount(VTextField, {
              propsData: {
                value: 'foo',
                appendIcon: 'block'
              }
            });
            icon = wrapper.find('.input-group__append-icon')[0];

            icon.trigger('click');
            _context6.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.vm.inputValue).toBe('foo');

          case 6:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  })));

  it('should start validating on blur', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            wrapper = mount(VTextField, {});
            input = wrapper.find('input')[0];

            expect(wrapper.data().shouldValidate).toEqual(false);
            input.trigger('focus');
            _context7.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            input.trigger('blur');
            _context7.next = 9;
            return wrapper.vm.$nextTick();

          case 9:
            expect(wrapper.data().shouldValidate).toEqual(true);

          case 10:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, _this);
  })));

  it('should keep its value on blur', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            wrapper = mount(VTextField, {
              propsData: {
                value: 'asd'
              }
            });
            input = wrapper.find('input')[0];


            input.element.value = 'fgh';
            input.trigger('input');
            input.trigger('blur');

            expect(input.element.value).toBe('fgh');

          case 6:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, _this);
  })));

  it('should update if value is changed externally', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            wrapper = mount(VTextField, {});
            input = wrapper.find('input')[0];


            wrapper.setProps({ value: 'fgh' });
            expect(input.element.value).toBe('fgh');

            input.trigger('focus');
            wrapper.setProps({ value: 'jkl' });
            expect(input.element.value).toBe('jkl');

          case 7:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, _this);
  })));

  it('should fire a single change event on blur', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var value, change, component, wrapper, input;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            value = 'asd';
            change = jest.fn();
            component = {
              render: function render(h) {
                return h(VTextField, {
                  on: {
                    input: function input(i) {
                      return value = i;
                    },
                    change: change
                  },
                  props: { value: value }
                });
              }
            };
            wrapper = mount(component);
            input = wrapper.find('input')[0];


            input.trigger('focus');
            _context10.next = 8;
            return wrapper.vm.$nextTick();

          case 8:
            input.element.value = 'fgh';
            input.trigger('input');

            _context10.next = 12;
            return wrapper.vm.$nextTick();

          case 12:
            input.trigger('blur');
            _context10.next = 15;
            return wrapper.vm.$nextTick();

          case 15:

            expect(change).toBeCalledWith('fgh');
            expect(change.mock.calls).toHaveLength(1);

          case 17:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, _this);
  })));

  it('should not make prepend icon clearable', function () {
    var wrapper = mount(VTextField, {
      propsData: {
        prependIcon: 'check',
        appendIcon: 'check',
        value: 'test',
        clearable: true
      }
    });

    var prepend = wrapper.find('.input-group__prepend-icon')[0];
    expect(prepend.text()).toBe('check');
    expect(prepend.element.classList).not.toContain('input-group__icon-cb');
  });

  it('should not emit change event if value has not changed', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var change, value, component, wrapper, input;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            change = jest.fn();
            value = 'test';
            component = {
              render: function render(h) {
                return h(VTextField, {
                  on: {
                    input: function input(i) {
                      return value = i;
                    },
                    change: change
                  },
                  props: { value: value }
                });
              }
            };
            wrapper = mount(component);
            input = wrapper.find('input')[0];


            input.trigger('focus');
            _context11.next = 8;
            return wrapper.vm.$nextTick();

          case 8:
            input.trigger('blur');
            _context11.next = 11;
            return wrapper.vm.$nextTick();

          case 11:

            expect(change.mock.calls.length).toBe(0);

          case 12:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, _this);
  })));

  it('should render component with async loading and match snapshot', function () {
    var wrapper = mount(VTextField, {
      components: {
        VProgressLinear: VProgressLinear
      },
      propsData: {
        loading: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with async loading and custom progress and match snapshot', function () {
    var progress = Vue.component('test', {
      components: {
        VProgressLinear: VProgressLinear
      },
      render: function render(h) {
        return h('v-progress-linear', {
          props: {
            indeterminate: true,
            height: 7,
            color: 'orange'
          }
        });
      }
    });

    var wrapper = mount(VTextField, {
      propsData: {
        loading: true
      },
      slots: {
        progress: [progress]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should display the number 0', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            wrapper = mount(VTextField, {
              propsData: { value: 0 }
            });


            expect(wrapper.vm.$refs.input.value).toBe('0');

          case 2:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, _this);
  })));

  it('should reset internal change on blur', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            wrapper = mount(VTextField);


            wrapper.setProps({ value: 'foo' });
            wrapper.vm.internalChange = true;
            _context13.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.vm.internalChange).toBe(true);
            wrapper.vm.blur();
            _context13.next = 9;
            return wrapper.vm.$nextTick();

          case 9:
            expect(wrapper.vm.internalChange).toBe(false);

          case 10:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, _this);
  })));
});