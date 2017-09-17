const abrade = require('abrade')

abrade.plugin('imdb', {
  url: 'http://www.imdb.com/find?q=$1?s=tt',
  entity: {
    selector: '.findResult',
    properties: {
      title: {
        selector: '.result_text',
        property: 'innerText',
      },
      url: {
        selector: 'a[href]',
        property: 'href',
      }
    }
  }
})

// abrade.plugin('imdb', query => {
//   const url = abrade.url('http://www.imdb.com/find',{q: query, s:'tt'})
//   return abrade.request(url).then(response => {
//     const $ = cheerio(response)
//   })

// })
