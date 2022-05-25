const { MarkovMachine } = require('./markov')
const fs = require('fs')
const axios = require('axios')

const fileType = process.argv[2]
const path = process.argv[3]

function generateTextFromFile() {
    fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            console.log('task failed with following error =>', err)
            process.exit(1)
        }
        let machine = new MarkovMachine(data)
        console.log(machine.makeText())
    })

}


async function generateTextFromUrl() {
    let resp = await axios.get(path)
    if (resp.status == '200') {
        let machine = new MarkovMachine(resp.data)
        console.log(machine.makeText())
    }
    else {
        console.log(`Error loading side, please verify URL. Status code => ${resp.status}`)
    }
}


if (fileType == 'file') {
    generateTextFromFile()
}
else if (fileType == "url") {
    generateTextFromUrl()
}