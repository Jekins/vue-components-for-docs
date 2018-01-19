import { createSimpleFunctional } from '../../util/helpers';

import VList from './VList';
import VListGroup from './VListGroup';
import VListTile from './VListTile';
import VListTileAction from './VListTileAction';

export { VList, VListGroup, VListTile, VListTileAction };
export var VListTileActionText = createSimpleFunctional('list__tile__action-text', 'span');
export var VListTileAvatar = createSimpleFunctional('list__tile__avatar', 'v-avatar');
export var VListTileContent = createSimpleFunctional('list__tile__content', 'div');
export var VListTileTitle = createSimpleFunctional('list__tile__title', 'div');
export var VListTileSubTitle = createSimpleFunctional('list__tile__sub-title', 'div');

/* istanbul ignore next */
VList.install = function install(Vue) {
  Vue.component(VList.name, VList);
  Vue.component(VListGroup.name, VListGroup);
  Vue.component(VListTile.name, VListTile);
  Vue.component(VListTileAction.name, VListTileAction);
  Vue.component(VListTileActionText.name, VListTileActionText);
  Vue.component(VListTileAvatar.name, VListTileAvatar);
  Vue.component(VListTileContent.name, VListTileContent);
  Vue.component(VListTileSubTitle.name, VListTileSubTitle);
  Vue.component(VListTileTitle.name, VListTileTitle);
};

export default VList;