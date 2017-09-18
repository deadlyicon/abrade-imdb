const abrade = require('abrade')

module.exports = abrade.plugin('imdb', {
  url: 'http://www.imdb.com/find?q=$1&s=tt',
  entitySelector: '.findResult',
  properties: {
    title: node => extractTitle(node).trim(),
    year: node => extractYear(node),
    url: node => extractUrl(node),
  }
})

const extractTitle = node => {
  let title = node.find('.result_text').text()
  const matches = title.match(/\s*(.+)\s*\((\d\d\d\d)\)/)
  if (matches) title = matches[1]
  return title.slice(0, 100)
}

const extractYear = node => {
  const title = node.find('.result_text').text()
  const matches = title.match(/\((\d\d\d\d)\)/)
  if (matches) return Number(matches[1])
}

const extractUrl = node => {
  const href = node.find('a[href]').attr('href')
  return href && href[0] === '/'
    ? `http://www.imdb.com${href}`
    : href
}
