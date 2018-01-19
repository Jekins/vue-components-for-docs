var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import VTimePicker from '~components/VTimePicker';
import { test } from '~util/testing';

test('VTimePicker.js', function (_ref) {
  var mount = _ref.mount;

  it('should accept a value', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:00:00'
      }
    });

    expect(wrapper.vm.inputTime).toBe('09:00:00');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should accept a date object for a value', function () {
    var now = new Date('2017-01-01 12:00 AM');
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: now
      }
    });

    expect(wrapper.vm.inputTime).toEqual('12:00am');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should change am/pm when updated from model', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '9:00am'
      }
    });

    wrapper.setProps({ value: '9:00pm' });

    expect(wrapper.data().period).toBe('pm');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not change period with 24hr prop', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        format: '24hr',
        value: null
      }
    });

    var ampm = wrapper.instance().inputTime.match(/(am|pm)/);

    expect(ampm).toBe(null);
  });

  it('should set picker to pm when given Date after noon', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: new Date('2017-01-01 12:00 PM')
      }
    });

    expect(wrapper.data().period).toEqual('pm');
  });

  it('should set picker to pm when given string with PM in it', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '1:00 PM'
      }
    });

    expect(wrapper.data().period).toEqual('pm');
  });

  it('should set picker to pm when given string with pm in it', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '1:00 pm'
      }
    });

    expect(wrapper.data().period).toEqual('pm');
  });

  it('should set picker to am when given Date before noon', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: new Date('2017-01-01 1:00 AM')
      }
    });

    expect(wrapper.data().period).toEqual('am');
  });

  it('should return proper value for isAllowed method (max)', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        allowedMinutes: [50, 55, 0, 5, 10],
        value: null
      }
    });

    expect([0, 5, 10, 15, 20, 45, 50, 55].map(function (minute) {
      return wrapper.vm.isAllowed('minute', minute);
    })).toEqual([true, true, true, false, false, false, true, true]);
  });

  it('should return proper value for isAllowed method (min/max)', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        allowedMinutes: { min: 33, max: 55 },
        value: null
      }
    });

    expect([0, 20, 30, 35, 45, 50, 55].map(function (minute) {
      return wrapper.vm.isAllowed('minute', minute);
    })).toEqual([false, false, false, true, true, true, true]);
  });

  it('should return proper value for isAllowed method (function)', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        allowedMinutes: function allowedMinutes(minute) {
          return [55, 0, 5].includes(minute);
        },
        value: null
      }
    });

    expect([0, 5, 45, 50, 55].map(function (minute) {
      return wrapper.vm.isAllowed('minute', minute);
    })).toEqual([true, true, false, false, true]);
  });

  it('should return proper value for isAllowed when evaluating the current period (function)', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        allowedHours: function allowedHours(hour) {
          return hour > 13;
        },
        format: '24hr',
        value: null
      }
    });

    expect([8, 9, 10, 14, 17].map(function (hour) {
      return wrapper.vm.isAllowed('hour', hour);
    })).toEqual([false, false, false, true, true]);
  });

  it('should reset selectingHour when saved/canceled', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VTimePicker, {
              propsData: {
                value: null
              }
            });


            wrapper.vm.selectingHour = false;
            wrapper.vm.save();
            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.vm.selectingHour).toBe(true);
            wrapper.vm.selectingHour = false;
            wrapper.vm.cancel();
            _context.next = 10;
            return wrapper.vm.$nextTick();

          case 10:
            expect(wrapper.vm.selectingHour).toBe(true);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should render colored time picker', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:00:00',
        color: 'primary',
        headerColor: 'orange darken-1'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render colored time picker', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:00:00',
        color: 'orange darken-1'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});