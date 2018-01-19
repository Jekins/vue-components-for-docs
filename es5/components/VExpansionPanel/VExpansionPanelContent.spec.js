import { test } from '~util/testing';
import { mount } from 'avoriaz';
import VExpansionPanelContent from './VExpansionPanelContent';

// TODO: Fix when Vue has optional injects
test.skip('VExpansionPanelContent.js', function () {
  it('should render component and match snapshot', function () {
    var wrapper = mount(VExpansionPanelContent);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render an expanded component and match snapshot', function () {
    var wrapper = mount(VExpansionPanelContent, {
      propsData: {
        ripple: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render an expanded component with lazy prop and match snapshot', function () {
    var wrapper = mount(VExpansionPanelContent, {
      propsData: {
        lazy: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});