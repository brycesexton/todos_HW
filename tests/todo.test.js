const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const Todo = require('../models/todoModels')

let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
  await mongoose.connection.close()
  await mongoServer.stop()
})

describe('test all endpoints', () => {
  let todoId

  test('it creates a new todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ title: 'todo', description: 'this is a test' })

    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('title', 'todo')
    expect(response.body).toHaveProperty('description', 'this is a test')
    expect(response.body).toHaveProperty('completed', false)

    todoId = response.body._id
  })

  test('gets all todos', async () => {
    const response = await request(app).get('/todos')
    
    expect(response.statusCode).toBe(200)
    expect(response.body.todos.length).toBe(1)
  })

  test('gets a specific todo', async () => {
    const response = await request(app).get(`/todos/${todoId}`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('title', 'todo')
    expect(response.body).toHaveProperty('description', 'this is a test')
  })

  test('updates a specific todo', async () => {
    const response = await request(app)
      .put(`/todos/${todoId}`)
      .send({ title: 'Update todo', description: 'this is updated' })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('title', 'Update todo')
    expect(response.body).toHaveProperty('description', 'this is updated')
  })

  test('deletes a specific todo', async () => {
    const response = await request(app).delete(`/todos/${todoId}`)
    
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('message', 'Todo deleted')
  })
})