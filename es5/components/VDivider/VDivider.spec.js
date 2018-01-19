import { mount } from 'avoriaz';
import VDivider from '~components/VDivider';
import { test, functionalContext } from '~util/testing';

test('VDivider.js', function () {
  it('should render component and match snapshot', function () {
    var wrapper = mount(VDivider, functionalContext());

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render an inset component and match snapshot', function () {
    var wrapper = mount(VDivider, functionalContext({
      propsData: {
        inset: true
      }
    }));

    expect(wrapper.html()).toMatchSnapshot();
  });
});