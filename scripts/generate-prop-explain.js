const fs = require('fs')

try {
  const raw = fs.readFileSync('src/cascader.vue', 'utf8')
  const propContext = raw.match(/props:\s({[\W\w]+}),\r?\n\s+data\(\)/)[1]

  const propObj = eval(`(${propContext})`)
  const result = ['|prop|type|default|explain|', '|:--|:--|:--|:--|']
  const specialKeys = ['transfer', 'maxTagPlaceholder']
  const defaultValue4SpecialKeysMap = {
    transfer:
      "<pre>`!this.$IVIEW || this.$IVIEW.transfer === '' ? false : this.$IVIEW.transfer`</pre>",
    maxTagPlaceholder: '<pre>(v) => \\`+ ${v}...\\`</pre>'
  }

  Object.keys(propObj).forEach((key) => {
    const item = propObj[key]
    const { type, __description = '' } = item
    let defaultValue = ''

    if (specialKeys.includes(key)) {
      defaultValue = defaultValue4SpecialKeysMap[key]
    } else {
      if (typeof item.default === 'function') {
        if (!item.default.length) {
          defaultValue = `\`${JSON.stringify(item.default())}\``
        } else {
          defaultValue = `\`${item.default.toString()}\``
        }
      } else if (item.default === undefined) {
        defaultValue = ''
      } else {
        defaultValue = `\`${item.default}\``
      }
    }

    const str = `|${key}|${type.prototype.constructor.name}|${defaultValue}|${__description}|`

    result.push(str)
  })

  const readmeRaw = fs
    .readFileSync('README.md', 'utf8')
    .replace(
      /<!-- props explain start -->([\W\w]+)<!-- props explain end -->/,
      () => {
        return `<!-- props explain start -->\n${result.join(
          '\n'
        )}\n<!-- props explain end -->\n`
      }
    )

  fs.writeFile(
    'README.md',
    readmeRaw,
    { encoding: 'utf8', flag: 'w' },
    (err) => {
      if (err) {
        throw new Error(err)
      }
      console.log('generate prop explain successfully!')
    }
  )
} catch (err) {
  console.log(err)
}
