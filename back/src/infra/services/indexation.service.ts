import { Injectable } from '@nestjs/common';
import { Client } from 'es8';

@Injectable()
export class IndexationService {
  client = new Client({
    node: process.env.ELASTICSEARCH_URL,
  });

  async index(index: string, id: string, body: any): Promise<void> {
    await this.client.index({
      index,
      id,
      body,
    });
  }

  async search(type: string, request: string): Promise<any[]> {
    const result = await this.client.search({
      index: type,
      body: {
        query: {
          query_string: {
            query: request,
          },
        },
      },
    });

    return result.hits.hits.map((h) => h._source);
  }
}
