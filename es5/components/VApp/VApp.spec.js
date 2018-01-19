import VApp from '~components/VApp';
import { test } from '~util/testing';

test('VApp.js', function (_ref) {
  var mount = _ref.mount;

  it('should match a snapshot', function () {
    var wrapper = mount(VApp);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have data-app attribute', function () {
    var wrapper = mount(VApp);
    var app = wrapper.find('.application')[0];

    expect(app.getAttribute('data-app')).toBe('true');
  });

  it('should allow a custom id', function () {
    var wrapper = mount(VApp, {
      propsData: {
        id: 'inspire'
      }
    });
    var app = wrapper.find('.application')[0];

    expect(app.getAttribute('id')).toBe('inspire');
    expect(wrapper.html()).toMatchSnapshot();
  });
});