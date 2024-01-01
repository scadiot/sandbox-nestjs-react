import { Injectable } from '@nestjs/common';
import { Client } from 'es8';

export interface Document {
  id: number;
}

@Injectable()
export class IndexationService {
  client = new Client({
    node: process.env.ELASTICSEARCH_URL,
  });

  async index(type: string, document: Document): Promise<void> {
    await this.client.index({
      index: type,
      id: `${type}_${document.id}`,
      body: document,
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
