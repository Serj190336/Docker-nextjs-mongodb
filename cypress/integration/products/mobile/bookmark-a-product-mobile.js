/// <reference types='cypress' />

describe('Bookmark an offer, mobile vesrion', {
    viewportWidth: Cypress.env('mobile').w,
    viewportHeight: Cypress.env('mobile').h
}, () => {

    before(() => {
        cy.visit(Cypress.env('host') + Cypress.env('lang'))
    })

    it('Randomly pick a product, bookmark it, check product number, check class', () => {
        // Spinner should become hidden
        cy.get('selector').invoke('attr', 'hidden').should('exist')

        // Clicking on dropdown button should open dropdown window
        cy.get('.selector').scrollIntoView()
        cy.get('.selector').find('.selector').click({
            scrollBehavior: false
        })

        // Select a random product
        cy.get('.selector').find('a:not(.selector)')
            .then($el => {
                // Get product count
                let productCount = $el.length;
                // Get random number from product count
                cy.log()
                let randomNum = function (max = productCount) {
                    return Math.floor(Math.random() * Math.floor(max));
                }
                // Open product
                cy.get($el).eq(randomNum()).scrollIntoView({
                    offset: {
                        top: -200
                    }
                }).click({
                    scrollBehavior: false
                })
            })

        // Wait for items inside the menu to load
        cy.get('.selector', {scrollBehavior:false} ).should('exist')

        // Open the menu
        cy.get('.selector').click();

        // Menu should be visible
        cy.get('.selector').should('be.visible')

        // Bookmarks in the menu should be "0"
        cy.get('.selector').should('have.text', '0')

        // Close the menu
        cy.get('.selector').click()

        // Number of bookmarks at the * icon should be empty
        cy.get('.selector').invoke('attr', 'attrdata').should('be.empty')

        // Click on the "*" button
        cy.get('.selector').click()

        // Scroll to top for the menu to appear
        cy.window().scrollTo('top')

        // "*" icon should have active class
        cy.get('.selector').should('have.class', 'meta-navigation__shortlist--active')

        // Nmber of bookmarks at the heart icon should be "1"
        cy.get('.selector').invoke('attr', 'attrdata').should('contain', '1')

        // Scroll to top for the menu to appear
        cy.window().scrollTo(0, -500, {
            duration: '200',
            easing: 'linear',
        })

        // Open the menu
        cy.get('.selector').click({
            scrollBehavior: false
        })

        // Bookmarks in the menu should be "1"
        cy.get('.selector').as('menubookmark', {
            timeout: 30000
        })
        cy.get('@menubookmark').then(($el) => {
            cy.wrap($el).should('have.text', '1')
        })

        // Close the menu
        cy.get('.selector').click()

        // Click on the "BTN" button
        cy.get('.selector').click()

        // "BTN" icon should not have active class
        cy.get('.selector').should('not.have.class', '.selector--active')

        // Scroll to top for the menu to appear
        cy.window().scrollTo(0, -500, {
            duration: '200',
            easing: 'linear',
        })

        // Open the menu
        cy.get('.selector').click({
            scrollBehavior: false
        })

        // Bookmarks in the menu should be "0"
        cy.get('.selector').as('menubookmark', {
            timeout: 30000
        })
        cy.get('@menubookmark').then(($el) => {
            cy.wrap($el).should('have.text', '0')
        })

        // Close the menu
        cy.get('.selector').click()
    })
})