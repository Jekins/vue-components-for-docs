import { test } from '~util/testing';
import VFlex from '~components/VGrid/VFlex';

test('VFlex', function (_ref) {
  var mount = _ref.mount,
      functionalContext = _ref.functionalContext;

  it('should conditionally apply if boolean is used', function () {
    var wrapper = mount(VFlex, functionalContext({
      attrs: {
        md6: false
      }
    }));

    expect(wrapper.hasClass('md6')).toBe(false);
  });
});