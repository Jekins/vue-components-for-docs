import VIcon from '~components/VIcon';
import { test, functionalContext } from '~util/testing';
import { mount } from 'avoriaz';

test('VIcon.js', function () {
  it('should render component', function () {
    var context = functionalContext({}, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.text()).toBe('add');
    expect(wrapper.element.className).toBe('material-icons icon');
  });

  it('should render a colored component', function () {
    var context = functionalContext({ props: { color: 'green lighten-1' } }, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.element.classList).toContain('green--text');
    expect(wrapper.element.classList).toContain('text--lighten-1');
  });

  it('should render a disabled component', function () {
    var context = functionalContext({ props: { disabled: true } }, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.element.classList).toContain('icon--disabled');
  });

  it('should render a large size component', function () {
    var context = functionalContext({ props: { large: true } }, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.element.classList).toContain('icon--large');
  });

  it('should render a medium size component', function () {
    var context = functionalContext({ props: { medium: true } }, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.element.classList).toContain('icon--medium');
  });

  it('should render a xLarge size component', function () {
    var context = functionalContext({ props: { xLarge: true } }, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.element.classList).toContain('icon--x-large');
  });

  it('should render a left aligned component', function () {
    var context = functionalContext({ props: { left: true } }, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.element.classList).toContain('icon--left');
  });

  it('should render a right aligned component', function () {
    var context = functionalContext({ props: { right: true } }, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.element.classList).toContain('icon--right');
  });

  it('should allow third-party icons when using <icon>- prefix', function () {
    var context = functionalContext({ props: {} }, 'fa-add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.text()).toBe('');
    expect(wrapper.element.className).toBe('fa icon fa-add');
  });

  it('should allow the use of v-text', function () {
    var wrapper = mount(VIcon, functionalContext({
      domProps: { textContent: 'fa-home' }
    }));

    expect(wrapper.text()).toBe('');
    expect(wrapper.element.className).toBe('fa icon fa-home');
  });

  it('should allow the use of v-html', function () {
    var wrapper = mount(VIcon, functionalContext({
      domProps: { innerHTML: 'fa-home' }
    }));

    expect(wrapper.text()).toBe('');
    expect(wrapper.element.className).toBe('fa icon fa-home');
  });
});