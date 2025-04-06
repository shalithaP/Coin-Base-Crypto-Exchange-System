const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../server');

afterAll(async () => {
  await mongoose.connection.close(); // 👈 closes the connection
});

describe('User API', () => {
  it('should return all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

