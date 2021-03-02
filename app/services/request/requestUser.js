const request = require("request").defaults({ jar: true })

module.exports = async function requestUser(creditials) { 
    const { personal_account, service_id, region_id, sub_region_id } = creditials
    if (!personal_account || !service_id || !region_id || !sub_region_id)
        throw new Error("Cannot be empty")

    const firstResponse = await getFirstResponse()
    return await getMainResponse(firstResponse, creditials)
}

function getFirstResponse() {
    return new Promise((resolve, reject) => {
        request({
            method: "GET",
            url: "http://ek.uz/ru/cabinet/payment-public/balance?id=3"
        }, (error, response, body) => {
            if (error) {
                reject({
                    ok: false,
                    message: error
                })
            } else {
                resolve(response)
            }

        })
    })
}

function getMainResponse(firstResponse, creditials) {
    const token = parseToken(firstResponse.body)

    return new Promise((resolve, reject) => {

        request({
            method: "POST",
            host: "ek.uz",
            url: "http://ek.uz/ru/cabinet/payment-public/balance?id=3",
            form: {
                _csrf: token,
                'Balance[personal_account]': creditials.personal_account,
                'Balance[region_id]': creditials.region_id,
                'Balance[service_id]': creditials.service_id,
                'Balance[sub_region_id]': creditials.sub_region_id
            },
        }, (error, response, body) => {
            if (error) {
                reject({
                    ok: false,
                    message: error
                })
            } else {
                if (body.search("table table-striped") > 0) {
                    resolve({
                        ok: true,
                        message: "SUCCESS",
                        body,
                    })
                } else if (body.search("Ошибка системы проверки баланса") > 0) {
                    reject({
                        ok: false,
                        message: "NOT FOUND"
                    })
                } else {
                    reject({
                        ok: false,
                        message: "ERROR"
                    })
                }
            }
        })
    })

}

function parseToken(body) {
    const start = body.search("csrf-token") + 21
    const end = body.search("==") + 2
    return body.slice(start, end)
}