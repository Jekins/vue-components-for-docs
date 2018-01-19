import { test } from '~util/testing';
import { mount } from 'avoriaz';
import VCard from '~components/VCard';

test('VCard.vue', function () {
  it('should render component and match snapshot', function () {
    var wrapper = mount(VCard);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render card with img', function () {
    var wrapper = mount(VCard, {
      propsData: {
        img: 'image.jpg'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a flat card', function () {
    var wrapper = mount(VCard, {
      propsData: {
        flat: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a raised card', function () {
    var wrapper = mount(VCard, {
      propsData: {
        raised: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a colored card', function () {
    var wrapper = mount(VCard, {
      propsData: {
        color: 'blue lighten-1'
      }
    });

    expect(wrapper.element.classList).toContain('blue');
    expect(wrapper.element.classList).toContain('lighten-1');
  });

  it('should render a tile card', function () {
    var wrapper = mount(VCard, {
      propsData: {
        tile: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a card with custom height', function () {
    var heightpx = '400px';
    var wrapper = mount(VCard, {
      propsData: {
        height: heightpx
      }
    });

    expect(wrapper.hasStyle('height', heightpx)).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a tile card', function () {
    var wrapper = mount(VCard, {
      propsData: {
        tile: true
      }
    });

    expect(wrapper.hasClass('card--tile')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});