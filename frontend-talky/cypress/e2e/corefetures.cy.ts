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
        cy.get('[data-cy=confirmPassword').type('JohnDoe123@');
         cy.get('[data-cy="create-user-btn"]').click()
    })

    it('logins a new user',()=>{
        cy.visit('http://localhost:4200/login')
        cy.get('[data-cy=email]').type('jondoe@gmail.com')
        cy.get('[data-cy=password]').type('JohnDoe123@')
        cy.get('[data-cy="login"]').click()

    })

   

    it('checks if posts are loaded into the page',()=>{
        cy.visit("http://localhost:4200/all")
               
    })

    it('create a post ',()=>{
        cy.visit("http://localhost:4200/all")
        cy.get('[data-cy=create-post-btn]').click()
        cy.get('[data-cy=post-create-dialog]').should('be.visible');
         cy.location('pathname').should('to.equal', '/all')
       cy.visit("http://localhost:4200/all")     

    })

    it('conteains the post comment modal',()=>{
        cy.visit("http://localhost:4200/all")
        cy.get('.button__ico').contains("likes").click()

    
    })
 
    it('should access the value of the show comments button', () => {
        cy.visit('http://localhost:4200/all');
      
        cy.get('.button__ico').contains('show comments').as('buttonText');
        cy.get('@buttonText').then((text) => {
          cy.log(`Button text: ${text}`);
        });
               
      });


      it('should have a button value of  add comments',()=>{
        cy.visit('http://localhost:4200/all');

        cy.get('#add-comment').click();
      
        cy.get('#add-comment').click();
    
      
       
      })

      it('should add comment',()=>{
        cy.visit('http://localhost:4200/all');
        cy.get('#add-comment').click();
        cy.get('#comment-input').should('be.visible');
        cy.get("#comment-input").type("fake comments")
        cy.get("#post-comment").click()
        cy.visit('http://localhost:4200/all')
       
      })

      it('view my profile',()=>{
        cy.visit("http://localhost:4200/myposts")
        cy.get('#view-profile').click()
        cy.go('back')
      })

      it('should view my and edit profile',()=>{
        cy.visit('http://localhost:4200/profile')
        cy.get('#edit-profile').click()
        cy.get('#post-create-container').should('be.visible').then(()=>{
            cy.get('#post-create-container').find("#username").type("fake username")
            cy.get('#post-create-container',).find("#email").type(" fake email",{force: true})
            cy.get('#post-create-container').find("#bio").type("fake bio")
            cy.get('#post-create-container').find("#password").type( " fake password")
            const filePath = 'cypress/fixtures/cat-8282097_1280.jpg';
            cy.get('input[type=file]').selectFile(filePath);
            cy.get("#edit-btn").click()
            cy.go('back')
            cy.visit('http://localhost:4200/profile')


        });
        
       
      })
  


        
    })


  