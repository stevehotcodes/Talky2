describe('First', () => {
    it('visit the landing page ', () => {
      cy.visit('http://localhost:4200/')

      cy.get(".logo");
      cy.get("#login-signup-wrapper")
      cy.get("#welcome-wrapper")
      cy.get("div")
      cy.get("#login-signup-wrapper");
      cy.contains("Sign up")
      cy.contains("Log in")
      cy.contains("Welcome to Talky");
      cy.contains("Meet like minded people")
      cy.contains("Search for your interest")
      cy.contains("Socialize and Chat");
      cy.contains('Get started')
      
    })

    it('directs you to the sign up page',()=>{
        cy.visit('http://localhost:4200/')
        cy.contains("Sign up").click()

    })

    it('registers a new user',()=>{
        cy.visit('http://localhost:4200/signup')
        cy.contains('New In Talky')
        cy.get('[data-cy=fullName]').type('John Doe')
        cy.get('[data-cy=email]').type('jondoe@gmail.com')
        cy.get('[data-cy=userName]').type('John Doe')
        cy.get('[data-cy=password]').type('JohnDoe123@')
        // cy.get('[data-cy=password]').type('John Doe')
        cy.get('[data-cy=confirmPassword').type('JohnDoe123@');
         cy.get('[data-cy="create-user-btn"]').click()
    })

    it('logins a new user',()=>{
        cy.visit('http://localhost:4200/login')
        cy.get('[data-cy=email]').type('jondoe@gmail.com')
        // cy.get('[data-cy=userName]').type('John Doe')
        cy.get('[data-cy=password]').type('JohnDoe123@')
        cy.get('[data-cy="login"]').click()

    })

    // it("checks if there are posts" , ()=>{
        

    //     cy.get('posts').should('have.length.greaterThan', 1)
    // })

    it('checks if posts are loaded into the page',()=>{
        cy.visit("http://localhost:4200/all")
        // cy.get('posts').should('exist');
        // cy.get('[data-cy=create-post-btn]').click()
      

        
    })

    it('create a post ',()=>{
        cy.visit("http://localhost:4200/all")
        cy.get('[data-cy=create-post-btn]').click()
        cy.get('[data-cy=post-create-dialog]').should('be.visible');
        // cy.get('[data-cy=create-post-btn]').click();
        const testImage='cypress/fixtures/example.json'
        // cy.get('[data-cy=postCaption]').type("This is a new automated post caption")
        // // cy.fixture(testImage).then((fileContent) => {
        // //     cy.get('[data-cy=postImage]').invoke('val', fileContent);

        // //   });
         

        //   cy.get('[data-cy=btn-cancel]').click()
          cy.location('pathname').should('to.equal', '/all')
          cy.visit("http://localhost:4200/all")
          
        
        

    })

    it('likes a post',()=>{
        cy.visit("http://localhost:4200/all")
        cy.get('.like-div').click()
        

    
    })


    


        
    })

