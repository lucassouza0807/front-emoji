describe('Teste da pagina inicial', () => {
  beforeEach(() => {
    cy.visit('/login');

    cy.get('input#email').type('lucassouza0807@gmail.com');
    cy.get('input#password').type('@md11nice');

    cy.get("#login-form").submit()

  });

  it("Verificar o input", () => {
    //Verifica se existe existe o input da frease
    cy.get('#phrase').should("exist")
    cy.get('#phrase').should('be.visible');
    cy.get('#phrase').should('exist');
    //Verifica se botão de enviar existe
    cy.get('#emojify-button').should('exist');
    //Manda um input pra testar 
    cy.get("#phrase").type("Teste 123")

    cy.get("#emojify-button").click()

    //Verifica se redirecionou para a pagína certa
    cy.url().should("include", "/frases/pagina/1")

    //Testa o botão de editar
    cy.get("#edit-phrase-button-0").should("exist")
    cy.get("#edit-phrase-button-0").should("be.visible")
    cy.get("#edit-phrase-button-0").click()

    cy.get("#phrase-text-area").should("exist")
    cy.get("#phrase-text-area").type("Teste 321.")

    cy.get("#save-changes-button").should("exist")
    cy.get("#save-changes-button").should("be.visible")
    cy.get("#save-changes-button").click()

    //Testa o botão de deletar
    cy.get("#delete-button-0").should("exist")
    cy.get("#delete-button-0").should("be.visible")
    cy.get("#delete-button-0").click()


  });

});
