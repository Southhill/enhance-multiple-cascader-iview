<template>
  <li class="enhance-mul-cascader-item">
    <Checkbox
      v-if="showCheckbox"
      :value="isChecked"
      :disabled="isDisabled"
      :indeterminate="isIndeterminate"
      @on-change="handleCheckBoxChange"
    />
    {{ item[labelProp] }}
    <Icon v-if="showArrow" type="ios-arrow-forward"></Icon>
  </li>
</template>

<script>
import { Icon, Checkbox } from 'iview'

export default {
  name: 'CascaderItem',
  components: { Icon, Checkbox },
  inject: ['rootProp'],
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    values: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onlyLeaf: {
      type: Boolean,
      default: true,
    },
    uniqueFieldInLeaf: {
      type: String,
      default: '',
    },
    allowSelectByParentNode: {
      type: Boolean,
      default: false,
    },
    propAlias: {
      type: Object,
      default() {
        return {
          label: 'label',
          value: 'value',
          disabled: 'disabled',
          children: 'children',
        }
      },
    },
  },
  computed: {
    childrenProp() {
      return this.propAlias.children
    },
    valueProp() {
      return this.propAlias.value
    },
    labelProp() {
      return this.propAlias.label
    },
    disabledProp() {
      return this.propAlias.disabled
    },
    showArrow() {
      return !!(
        this.item[this.childrenProp] && this.item[this.childrenProp].length
      )
    },
    showCheckbox() {
      // 多选模式，并且onlyLeaf为false时，返回true
      // 多选模式，并且onlyLeaf并且当前组件为叶子组件时，返回true
      // 其他情况，都是返回false
      if (
        (this.multiple && this.onlyLeaf && this.isLeafNode) ||
        (this.multiple && !this.onlyLeaf)
      ) {
        return true
      }
      return false
    },
    isDisabled() {
      return !!(this.disabled || this.item[this.disabledProp])
    },
    isChecked() {
      return (
        this.values.findIndex(
          (item) => this.item[this.valueProp] === item[this.valueProp]
        ) > -1
      )
    },
    isLeafNode() {
      if (
        this.uniqueFieldInLeaf &&
        this.item[this.uniqueFieldInLeaf] === undefined
      ) {
        return false
      }
      return (
        !Array.isArray(this.item[this.childrenProp]) ||
        !this.item[this.childrenProp].length
      )
    },
    flatItem() {
      return this.getOffspringItems()
    },
    isIndeterminate() {
      if (this.isLeafNode) {
        return false
      }

      const children = this.item[this.childrenProp]

      if (!Array.isArray(children) || children.length === 0) {
        return false
      }

      const isAllChecked = this.flatItem.every((item) => {
        return (
          this.values.findIndex(
            (value) => value[this.valueProp] === item[this.valueProp]
          ) > -1
        )
      })
      const isNotAllChecked = this.flatItem.every((item) => {
        return (
          this.values.findIndex(
            (value) => value[this.valueProp] === item[this.valueProp]
          ) === -1
        )
      })

      if (isAllChecked || isNotAllChecked) {
        return false
      }

      return true
    },
  },
  methods: {
    handleCheckBoxChange(status) {
      const result = []
      if (this.multiple && !this.onlyLeaf && this.allowSelectByParentNode) {
        result.push(...this.flatItem)
      } else {
        result.push(this.item)
      }

      // status: false:删除；true：添加。
      this.rootProp.setCurrentValue(result, status)
    },
    getOffspringItems(item) {
      const ite = item ? item : this.item
      const iteChildren = ite[this.childrenProp]
      const result = [ite]

      if (Array.isArray(iteChildren) && iteChildren.length) {
        iteChildren.forEach((it) => {
          const subResult = this.getOffspringItems(it)

          result.push(...subResult)
        })
      }

      return result
    },
  },
}
</script>

<style lang="less" scoped>
.enhance-mul-cascader-item {
  margin: 0;
  line-height: normal;
  padding: 4px 7px;
  clear: both;
  color: #515a6e;
  font-size: 12px !important;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #f3f3f3;
  }
}
</style>
