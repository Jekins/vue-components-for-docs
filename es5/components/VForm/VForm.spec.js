var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import Vue from 'vue';
import { mount } from 'avoriaz';
import { test } from '~util/testing';
import VTextField from '~components/VTextField';
import VBtn from '~components/VBtn';
import VForm from './VForm';

var inputOne = Vue.component('input-one', {
  render: function render(h) {
    return h(VTextField, {
      propsData: [function (v) {
        return !!v || 'Required';
      }]
    });
  }
});

test('VForm.js', function () {
  it('should pass on listeners to form element', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var submit, component, wrapper, btn;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            submit = jest.fn();
            component = Vue.component('test', {
              render: function render(h) {
                return h(VForm, {
                  on: {
                    submit: submit
                  }
                }, [h(VBtn, {
                  props: {
                    type: 'submit'
                  },
                  slot: 'default'
                }, ['Submit'])]);
              }
            });
            wrapper = mount(component);
            btn = wrapper.find('button')[0];


            btn.trigger('click');

            expect(submit).toBeCalled();

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));
});