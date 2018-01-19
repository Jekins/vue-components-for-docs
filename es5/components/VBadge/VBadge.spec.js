var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { mount } from 'avoriaz';
import { compileToFunctions } from 'vue-template-compiler';
import VBadge from '~components/VBadge';
import { test } from '~util/testing';

test('VBadge.js', function () {
  it('should render component and match snapshot', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VBadge, {
              slots: {
                badge: [compileToFunctions('<span>content</span>')],
                default: [compileToFunctions('<span>element</span>')]
              }
            });


            expect(wrapper.html()).toMatchSnapshot();

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should render component with with value=false and match snapshot', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VBadge, {
              propsData: {
                value: false
              },
              slots: {
                badge: [compileToFunctions('<span>content</span>')],
                default: [compileToFunctions('<span>element</span>')]
              }
            });


            expect(wrapper.html()).toMatchSnapshot();

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should render component with bottom prop', function () {
    var wrapper = mount(VBadge, {
      propsData: {
        bottom: true
      }
    });

    expect(wrapper.hasClass('badge--bottom')).toBe(true);
  });

  it('should render component with left prop', function () {
    var wrapper = mount(VBadge, {
      propsData: {
        left: true
      }
    });

    expect(wrapper.hasClass('badge--left')).toBe(true);
  });

  it('should render component with overlap prop', function () {
    var wrapper = mount(VBadge, {
      propsData: {
        overlap: true
      }
    });

    expect(wrapper.hasClass('badge--overlap')).toBe(true);
  });

  it('should render component with color prop', function () {
    var wrapper = mount(VBadge, {
      propsData: {
        color: 'green lighten-1'
      },
      slots: {
        badge: [compileToFunctions('<span>content</span>')]
      }
    });

    var badge = wrapper.find('.badge__badge')[0];
    expect(badge.hasClass('green')).toBe(true);
    expect(badge.hasClass('lighten-1')).toBe(true);
  });
});