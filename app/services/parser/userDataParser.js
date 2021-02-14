const cheerio = require('cheerio')

module.exports = function userDataParser(html) {
  const $ = cheerio.load(html)
  const dataTable = []

  $('table.table.table-striped tr').each((idx, tr) => {
    const tds = $(tr).find("td")
    dataTable.push({
      name: tds.eq(0).text().trim(),
      value: tds.eq(1).text().trim()
    })
  })

  return dataTable
}