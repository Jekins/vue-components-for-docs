import { test } from '~util/testing';
import { mount } from 'avoriaz';
import VCheckbox from '~components/VCheckbox';

test('VCheckbox.js', function () {
  it('should return true when clicked', function () {
    var wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false
      }
    });

    var ripple = wrapper.find('.input-group--selection-controls__ripple')[0];

    var change = jest.fn();
    wrapper.vm.$on('change', change);

    ripple.trigger('click');
    expect(change).toBeCalledWith(true);
  });

  it('should return a value when toggled on with a specified value', function () {
    var wrapper = mount(VCheckbox, {
      propsData: {
        value: 'John',
        inputValue: null
      }
    });

    var ripple = wrapper.find('.input-group--selection-controls__ripple')[0];

    var change = jest.fn();
    wrapper.vm.$on('change', change);

    ripple.trigger('click');
    expect(change).toBeCalledWith('John');
  });

  it('should return null when toggled off with a specified value', function () {
    var wrapper = mount(VCheckbox, {
      propsData: {
        value: 'John',
        inputValue: 'John'
      }
    });

    var ripple = wrapper.find('.input-group--selection-controls__ripple')[0];

    var change = jest.fn();
    wrapper.vm.$on('change', change);

    ripple.trigger('click');
    expect(change).toBeCalledWith(null);
  });

  it('should toggle when label is clicked', function () {
    var wrapper = mount(VCheckbox, {
      propsData: {
        label: 'Label',
        value: null
      },
      attrs: {}
    });

    var label = wrapper.find('label')[0];

    var change = jest.fn();
    wrapper.vm.$on('change', change);

    label.trigger('click');
    expect(change).toBeCalled();
  });

  it('should render role and aria-checked attributes on input group', function () {
    var wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false
      }
    });

    var inputGroup = wrapper.find('.input-group')[0];

    expect(inputGroup.getAttribute('role')).toBe('checkbox');
    expect(inputGroup.getAttribute('aria-checked')).toBe('false');

    wrapper.setProps({ 'inputValue': true });
    expect(inputGroup.getAttribute('aria-checked')).toBe('true');

    wrapper.setProps({ 'indeterminate': true });
    expect(inputGroup.getAttribute('aria-checked')).toBe('mixed');
  });

  it('should render aria-label attribute with label value on input group', function () {
    var wrapper = mount(VCheckbox, {
      propsData: {
        label: 'Test'
      },
      attrs: {}
    });

    var inputGroup = wrapper.find('.input-group')[0];
    expect(inputGroup.getAttribute('aria-label')).toBe('Test');
  });

  it('should not render aria-label attribute with no label value on input group', function () {
    var wrapper = mount(VCheckbox, {
      propsData: {
        label: null
      }
    });

    var inputGroup = wrapper.find('.input-group')[0];
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy();
  });

  it('should toggle on space and enter with default toggleKeys', function () {
    var wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false
      }
    });

    var change = jest.fn();
    wrapper.vm.$on('change', change);

    wrapper.trigger('keydown.enter');
    wrapper.trigger('keydown.space');

    expect(change.mock.calls).toHaveLength(2);
  });

  it('should not toggle on space or enter with blank toggleKeys', function () {
    var wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false,
        toggleKeys: []
      }
    });

    var change = jest.fn();
    wrapper.vm.$on('change', change);

    wrapper.trigger('keydown.enter');
    wrapper.trigger('keydown.space');

    expect(change).not.toBeCalled();
  });

  it('should toggle only on custom toggleKeys', function () {
    var wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false,
        toggleKeys: [32] // space
      }
    });

    var change = jest.fn();
    wrapper.vm.$on('change', change);

    wrapper.trigger('keydown.enter');
    expect(change).not.toBeCalled();

    wrapper.trigger('keydown.space');
    expect(change).toBeCalled();
  });

  it('should set ripple data attribute based on disabled state', function () {
    var wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false,
        disabled: false
      }
    });

    var ripple = wrapper.find('.input-group--selection-controls__ripple')[0];

    expect(ripple.getAttribute('data-ripple')).toBe('true');

    wrapper.setProps({ disabled: true });

    expect(ripple.getAttribute('data-ripple')).toBe('false');
  });

  it('should not render ripple when ripple prop is false', function () {
    var wrapper = mount(VCheckbox, {
      propsData: {
        inputValue: false,
        ripple: false
      }
    });

    var ripple = wrapper.find('.input-group--selection-controls__ripple');

    expect(ripple.length).toBe(0);
  });

  it('should render ripple with data attribute when ripple prop is true', function () {
    var wrapper = mount(VCheckbox, {
      propsData: {
        ripple: true
      }
    });

    var ripple = wrapper.find('.input-group--selection-controls__ripple')[0];

    expect(ripple.getAttribute('data-ripple')).toBe('true');
  });
});