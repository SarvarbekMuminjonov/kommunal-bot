const getDataUser = require("./getDataUser");
const cheerio = require('cheerio')
const creditials = {
    personal_account: 2276071,
    service_id: 3,
    region_id: 27,
    sub_region_id: 237
}

getDataUser(creditials)
    .then(res => {
        console.log(res.message);
        let $=cheerio.load(res.body)
        let tr = $('tr').text()
        
        console.log('ishladi')
        console.log(tr)
    })
    .catch(err => {
        console.log(err);
    })
   