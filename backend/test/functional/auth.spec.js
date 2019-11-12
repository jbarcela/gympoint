'use strict'

const { test, trait } = use('Test/Suite')('Auth')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

trait('Test/ApiClient')

test('it should return JWT token when authenticated', async ({ assert, client }) => {
  const user = await Factory
    .model('App/Models/User')
    .create({
      password: '1234567'
    });

  const credentials = {
    email: user.email,
    password: '1234567'
  }

  const response = await client.post('/auth').send(credentials).end();

  response.assertStatus(200);
  assert.exists(response.body.token);
})
