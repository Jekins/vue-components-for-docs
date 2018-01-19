import VDatePicker from '~components/VDatePicker';
import { test } from '~util/testing';
import { mount } from 'avoriaz';

test('VDatePicker.js', function (_ref) {
  var mount = _ref.mount;

  it('should display the correct date in title and header', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01'
      }
    });

    var title = wrapper.find('.picker--date__title-date div')[0];
    var header = wrapper.find('.picker--date__header-selector-date strong')[0];

    expect(title.text()).toBe('Tue, Nov 1');
    expect(header.text()).toBe('November 2005');
  });

  it('should match snapshot with default settings', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with pick-month prop', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        type: 'month'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with dark theme', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        dark: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with allowed dates', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        allowedDates: { min: '2013-05-03', max: '2013-05-19' }
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with allowed dates and pick-month prop', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month',
        allowedDates: ['2013-01', '2013-03', '2013-05', '2013-07', '2013-09']
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with no title', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        noTitle: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with first day of week', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        firstDayOfWeek: 2
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  // TODO: This fails in different ways for multiple people
  // Avoriaz/Jsdom (?) doesn't fully support date formatting using locale
  // This should be tested in browser env
  it.skip('should match snapshot with locale', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        locale: 'fa-AF'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with title/header formatting functions', function () {
    var dateFormat = function dateFormat(date) {
      return '(' + date + ')';
    };
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        headerDateFormat: dateFormat,
        titleDateFormat: dateFormat
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with month formatting functions', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        type: 'month',
        monthFormat: function monthFormat(date) {
          return '(' + date.split('-')[1] + ')';
        }
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with colored date picker', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        color: 'primary',
        headerColor: 'orange darken-1'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with colored date picker', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        color: 'orange darken-1'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with colored month picker', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        type: 'month',
        value: '2005-11-01',
        color: 'primary',
        headerColor: 'orange darken-1'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with colored month picker', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        type: 'month',
        value: '2005-11-01',
        color: 'orange darken-1'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});