import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
  var signin: (email?: string, password?: string) => Promise<string[]>;
}

let mongo: any;

// jest.setTimeout(10000000);

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';

  // create in-memory db for tests
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions);
});

beforeEach(async () => {
  // delete all collections before each test
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});


afterAll(async () => {
  // kill all connections after all tests to free resources
  mongo.stop();
  await mongoose.connection.close();
});


global.signin = async (email: string = 'test@test.com', password: string = 'password') => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email, password
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};