/// <reference types='cypress' />

describe('Club names should be sorted correctly', {
    viewportWidth: Cypress.env('desktop').w,
    viewportHeight: Cypress.env('desktop').h
}, () => {

    before(() => {
        cy.visit(Cypress.env('host') + Cypress.env('lang'))
        // Open Clubs page
        cy.get('m3-header').find('.navigation__entry').eq(1).click()
    })

    it('Sort by club resorts should work correctly', () => {
        const textArr = []
        cy.get('.club-headline__headline')
            // Get an array of all club names
            .each(($el) => {
                textArr.push(Cypress.$.text($el))
            })
            // Compare club names sorting order
            .each((el$, i) => {
                (function compareFunc (str1 = textArr[i], str2 = textArr[i + 1]) {
                    // break when no clubs left to compare
                    if (str2 === undefined) return false
                    // Compare club names order
                    if (str1.localeCompare(str2) != -1 || 0)
                        throw new Error('Club names sorting order failed at: ' + i)
                    else cy.log('passed')
                })()
            })
    })

    it('Sort by countries should work correctly', () => {
        // Open sortlist dropdown
        cy.get('.searchlist__switch').find('.dropdown__text').click()

        // Select "Sort by countries"
        cy.get('.searchlist__clubview').find('.dropdown__list > li').eq(1).click()

        // teaser-tile__link-text-inner
        const textArr = []
        cy.get('.teaser-tile__link-text-inner')
            // Get an array of all club names
            .each(($el) => {
                textArr.push(Cypress.$.text($el))
                cy.log(textArr)
            })
            // Compare club names sorting order
            .each((el$, i) => {
                (function compareFunc (str1 = textArr[i], str2 = textArr[i + 1]) {
                    if (str2 === undefined) return false
                    if (str1.localeCompare(str2) != -1 || 0)
                        throw new Error('Club names sorting order failed at: ' + i)
                    else cy.log('passed')
                })()
            })
    })
})
