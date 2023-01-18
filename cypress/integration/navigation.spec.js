describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday").click();
    expect(cy.get(':nth-child(1) > .appointment__add')).to.exist;
    cy.contains("[data-testid=day]", "Tuesday").should('have.class','day-list__item--selected');
  });
});
