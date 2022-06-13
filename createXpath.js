function createXPathFromElement(elem) {
  let segs
  let i
  for (segs = []; elem && elem.nodeType === 1; elem = elem.parentNode) {
    for (i = 1, sib = elem.previousSibling; sib; sib = sib.previousSibling) {
      if (sib.localName == elem.localName) i++
    }
    if (i > 1)
      segs.unshift(elem.localName.toLowerCase() + '[' + i + ']')
    else 
      segs.unshift(elem.localName.toLowerCase())
  }

  return segs.length ? '/' + segs.join('/') : null
}

module.exports = createXPathFromElement