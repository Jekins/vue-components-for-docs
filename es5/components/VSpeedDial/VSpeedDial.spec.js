import VSpeedDial from '~components/VSpeedDial';
import { test } from '~util/testing';

test('VSpeedDial.js', function (_ref) {
  var mount = _ref.mount;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VSpeedDial);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with custom direction and match snapshot', function () {
    var wrapper = mount(VSpeedDial, {
      propsData: {
        direction: 'right'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});