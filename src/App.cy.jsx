import App from './App';

describe('App (component)', () => {
  it('збільшує лічильник по кліку', () => {
    cy.mount(<App />);
    cy.contains('button', 'Count is 0').click();
    cy.contains('button', 'Count is 1').should('be.visible');
  });
});
