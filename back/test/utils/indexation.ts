import { Client } from 'es8';

export async function deleteIndex(index: string): Promise<void> {
  const client = new Client({
    node: process.env.ELASTICSEARCH_URL,
  });

  await client.indices.delete({
    index,
  });
}

export async function getDocument(index: string, id: string): Promise<unknown> {
  const client = new Client({
    node: process.env.ELASTICSEARCH_URL,
  });

  const result = await client.get({
    index,
    id,
  });

  return result._source;
}
