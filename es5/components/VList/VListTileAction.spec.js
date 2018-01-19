import { VListTileAction } from '~components/VList';
import { test } from '~util/testing';

test('VListTileAction.js', function (_ref) {
  var mount = _ref.mount,
      functionalContext = _ref.functionalContext;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VListTileAction, functionalContext());

    expect(wrapper.html()).toMatchSnapshot();
  });
});