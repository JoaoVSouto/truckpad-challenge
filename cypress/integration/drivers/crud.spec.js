/// <reference types="cypress" />

import drivers from '../../fixtures/drivers.json';

const API_URL = 'http://localhost:3333/';

describe('drivers operations', () => {
  beforeEach(() => {
    cy.clock(new Date(2021, 8, 9).getTime());

    cy.intercept('GET', `${API_URL}drivers?_page=1*`, {
      body: drivers.slice(0, 5),
      headers: { 'x-total-count': '6' },
    }).as('getDriversFirstPage');
    cy.intercept('GET', `${API_URL}drivers?_page=2*`, {
      body: drivers.slice(5),
      headers: { 'x-total-count': '6' },
    }).as('getDriversSecondPage');

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
      .should('contain.text', 'Alírio Sampaio')
      .and('contain.text', '-')
      .and('contain.text', 'Rio Grande do Norte')
      .and('contain.text', 'Mossoró')
      .and('contain.text', '24');
  });

  it('creates a new driver successfully', () => {
    cy.get('.ant-pagination-item-2').click();

    cy.get('[data-testid="add-driver-button"]').click();

    cy.get('[data-testid="driver-name-input"]').type('Cicrano');

    cy.get('[data-testid="driver-birth-date-input"]')
      .click()
      .type('28/11/1999{enter}');

    cy.get('[data-testid="driver-cpf-input"]').type('23912390012');

    cy.get('[data-testid="check-register-cnh-radio"]').check();

    cy.get('[data-testid="driver-cnh-number-input"]').type('3894789238');

    cy.get('[data-testid="driver-cnh-category-input"]').type(
      'A{enter}B{enter}',
    );

    cy.get('[data-testid="driver-cnh-expiration-date-input"]')
      .click()
      .type('21/11/2022{enter}');

    cy.get('[data-testid="submit-driver-general-data-form-btn"]').click();

    cy.get('[data-testid="driver-postal-code-input"]').type('23548007');

    cy.wait(500);

    const newDriver = {
      id: 7,
      name: 'Cicrano',
      birth_date: '1999-11-28T03:00:00.000Z',
      state: 'Rio de Janeiro',
      city: 'Rio de Janeiro',
      documents: [
        {
          country: 'BR',
          expires_at: '2022-11-21T03:00:00.000Z',
          number: '3894789238',
          category: 'AB',
          doc_type: 'CNH',
        },
        {
          country: 'BR',
          number: '23912390012',
          doc_type: 'CPF',
        },
      ],
      addresses: {
        name: 'Casa',
        state: 'Rio de Janeiro',
        country: 'BR',
        neighborhood: 'Sepetiba',
        city: 'Rio de Janeiro',
        complement: '(Cj Tijolinho)',
        postal_code: '76939-000',
        street_name: 'Rua 1',
      },
    };

    cy.intercept('POST', `${API_URL}drivers`, {
      statusCode: 201,
      body: newDriver,
    });

    cy.intercept('GET', `${API_URL}drivers?_page=2*`, {
      body: [...drivers.slice(5), newDriver],
      headers: { 'x-total-count': '7' },
    });

    cy.get('[data-testid="save-driver-btn"]').click();

    cy.get('.ant-message').should(
      'contain.text',
      'Motorista criado com sucesso!',
    );

    cy.get('[data-row-key]')
      .eq(1)
      .should('contain.text', 'Cicrano')
      .and('contain.text', 'AB')
      .and('contain.text', 'Rio de Janeiro')
      .and('contain.text', '21');
  });

  it('deletes a driver successfully', () => {
    cy.get('[data-testid="delete-driver-button-1"]').click();

    cy.get('#confirm-delete-driver-button-1').click({ force: true });

    cy.intercept('DELETE', `${API_URL}drivers/*`, { statusCode: 204 });
    cy.intercept('GET', `${API_URL}drivers?_page=1*`, {
      body: drivers.slice(1, 6),
      headers: { 'x-total-count': '5' },
    });

    cy.get('[data-row-key="1"]').should('not.exist');
  });
});
