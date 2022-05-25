/** Textual markov chain generator */


class MarkovMachine {
    // constructor class has the text split into an array of the words (this.words)
    //it also has this.madeChains which is a dictionnary of all words as keys, and values
    // are an array of the words that the key preceeds. 
    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c !== "");
        this.madeChains = this.makeChains();

    }


    makeChains() {

        let chains = {}
        // for every word in the instance's "words", create an object with the individual
        // words as keys and an empty list as a value
        for (let e of this.words) {
            chains[`${e}`] = []
        }
        // For every word in this.words, add the next word of this.words to the value array 
        for (let i = 0; i < this.words.length; i++) {
            if (chains[`${this.words[i]}`] && !chains[`${this.words[i]}`].includes(this.words[i + 1])) {
                chains[`${this.words[i]}`].push(this.words[i + 1] || null)
            }
        }
        return chains
    }

    makeText(numWords = 100) {
        let count = 1
        const chainsRandInd = Math.floor(Math.random() * Object.keys(this.madeChains).length)
        let responseArr = [this.words[chainsRandInd]]
        
        while (count < numWords) {
            count += 1
            let lastWord = responseArr[responseArr.length - 1];
            let lastWordOptions = this.madeChains[lastWord]
            let newLastWord = lastWordOptions[Math.floor(Math.random() * lastWordOptions.length)]

            if (newLastWord) {
                responseArr.push(newLastWord)
            }
            else {
                break
            }
        }
        return responseArr.join(' ')
    }
}


module.exports = { MarkovMachine }

// test = new MarkovMachine('This is a test, a very good test. There are no tests like it anywhere else')
// console.log(test.madeChains)
// console.log(test.makeText(3))
