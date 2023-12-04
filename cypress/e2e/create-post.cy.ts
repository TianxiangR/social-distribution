
/// <reference types="cypress" />
describe('Post List', () => {
  it('create post', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="input-username"]').type('testaccount');
    cy.get('[data-testid="input-password"]').type('123123');
    cy.get('[data-testid="button-login"]').click();
    cy.wait(300);

    cy.get('[data-testid="navbar"]').should('exist');
    cy.get('[data-testid="button-create-post"]').click();
    
    cy.get('[data-testid="dialog-input-title"]').type('Test Title');
    cy.get('[data-testid="dialog-input-content"]').type('Test Content');
    cy.get('[data-testid="dialog-button-submit"]').click();
    cy.wait(300);

    cy.get('.post-container').contains('Test Title').should('exist');
  });

  it('edit post', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="input-username"]').type('testaccount');
    cy.get('[data-testid="input-password"]').type('123123');
    cy.get('[data-testid="button-login"]').click();
    cy.wait(300);

    cy.get('[data-testid="navbar"]').should('exist');
    const postItem = cy.get('.post-container').contains('Test Title').first();
    postItem.should('exist');
    postItem.get('[data-testid="button-settings"]').first().click();
    postItem.get('[data-testid="button-edit-post"]').first().click();
    cy.get('[data-testid="edit-input-title"]').type(' 2');
    cy.get('[data-testid="edit-button-submit-post"]').click();
    cy.wait(300);
    cy.get('.post-container').contains('Test Title 2').should('exist');
  });

  it('comment post', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="input-username"]').type('testaccount');
    cy.get('[data-testid="input-password"]').type('123123');
    cy.get('[data-testid="button-login"]').click();
    cy.wait(300);

    cy.get('[data-testid="navbar"]').should('exist');
    const postItem = cy.get('.post-container').contains('Test Title 2').first();
    postItem.should('exist');
    postItem.click();
    cy.wait(300);

    cy.get('[data-testid="input-comment"]').type('Test Comment');
    cy.get('[data-testid="button-send-comment"]').click();
    cy.wait(300);
    cy.get('.comment-item-container').contains('Test Comment').should('exist');
  });

  it('delete post', () => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="input-username"]').type('testaccount');
    cy.get('[data-testid="input-password"]').type('123123');
    cy.get('[data-testid="button-login"]').click();
    cy.wait(300);

    cy.get('[data-testid="navbar"]').should('exist');
    const postItem = cy.get('.post-container').contains('Test Title 2').first();
    postItem.should('exist');
    postItem.get('[data-testid="button-settings"]').first().click();
    postItem.get('[data-testid="button-delete-post"]').first().click();
    cy.get('.post-container').contains('Test Title').should('not.exist');
  });
});