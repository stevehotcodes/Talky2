import request, { Response } from 'supertest';
import app from '../index';
import { response } from 'express';

describe('Performs tests on the Authentication endpoints', () => {
   let const_token:string
  it('should not sign up a user exists', async () => {

    jest.setTimeout(5000);

    return  await request(app)
      .post('/users/signup')
      .send({
        "fullName":"Alamin1",
        "userName":"Alamin0021",
        "email":"Alamin@gmail.com",
        "password":"12345678"
        
    })
      .expect('Content-Type', /json/)
     
      .expect(500)
  
  });
 
  it ('should check if an account exists with the given email', async ()=>{
    jest.setTimeout(5000);
        return request(app).post('/users/login')
                    .send({
                      "email":"Alamin@gmail.com",
                     "password":"12345678"
                 })
                    .expect('Content-Type', /json/)
                    .expect(200)

                    .then(response=>{
                        const_token=response.body.token
                        return 
                    })           

  })


  it ('should sign in the user with given email', async ()=>{
    jest.setTimeout(5000);
        return request(app).post('/users/login')
                    .send({
                      "email":"Alamin@gmail.com",
                     "password":"12345678"
                 })
                    // .expect('Content-Type', /json/)
                    .expect(200)

                    .then(response=>{
                      expect(response.body.token)
                        return 
                    })           
  })

});

describe("Test Accessing Protected Endpoints Anonymously",()=>{
    let assigned_token:string

    it('should not fetch all users without a valid token',async ()=>{
        return request(app).post('/users/all')
          .expect(401)
          .then(response=>{
            expect(response.body).toEqual({
              message:"You do not have access"
            })
          })
    })

    it('should not fetch user without providing a token',async ()=>{
      return request (app).post('/users/logged/')
      .expect(401)

    })

    it('should check whether the token is valid',()=>{
        return request(app).post('/users/logged/')
        .set("token","Invalid token")
        .expect(200)
    })

    





})
