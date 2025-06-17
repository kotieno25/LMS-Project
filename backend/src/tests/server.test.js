const request = require('supertest');
const app = require('../server');

describe('Server Security and Functionality Tests', () => {
  // Test health endpoint
  test('Health check endpoint should return 200', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
  });

  // Test rate limiting
  test('Rate limiting should be active', async () => {
    const requests = Array(101).fill().map(() => 
      request(app).get('/api/auth/login')
    );
    
    const responses = await Promise.all(requests);
    const tooManyRequests = responses.filter(r => r.status === 429);
    expect(tooManyRequests.length).toBeGreaterThan(0);
  });

  // Test security headers
  test('Security headers should be present', async () => {
    const response = await request(app).get('/health');
    expect(response.headers).toHaveProperty('x-frame-options');
    expect(response.headers).toHaveProperty('x-content-type-options');
    expect(response.headers).toHaveProperty('x-xss-protection');
  });

  // Test CORS
  test('CORS should be properly configured', async () => {
    const response = await request(app)
      .get('/health')
      .set('Origin', 'http://localhost:3000');
    
    expect(response.headers).toHaveProperty('access-control-allow-origin');
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
  });

  // Test 404 handling
  test('Non-existent routes should return 404', async () => {
    const response = await request(app).get('/non-existent-route');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('status', 'error');
  });
}); 