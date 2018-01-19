import { test } from '~util/testing';
import VProgressLinear from './VProgressLinear';

test('VProgressLinear.js', function (_ref) {
  var mount = _ref.mount;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        value: 33
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with color and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        value: 33,
        color: 'orange'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with color and background opacity and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        value: 33,
        color: 'orange',
        backgroundOpacity: 0.5
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with color and background color and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        value: 33,
        color: 'orange',
        backgroundColor: 'blue'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with color and background color and opacity and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        value: 33,
        color: 'orange',
        backgroundColor: 'blue',
        backgroundOpacity: 0.5
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render indeterminate progress and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        indeterminate: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render indeterminate progress with query prop and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        indeterminate: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with buffer value and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        value: 33,
        bufferValue: 80
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with buffer value and value > buffer value and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        value: 90,
        bufferValue: 80
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});