/// <reference types="cypress" />

const API_URL = 'http://localhost:3333/';

describe('drivers operations', () => {
  beforeEach(() => {
    cy.intercept('GET', `${API_URL}drivers*`, { fixture: 'drivers.json' }).as(
      'getDrivers',
    );

    cy.visit('http://localhost:3000');
  });

  it('displays correct drivers', () => {
    cy.get('[data-row-key]').should('have.length', 5);

    cy.get('[data-row-key]')
      .first()
      .should('contain.text', 'Pouca Tripa')
      .and('contain.text', 'AB')
      .and('contain.text', 'São Paulo')
      .and('contain.text', '44');

    cy.get('[data-row-key]')
      .eq(1)
      .should('contain.text', 'Fulano')
      .and('contain.text', '-')
      .and('contain.text', 'Minas Gerais')
      .and('contain.text', 'Patos de Minas')
      .and('contain.text', '44');
  });
});
