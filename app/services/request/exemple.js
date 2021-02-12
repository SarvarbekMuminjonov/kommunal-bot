const getDataUser = require("./getDataUser");

const creditials = {
    personal_account: 2276071,
    service_id: 3,
    region_id: 27,
    sub_region_id: 237
}

getDataUser(creditials)
    .then(res => {
        console.log(res.message);
    })
    .catch(err => {
        console.log(err);
    })