describe("Appointments", () => {

  beforeEach(() => {
    cy.request('/api/debug/reset');
    cy.wait(200)
    cy.visit('/');
  })

  xit("should book an interview", () => {
    cy.contains('Monday');
    cy.get("[alt=Add]")
    .first()
    .click()
    cy.get('[data-testid="student-name-input"]')
    .should('exist')
    .click()
    .type("New Student Name");
    cy.get("[alt='Sylvia Palmer']")
    .click();
    cy.contains("Save")
    .click();
    cy.contains('New Student Name').should("exist");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  xit("should edit an interview", () => {
    cy.contains('Monday');
  
    cy.get("[alt='Edit']")
    .should('exist')
    .click({force: true})
    cy.get('[data-testid="student-name-input"]')
    .should('exist')
    .clear()
    .type("New Student Name");
    cy.get("[alt='Tori Malcolm']")
    .click();
    cy.contains("Save")
    .click();
    cy.contains('New Student Name').should("exist");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.contains('Monday');
  
    cy.get("[alt='Delete']")
    .should('exist')
    .click({force: true})
    
    cy.contains("Confirm")
    .click();
    cy.get('[data-testid="appointment-section"]')
    .children()
    .first()
    .children()
    .should('have.class', "appointment__add");
  });

});