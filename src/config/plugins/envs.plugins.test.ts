import exp from "constants";
import { envs } from "./envs.plugins";

describe("envs.plugins", () => {
  test("should return env options", () => {
    console.log(envs);
    expect(envs).toEqual({
        PORT: 3000,
        MAILER_SERVICE: 'gmail',
        MAILER_EMAIL: 'n00gomez00@gmail.com',
        MAILER_SECRET_KEY: 'ktsknjhvsxhflfxw',
        PROD: false,
        MONGO_URL: 'mongodb://nelson:1234567@localhost:27017',
        MONGO_DB_NAME: 'NOC-TEST',
        MONGO_USER: 'nelson',
        MONGO_PASS: '1234567',
        POSTGRES_URL: 'postgresql://nelson:1234567@localhost:5432/NOC',
        POSTGRES_USER: 'nelson',
        POSTGRES_PASSWORD: '1234567',
        POSTGRES_DB: 'NOC-TEST'
    });
  });

  test('should return error if not found env', async() => {
    
    jest.resetModules();
    process.env.PORT = 'ABC';

    try {
      await import('./envs.plugins');
      expect(true).toBe(false);
    } catch (error) {
        expect(`${error}`).toContain('"PORT" should be a valid integer');
    }





  });





});
