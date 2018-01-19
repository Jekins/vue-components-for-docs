import VAvatar from '~components/VAvatar';
import { test } from '~util/testing';

test('VAvatar.vue', function (_ref) {
  var mount = _ref.mount,
      functionalContext = _ref.functionalContext;

  it('should have an avatar class', function () {
    var wrapper = mount(VAvatar, functionalContext());

    expect(wrapper.hasClass('avatar')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});