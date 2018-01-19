var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '~util/testing';
import VParallax from '~components/VParallax';

test('VParallax.js', function (_ref) {
  var mount = _ref.mount;

  it('should render', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VParallax, {
              attachToDocument: true
            });


            expect(wrapper.html()).toMatchSnapshot();

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should use alt tag when supplied', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper, img;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VParallax, {
              attachToDocument: true,
              propsData: {
                alt: 'name'
              }
            });
            img = wrapper.find('img')[0];

            expect(img.getAttribute('alt')).toBe('name');
            expect(wrapper.html()).toMatchSnapshot();

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));
});