import { test } from '~util/testing';
import { VCarouselItem } from '~components/VCarousel';

var imageSrc = 'https://vuetifyjs.com/static/doc-images/cards/sunshine.jpg';
var warning = '[Vuetify] Warn: The v-carousel-item component must be used inside a v-carousel.';

test('VCarouselItem.js', function (_ref) {
  var mount = _ref.mount;

  it('should throw warning when not used inside v-carousel', function () {
    var wrapper = mount(VCarouselItem, {
      propsData: {
        src: imageSrc
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(warning).toHaveBeenTipped();
  });

  it('should render component and match snapshot', function () {
    var wrapper = mount(VCarouselItem, {
      propsData: {
        src: imageSrc
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(warning).toHaveBeenTipped();
  });
});