# 基于iview的多选级联组件

## description

enhance multiple cascader base on iview

## usage

### import
```bash
# install module
npm i southhill/enhance-multiple-cascader -S
```
```javascript
import EnhanceMultipleCascader from 'enhance-multiple-cascader'

Vue.use(EnhanceMultipleCascader)
```
### props explain

| prop                    | type     | default                                                                                     | explain                                                                                                                                                    |
| :---------------------- | :------- | :------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **multiple**            | Boolean  | `true`                                                                                      | 默认为多选级联                                                                                                                                             |
| disabled                | Boolean  | `false`                                                                                     | 是否被禁用                                                                                                                                                 |
| value                   | Array    | `[]`                                                                                        | 双向绑定使用的值                                                                                                                                           |
| data                    | Array    | `[]`                                                                                        | 待使用的级联数据                                                                                                                                           |
| propAlias               | Object   | <code>{ label: 'label', value: 'value', disabled: 'disabled', children: 'children' }</code> | 传递下来的data数据的属性的别名。有可能从服务端获取到的data树的属性名并不能符合当前使用中的属性名，所以做一次映射操作，以避免对服务端数据的处理，方便操作。 |
| onlyLeaf                | Boolean  | `true`                                                                                      | 仅仅只能选择叶子节点                                                                                                                                       |
| allowSelectByParentNode | Boolean  | `false`                                                                                     | 允许通过父节点来选择相应的子节点                                                                                                                           |
| maxTagCount             | Number   | `-1`                                                                                        | 当选中多个项目时，是否对显示在输入框中的条目精简显示，`-1`表示不进行精简显示                                                                               |
| maxTagPlaceholder       | Function | <code>v => \`+ ${v}...\`<code>                                                              | 当maxTagCount传入真值，精简显示的文案                                                                                                                      |
| filterable              | Boolean  | `false`                                                                                     | 是否通过输入过滤级联数据                                                                                                                                   |
| clearable               | Boolean  | `false`                                                                                     | 是否可以通过清空输入框的方式删除全部选中的条目                                                                                                             |
| allowDeleteByCloseIcon  | Boolean  | `true`                                                                                      | 允许通过Tag的关闭按钮来删除相应选中的条目                                                                                                                  |
| labelInValue            | Boolean  | `false`                                                                                     | 触发`on-change`事件时，返回的参数是否要被包装为传入的对象形式                                                                                              |
| transfer                | Boolean  | -                                                                                           | 下拉组件是否挂载到body元素上                                                                                                                               |
| placeholder             | String   | `'请选择'`                                                                                  | 没有值未操作时的占位符                                                                                                                                     |
| name                    | String   | `'cascader'`                                                                                | 组件内部使用                                                                                                                                               |
| headStyle               | Object   | `{}`                                                                                        | 控制级联框的行内样式，多用来控制级联框宽度，默认宽度为`240px`                                                                                              |
