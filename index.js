const fetch = require("node-fetch")
const open = require("opn")

function look() {
fetch("https://www.supremenewyork.com/shop.json")
    .then(res => res.json())
    .then(res => {
        const arr = res.products_and_categories.new
        arr.forEach(element => {
            if (element.name.toLowerCase().includes("dvd")) {
                console.log("found")
                open(`https://supremenewyork.com/shop/${element.id}`, {app: "chrome"})
            }
        })
    })
}

look()
