describe('Página de Login', () => {
    beforeEach(() => {
        cy.visit('/login');
    });

    it('Deve carregar todos os elementos da página de login corretamente', () => {

        cy.get('label[for="email"]').should('contain', 'Email');
        cy.get('label[for="password"]').should('contain', 'Senha');
        cy.get('input#email').should('exist');
        cy.get('input#password').should('exist');

        cy.contains('button', 'Entrar').should('exist');
    });

    it('Deve mostrar uma mensagem de erro ao usar credenciais inválidas', () => {
        // Preencher o formulário com credenciais inválidas
        cy.get('input#email').type('email_invalido@test.com');
        cy.get('input#password').type('senha_incorreta');

        // Submeter o formulário
        cy.get('form').submit();

        // Simular erro no back-end (mockando o endpoint de autenticação)
        cy.intercept('POST', '/api/auth/login', {
            statusCode: 401,
            body: { message: 'Credenciais inválidas' },
        });

        // Verificar a mensagem de erro
        //'O e-mail fornecido não existe.
        cy.get('.error_message.text-red-500.font-bold')
            .should(($el) => {
                const errMessage = $el.text()

                if (errMessage.includes("O e-mail fornecido não existe.")) {
                    expect(errMessage).to.contain("O e-mail fornecido não existe.")
                    return
                }

                if (errMessage.includes("Credenciais inválidas")) {
                    expect(errMessage).to.contain("Credenciais inválidas")
                    return
                }

                expect(errMessage, "Houve um erro tentar fazer login")
            })


    });

    it('Deve redirecionar para a página de criar frases ao usar credenciais válidas', () => {
        // Preencher o formulário com credenciais válidas
        cy.get('input#email').type('usuario@teste.com');
        cy.get('input#password').type('senha123');

        // Simular sucesso no back-end
        cy.intercept('POST', '/api/auth/login', {
            statusCode: 200,
            body: { token: 'fake-token' },
        });


        cy.get('form').submit();

        cy.url().should("include", "/")

    });


    it('Deve desativar o botão de envio durante o carregamento', () => {
        // Simular o envio do formulário com carregamento
        cy.get('input#email').type('lucassouza0807@gmail.com');
        cy.get('input#password').type('@md11nice');

        cy.intercept('POST', '/api/auth/login', (req) => {
            req.reply((res: any) => {
                if (res) {
                    res.delay(2000).send({ token: 'fake-token' });

                }
            });
        });

        cy.get('#login-submit-button').click();
        cy.get('#login-submit-button').should('be.disabled');
    });

    it("Deve ir pra página de cadastro", () => {
        cy.get("#register-link").click()

        cy.url().should('include', '/cadastro')
    })
});
