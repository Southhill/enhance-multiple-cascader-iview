<template>
  <div class="enhance-mul-cascader-head">
    <template v-if="multiple">
      <template v-for="(tag, idx) of values">
        <Tag
          v-if="idx < displayTagCount"
          :key="idx"
          :name="tag[valueProp]"
          :closable="allowDeleteByCloseIcon"
          @click.native.stop="handleHeadClick"
          @on-close="removeTag"
          >{{ tag[labelProp] }}</Tag
        >
      </template>
      <span
        v-if="values.length > displayTagCount"
        class="rest-tag-amount"
        @click.native.stop="displayAllTag"
        >{{ maxTagPlaceholder(values.length - maxTagCount) }}</span
      >
    </template>
    <template v-else>
      <span class="single-display-value">{{ selectedSingle }}</span>
    </template>
    <Input
      v-if="filterable"
      ref="input"
      v-model="query"
      type="text"
      :disabled="disabled"
      :placeholder="placeholder"
      :style="inputStyle"
      autocomplete="off"
      spellcheck="false"
      @keydown.exact="resetInputState"
      @keydown.delete="handleInputDelete"
      @click.native.stop="handleHeadClick"
      @on-change="handleQueryChange"
      @focus="handleInputFocus"
      @blur="handleInputBlur"
    />
    <Icon
      v-if="clearable"
      type="ios-close-circle"
      @click.native.stop="onClear"
    ></Icon>
    <Icon
      v-if="!clearable"
      :class="['head-menu-arrow', { rotate: visible }]"
      type="ios-arrow-down"
    ></Icon>
  </div>
</template>

<script>
import { Input, Icon, Tag } from 'iview'

export default {
  name: 'CascaderHead',
  components: {
    Input,
    Icon,
    Tag
  },
  inject: ['rootProp'],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    allowDeleteByCloseIcon: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    values: {
      type: Array,
      default: () => []
    },
    maxTagCount: {
      type: Number,
      default: -1
    },
    maxTagPlaceholder: {
      type: Function,
      default: v => `+ ${v}...`
    },
    propAlias: {
      type: Object,
      default() {
        return {
          label: 'label',
          value: 'value',
          disabled: 'disabled',
          children: 'children'
        }
      }
    }
  },
  data() {
    return {
      query: '',
      inputLength: 20,
      displayTagCount: 0
    }
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
    selectedSingle() {
      if (this.values.length) {
        return this.values[0][this.labelProp]
      } else {
        return this.placeholder
      }
    },
    inputStyle() {
      let style = {}

      if (this.multiple) {
        style.width = '100%'
      } else {
        style.width = `${this.inputLength}px`
      }

      return style
    }
  },
  watch: {
    values() {
      if (this.multiple) {
        this.query = ''
      }

      if (this.maxTagCount === -1) {
        this.displayTagCount = this.values.length
      }
    }
  },
  mounted() {
    this.displayTagCount = this.values.length
  },
  methods: {
    handleInputFocus() {
      this.$emit('on-input-focus')
    },
    handleInputBlur() {
      if (!this.values.length) this.query = ''

      this.$emit('on-input-blur')
    },
    resetInputState() {
      this.inputLength = this.$refs.input.value.length * 12 + 20

      this.$emit('on-keydown')
    },
    handleInputDelete(evt) {
      const targetValue = evt.target.value
      if (
        this.multiple &&
        this.values.length &&
        this.query === '' &&
        targetValue === ''
      ) {
        this.setCurrentValue(this.values.length - 1)
      }
    },
    handleQueryChange(evt) {
      this.query = evt.target.value

      // TODO: 需要做节流处理

      this.$emit('on-query-change', this.query)
    },

    handleHeadClick(evt) {
      if (this.filterable && evt.target === this.$el) {
        this.$refs.input.focus()
      }

      this.$emit('on-show-dropdown', true)
    },
    removeTag(evt, value) {
      if (this.disabled) return

      this.rootProp.setCurrentValue([{ [this.valueProp]: value }], false)
    },
    onClear() {
      this.query = ''

      this.$emit('on-clear')
    },
    displayAllTag() {
      this.displayTagCount = this.values.length
    }
  }
}
</script>

<style lang="less" scoped>
.enhance-mul-cascader-head {
  display: inline-block;
  max-width: 300px;
  min-height: 36px;
  line-height: 1.5;
  padding: 4px 10px 4px 5px;
  font-size: 12px;
  border: 1px solid #dcdee2;
  border-radius: 4px;
  color: #515a6e;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: text;
  .head-menu-arrow {
    position: absolute;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    &.rotate {
      transform: rotate(0.5turn) translateY(50%);
    }
  }
  .ivu-tag {
    margin: 2px 6px 2px 0;
  }
  .rest-tag-amount {
    display: inline-block;
    border: 1px solid #4a4abc;
    border-radius: 15px;
    width: 40px;
    padding: 2px 4px;
  }
}
</style>
