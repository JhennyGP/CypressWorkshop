/// <reference types = "cypress" />
const data = require('../fixtures/user.json')
import ProdutosPage from '../support/pages/produtos';

context('Comprar produto', () => {

    before(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/')
    });

    it('Ir para a página de compras para comprar um produto', () => {
        cy.get('#primary-menu > .menu-item-629 > a').as('ComprarMenuLink')
        cy.get('@ComprarMenuLink').contains('Comprar').and('have.attr', 'href').and('include', 'shop')
        cy.get('@ComprarMenuLink').click()
        cy.get('.page-title').should('contain', 'Produtos')
    });

    it('Comprar o primeiro produto da página', () => {
        cy.get('.post-2559 > .product-block').click()
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message').should('contain', 'foi adicionado no seu carrinho.')
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        // Só funciona aqui dentro
        // O CEP não funciona nenhum código
        ProdutosPage.getDados(data.nome,data.sobrenome,data.endereco,data.cidade,data.cep,data.telefone,data.email)
        cy.get('#place_order').click()
    });

    // Quando descomenta esse it e comenta o de cima, dá erro de sessão expirada na página do site

    // it('Preencher os dados e finalizar a compra', () => {
    //     ProdutosPage.getDados(data.nome,data.sobrenome,data.endereco,data.cidade,data.cep,data.telefone,data.email)
    //     cy.get('#place_order').click()
    // });

});