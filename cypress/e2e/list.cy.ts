describe('List Component', () => {
  it('passes', () => {
    cy.visit('/');
    cy.contains("Hello, AngularTesting");
  });

  it('should list of courses', () => {
    cy.fixture('recipes.json').as('recipesJSON');
    cy.intercept('https://dummyjson.com/recipes?limit=10', '@recipesJSON').as('recipes');
    cy.visit('/list');
    // cy.wait('@recipes');
    cy.get('mat-card').should("have.length", 3);
  });
})