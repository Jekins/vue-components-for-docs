import { createSimpleFunctional } from '../../util/helpers';
import VContent from './VContent';
import VContainer from './VContainer';
import VFlex from './VFlex';
import VLayout from './VLayout';

var VSpacer = createSimpleFunctional('spacer');

export { VContainer, VContent, VFlex, VLayout, VSpacer };

var VGrid = {};

/* istanbul ignore next */
VGrid.install = function install(Vue) {
  Vue.component(VContent.name, VContent);
  Vue.component(VContainer.name, VContainer);
  Vue.component(VFlex.name, VFlex);
  Vue.component(VLayout.name, VLayout);
  Vue.component(VSpacer.name, VSpacer);
};

export default VGrid;