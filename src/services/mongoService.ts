import { Config } from '../configs/config';

export class MongoService {

  constructor(private config: Config) {}

  async saveTestes(payload: any) {
    const client = this.config.mongodbConnection();
    try {
      await client.connect();
      const database = client.db('wpp_api');
      const collection = database.collection('testes');
      await collection.insertOne(payload);
    } catch (e) {
      console.log(e);
      return e;
    } finally {
      await client.close();
    }
  }

}