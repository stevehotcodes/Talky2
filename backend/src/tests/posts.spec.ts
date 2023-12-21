import request from 'supertest';
import app from '../index';

describe('Perform CRUD operation on posts', () => {
  let token = '';
  let postID = '';

  beforeAll(async () => {
    // Log in to get the authentication token
    const loginResponse = await request(app)
      .post('/users/login')
      .send({
        email: 'Alamin@gmail.com',
        password: '12345678',
      })
      .expect('Content-Type', /json/);

    token = loginResponse.body.token;
  }, 20000);

  it('should add a post', async () => {
    // Add a new post using the obtained token
    const postResponse = await request(app)
      .post('/posts/new')
      .send({
        postImageUrl: 'https://images.pexels.com/photos/6194122/pexels-photo-6194122.jpeg?auto=compress&cs=tinysrgb&w=600',
        postContent: "This is Daniel's first Post",
      })
      .set('token', token)
      .expect(201);

    // Retrieve the post ID and check the response
    postID = postResponse.body.id;
    expect(postResponse.body.message).toBe('Post created successfully');
    // expect(postID).toBeTruthy();
  });
});
