import { test } from '~util/testing';
import { VCardTitle } from '~components/VCard';

test('VCardTitle.js', function (_ref) {
  var mount = _ref.mount,
      functionalContext = _ref.functionalContext;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VCardTitle, functionalContext());

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with specific padding applied', function () {
    var wrapper = mount(VCardTitle, functionalContext({
      props: {
        'primary-title': true
      }
    }));

    expect(wrapper.html()).toMatchSnapshot();
  });
});