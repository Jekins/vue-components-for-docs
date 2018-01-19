import { test } from '~util/testing';
import VIcon from '~components/VIcon';
import { VToolbarSideIcon } from '~components/VToolbar';

test('VToolbarSideIcon.js', function (_ref) {
  var mount = _ref.mount,
      functionalContext = _ref.functionalContext;

  it('should create default icon when no slot used', function () {
    var context = functionalContext();
    var wrapper = mount(VToolbarSideIcon, context);

    expect(wrapper.find('i')[0].hasClass('material-icons')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should create slot icon when present', function () {
    var iconWrapper = mount(VIcon, functionalContext({}, 'fa-add'));

    var context = functionalContext({}, iconWrapper.vNode);
    var wrapper = mount(VToolbarSideIcon, context);

    expect(wrapper.find('i')[0].hasClass('fa-add')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should pass through events properly', function () {
    var click = jest.fn();
    var context = functionalContext({
      on: { click: click }
    });
    var wrapper = mount(VToolbarSideIcon, context);

    wrapper.trigger('click');

    expect(click).toBeCalled();
  });

  it('should pass through props to button component', function () {
    var context = functionalContext({
      props: {
        dark: true
      }
    });
    var wrapper = mount(VToolbarSideIcon, context);

    expect(wrapper.hasClass('theme--dark')).toBe(true);
  });

  it('should pass through css classes to button component', function () {
    var context = functionalContext({
      staticClass: 'hidden-sm-and-up'
    });
    var wrapper = mount(VToolbarSideIcon, context);

    expect(wrapper.hasClass('hidden-sm-and-up')).toBe(true);
  });

  it('should pass through directives to button component', function () {
    var context = functionalContext({
      directives: [{
        name: 'show',
        value: false
      }]
    });
    var wrapper = mount(VToolbarSideIcon, context);

    expect(wrapper.hasStyle('display', 'none')).toBe(true);
  });
});