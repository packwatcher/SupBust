const fetch = require("node-fetch")
const open = require("opn")
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function look(kws, colors, sizes) {
    fetch("https://www.supremenewyork.com/shop.json")
        .then(res => res.json())
        .then(res => {
            const arr = res.products_and_categories.new
            arr.forEach(element => {
                if (element.name.toLowerCase().includes(kws)) {
                    console.log("found")
                    check(`https://supremenewyork.com/shop/${element.id}`, colors, sizes, element.id)
                }
            })
        })
}

function check(link, colorss, sizess, idd) {
    fetch(`${link}.json`)
        .then(res => res.json())
        .then(res => res.styles)
        .then(res => res.filter(item => item.name.includes(colorss)))
        .then(res => atc(idd, res[0].id, res[0].sizes.reduce((a, b) => a.name.includes(sizess) ? a : b).id))
    // .then(res => ({ stid: res[0].id, sid: res[0].sizes.reduce((a, b) => a.name.includes(sizess) ? a : b).id }))
    // .then(res => JSON.stringify(res))
    // .then(res => console.log(res))
    // .then(res => JSON.parse(res))
    // .then(res => go(idd, res.stid, res.sid))
}

function atc(itemId, styleId, sizeId) {
    console.log(itemId)
    console.log(styleId)
    console.log(sizeId)


}

async function init() {
    const kw = await prompt("What Keyword Would You Like To Use? ")
    const color = await prompt("What Color Would You Like To Use? ")
    const size = await prompt("What Size Would You Like To Use? ")
    look(kw, color, size)
}

function prompt(q) {
    return new Promise(resolve => {
        rl.question(q, resolve)
    })
}

init()
