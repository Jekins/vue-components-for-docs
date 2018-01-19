import { test } from '~util/testing';
import { mount } from 'avoriaz';
import VExpansionPanel from '~components/VExpansionPanel';

// TODO: Fix when Vue has optional injects
test.skip('VExpansionPanel.js', function () {
  it('should render component and match snapshot', function () {
    var wrapper = mount(VExpansionPanel);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render an expanded component and match snapshot', function () {
    var wrapper = mount(VExpansionPanel, {
      propsData: {
        expand: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});