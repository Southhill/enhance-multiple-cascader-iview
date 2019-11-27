import EnhanceMultiCascader from "./cascader.vue";

function install(_Vue) {
  _Vue.component("EnhanceMultiCascader", EnhanceMultiCascader);
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

const enhanceMultiCascader = {
  EnhanceMultiCascader
};
export default Object.assign(enhanceMultiCascader, { install });
