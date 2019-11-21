const fetch = require("node-fetch")
const open = require("opn")
const readline = require("readline")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

async function look(kws) {
fetch("https://www.supremenewyork.com/shop.json")
    .then(res => res.json())
    .then(res => {
        const arr = res.products_and_categories.new
        arr.forEach(element => {
            if (element.name.toLowerCase().includes(kws)) {
                console.log("found")
                open(`https://supremenewyork.com/shop/${element.id}`, {app: "chrome"})
            }
        })
    })
}

async function init() {
    const kw = await prompt("What Keyword Would You Like To Use? ")
    look(kw)
}

function prompt(q) {
    return new Promise(resolve => {
        rl.question(q, resolve)
    })
}

init()
