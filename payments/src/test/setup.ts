import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  var signin: (userId?: string | undefined) => string[];
}

jest.mock('../nats-wrapper.ts');

let mongo: any;
process.env.STRIPE_KEY = 'sk_test_51Kog8zFJPhsaxAKzeAakeguFNkjydu6iu2ReGl4JcSG5dZn1Z5Fzgu3AQ2VVBbxgSG5DChCuePiNrQr5pWQJqVMb00Pfb2DsiT';

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
  jest.clearAllMocks();
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


global.signin = (userId: string | undefined) => {
  // Build a JWT payload.  { id, email }
  const payload = {
    id: userId || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};