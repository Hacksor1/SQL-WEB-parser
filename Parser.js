const axios = require('axios').default
const jsdom = require('jsdom')
const createXPathFromElement = require('./createXpath')
const { JSDOM } = jsdom

class Parser {
  // select <attrs> from <url> where [selector] like <regExp>
  static async exec(query) {
    try {
      var { attrs, url, selector, filter } =
        /^SELECT \[(?<attrs>.*?)\] FROM (?<url>.*?) WHERE \[(?<selector>.*)\] ?(LIKE (?<filter>.*))?/i.exec(query).groups
    } catch (e) {
      throw new Error('Wrong syntax')
    }
    console.log(attrs, url, selector, filter)
    attrs = attrs.split(',').map(attrName => attrName.trim())
    const res = await Parser._parseAttributes(url, attrs, selector, filter)
    return res
  }

  static async _parseAttributes(url, attributes, selector, filter) {
    try {
      var response = await axios.get(url)
    } catch (e) {
      throw new Error('HTTP request error. Maybe wrong url?')
    }

    const html = response.data
    const document = new JSDOM(html).window.document
    const elems = document.querySelectorAll(selector)

    const parseResult = {}
    for (const attributeName of attributes) {
      parseResult[attributeName] = new Set()
    }
    const filteredElem = new Set()
    for (const elem of elems) {
      for (const attributeName of attributes) {
        let attribute
        if (attributeName === 'innerHTML') {
          attribute = elem.innerHTML
        } else if (elem.hasAttribute(attributeName)) {
          attribute = elem.getAttribute(attributeName)
        }

        const filterRegExp = new RegExp(filter, 'gmi')
        if (filterRegExp.test(attribute)) {
          parseResult[attributeName].add(attribute)
          filteredElem.add(elem)
        }
      }
    }

    if (attributes.includes('XPATH')) {
      for (const elem of Array.from(filteredElem)) {
        parseResult['XPATH'].add(createXPathFromElement(elem))
      }
    }

    for (let [key, value] of Object.entries(parseResult)) {
      parseResult[key] = Array.from(value)
    }
    return parseResult
  }
}

module.exports = Parser