const { MarkovMachine } = require('./markov')


describe('Markov machine test', function () {
    let machine;

    beforeEach(function () {
        machine = new MarkovMachine('This is a test, a very good test. There are no tests like it anywhere else')
    })

    test('see if the constructor words and madeChains is working', function () {
        expect(machine.words.length).toEqual(16)
        expect(machine.madeChains.like).toContain('it')
        expect(Object.keys(machine.madeChains).length).toEqual(15)
    })

    test('Does Class.makeText work?', function () {
        let t = machine.makeText(3).split(" ")
        expect(t.length).toEqual(3)
        expect(typeof (machine.makeText())).toBe('string')
    })

})
