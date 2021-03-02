const userDataParser = require("./parser/userDataParser");
const requestUser = require("./request/requestUser");

// const creditials = {
//   personal_account: 2276071,
//   service_id: 3,
//   region_id: 27,
//   sub_region_id: 237
// }
let d1 = new Date()
// getUserData(creditials).then(data => {
//   let d2 = new Date()
//   let time = d2 - d1
//   console.log(time);
//   console.log(data);
// })

module.exports = function getUserData(creditials) {
  return requestUser(creditials)
    .then((res) => {
      userDataParser(res.body)
    })
}