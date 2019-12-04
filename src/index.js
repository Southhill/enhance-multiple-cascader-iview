import EnhanceMultipleCascader from "./cascader.vue";

function install(_Vue) {
  _Vue.component("EnhanceMultipleCascader", EnhanceMultipleCascader);
}

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default { install };

export { EnhanceMultipleCascader };
