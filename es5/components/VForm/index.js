import VForm from './VForm';

/* istanbul ignore next */
VForm.install = function install(Vue) {
  Vue.component(VForm.name, VForm);
};

export default VForm;