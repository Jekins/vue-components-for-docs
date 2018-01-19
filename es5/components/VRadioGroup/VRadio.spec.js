import { test } from '~util/testing';
import { VRadioGroup, VRadio } from '~components/VRadioGroup';

test('VRadio.vue', function (_ref) {
  var mount = _ref.mount;

  it('should advise about v-radio-group being necessary', function () {
    mount(VRadio, {
      provide: {
        name: function name() {
          return 'name';
        },
        isMandatory: function isMandatory() {
          return false;
        }
      }
    });

    expect('The v-radio component must be used inside a v-radio-group.').toHaveBeenTipped();
  });

  // TODO: Enable test when there's a way to test $parent.$vnode.tag
  it('should not advise about v-radio-group being necessary in VRadioGroup', function () {
    var wrapper = mount(VRadioGroup, {
      slots: {
        default: [VRadio]
      }
    });
    // no expectation other than a lack of tip
  });

  it('should render role and aria-checked attributes on input group', function () {
    var wrapper = mount(VRadio, {
      data: {
        isActive: false
      },
      provide: {
        name: function name() {
          return 'name';
        },
        isMandatory: function isMandatory() {
          return false;
        }
      }
    });

    var inputGroup = wrapper.find('.input-group')[0];
    expect(inputGroup.getAttribute('role')).toBe('radio');
    expect(inputGroup.getAttribute('aria-checked')).toBe('false');

    wrapper.setData({ 'isActive': true });
    inputGroup = wrapper.find('.input-group')[0];
    expect(inputGroup.getAttribute('aria-checked')).toBe('true');
    expect(wrapper.html()).toMatchSnapshot();

    expect('The v-radio component must be used inside a v-radio-group.').toHaveBeenTipped();
  });

  it('should render aria-label attribute with label value on input group', function () {
    var wrapper = mount(VRadio, {
      propsData: {
        label: 'Test'
      },
      attrs: {},
      provide: {
        name: function name() {
          return 'name';
        },
        isMandatory: function isMandatory() {
          return false;
        }
      }
    });

    var inputGroup = wrapper.find('.input-group')[0];
    expect(inputGroup.getAttribute('aria-label')).toBe('Test');
    expect(wrapper.html()).toMatchSnapshot();

    expect('The v-radio component must be used inside a v-radio-group.').toHaveBeenTipped();
  });

  it('should not render aria-label attribute with no label value on input group', function () {
    var wrapper = mount(VRadio, {
      propsData: {
        label: null
      },
      provide: {
        name: function name() {
          return 'name';
        },
        isMandatory: function isMandatory() {
          return false;
        }
      }
    });

    var inputGroup = wrapper.find('.input-group')[0];
    expect(inputGroup.element.getAttribute('aria-label')).toBeFalsy();
    expect(wrapper.html()).toMatchSnapshot();

    expect('The v-radio component must be used inside a v-radio-group.').toHaveBeenTipped();
  });

  it('should render proper input name', function () {
    var wrapper = mount(VRadio, {
      provide: {
        name: function name() {
          return 'name';
        },
        isMandatory: function isMandatory() {
          return false;
        }
      }
    });

    var input = wrapper.find('input')[0];
    expect(input.getAttribute('name')).toBe('name');
    expect(wrapper.html()).toMatchSnapshot();

    expect('The v-radio component must be used inside a v-radio-group.').toHaveBeenTipped();
  });

  it('should register and unregister', function () {
    var register = jest.fn();
    var unregister = jest.fn();

    var wrapper = mount(VRadio, {
      attachToDocument: true,
      provide: {
        name: function name() {
          return 'name';
        },
        radio: {
          register: register,
          unregister: unregister
        },
        isMandatory: function isMandatory() {
          return false;
        }
      }
    });

    expect(register).toHaveBeenCalled();
    wrapper.destroy();
    expect(unregister).toHaveBeenCalled();
  });

  it('should not render ripple when ripple prop is false', function () {
    var wrapper = mount(VRadio, {
      propsData: {
        ripple: false
      },
      provide: {
        name: function name() {
          return 'name';
        },
        isMandatory: function isMandatory() {
          return false;
        }
      }
    });

    var ripple = wrapper.find('.input-group--selection-controls__ripple');

    expect(ripple.length).toBe(0);

    expect('The v-radio component must be used inside a v-radio-group.').toHaveBeenTipped();
  });

  it('should render ripple with data attribute when ripple prop is true', function () {
    var wrapper = mount(VRadio, {
      propsData: {
        ripple: true
      },
      provide: {
        name: function name() {
          return 'name';
        },
        isMandatory: function isMandatory() {
          return false;
        }
      }
    });

    var ripple = wrapper.find('.input-group--selection-controls__ripple')[0];

    expect(ripple.getAttribute('data-ripple')).toBe('true');

    expect('The v-radio component must be used inside a v-radio-group.').toHaveBeenTipped();
  });
});