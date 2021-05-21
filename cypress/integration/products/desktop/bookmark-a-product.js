/// <reference types='cypress' />

describe('Bookmark a product', {
    viewportWidth: Cypress.env('desktop').w,
    viewportHeight: Cypress.env('desktop').h
}, () => {

    before(() => {
        cy.visit(Cypress.env('host') + Cypress.env('lang'))
    })

    it('Pick a product, bookmark it, check bookmark number, check class', () => {

        // Open products from the RDE menu
        cy.get('.selector').click()

        // Select random product
        cy.get('.selector')
            .then($el => {
                // Get product count
                let productCount = $el.length;
                // Get random number from product count
                let randomNum = function (max = productCount) {
                    return Math.floor(Math.random() * Math.floor(max));
                }
                // Select two product
                cy.get('.selector').eq(randomNum()).click()
                    .then(() => {
                        // Click the Search button
                        cy.get('.selector').click()
                    })
            })

        // Spinner should not exist
        cy.get('.selector').should('not.exist')

        // Bookmarks in the menu should be "0"
        cy.get('.selector').should('have.text', '0')

        cy.get('.selector').invoke('text').then(($text) => {
                cy.wrap($text).should('not.equal', 0)
            })
            .then(() => {
                cy.get('.selector .selector').then($el => {
                    cy.wrap($el).find('span').its('length').should('eq', 2).then(() => {
                        cy.wrap($el).invoke('attr', 'data-hc-loaded').should('eq', 'true').then(() => {
                            cy.wrap($el).invoke('attr', 'data-url').then($url => {
                                cy.request($url).should((response) => {
                                    expect(response.status).to.eq(200)
                                }).then(() => {
                                    // Click "Save product" button to add product to the bookmarks
                                    cy.get('.selector .selector .selector').click({
                                        scrollBehavior: false
                                    })
                                })
                            })
                        })
                    })
                })
            }).then(() => {
                // "Save product" button should have "active" class
                cy.get('.selector .selector')
                    .should('have.class', 'classname')
            }).then(() => {
                // Bookmarks number should be "1"
                cy.get('.selector .selector').should('have.text', '1').then(() => {
                    // Click "product saved" button to remove product from the bookmarks
                    cy.get('.selector').click({
                        scrollBehavior: false
                    })
                })
            }).then(() => {
                // "Save product" button should not have "active" class
                cy.get('.selector')
                    .should('not.have.class', 'classname')

            }).then(() => {
                // Bookmarks number should be "0"
                cy.get('.selector').should('have.text', '0')
            })

    })
})
