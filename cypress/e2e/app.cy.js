describe('App (e2e)', () => {
  it('відкриває головну сторінку', () => {
    cy.visit('/');
    cy.contains('Get started').should('be.visible');
  });

  it('лічильник працює у браузері', () => {
    cy.visit('/');
    cy.contains('button', 'Count is 0').click().click();
    cy.contains('button', 'Count is 2');
  });
});
